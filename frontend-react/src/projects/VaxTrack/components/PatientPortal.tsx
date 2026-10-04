import { useEffect, useRef, useState } from "react";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import type { Navigation }from "../../../types/navigation"
import type { Patient } from "../types/patients";
import PatientTable from "./PatientTable";
import { Icon } from "@iconify/react";
import MobilePatientView from "./MobilePatientView";
import PatientPagination from "./PatientPagination";
import RegisterPatientProxy from "./RegisterPatientProxy";
import SearchPatientModal from "./SearchPatientModal";

const PatientPortal = () => {
    const nav : Navigation[] = [
            {type: "link", to: "/", label: "Home"},
            {type: "link", to: "/vax-track/Vaccines", label: "Vaccines"}
        ];

    //Patient Table
    const [patients, setPatients] = useState<Patient[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number | null>(null);

    //Search Patient
    const [prompt, setPrompt] = useState<string>("");
    const [searchedPatient, setSearchedPatient] = useState<Patient | null>(null);
    const searchPatientDialogRef = useRef<HTMLDialogElement>(null);
    const [searchToast, setSearchToast] = useState<string | null>(null);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

    //Adding Patient
    const registerDialogRef = useRef<HTMLDialogElement>(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
    const [toast, setToast] = useState<string | null>(null);
    
    //Second dose
    const [secondDoseToast, setSecondDoseToast] = useState<string | null>(null);

    const fetchData = async () => {
        const patientListEnpoint = `${import.meta.env.VITE_PATIENT_BASE_URL}?currentPage=${currentPage}`
        setIsLoading(true);
        try {
            const response = await fetch(patientListEnpoint);

            if(!response.ok) throw new Error(`${response.status}`);

            const data = await response.json();

            console.log(data);

            setIsLoading(false);
            setPatients(data.patientList);
            setNumberOfPages(data.getTotalPages);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.scrollTo(0,0);
        fetchData();        
    }, [currentPage]);

    useEffect(() => {
        if(isRegisterModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isRegisterModalOpen]);

    useEffect(() => {
        if(isSearchModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isSearchModalOpen]);

    useEffect(() => {
        if(!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [toast]);

    useEffect(() => {
        if(!searchToast) return;

        const timer = setTimeout(() => {
            setSearchToast(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [searchToast]);

    useEffect(() => {
        if(!secondDoseToast) return;

        const timer = setTimeout(() => {
            setSecondDoseToast(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [secondDoseToast]);

    const handleSecondDose = async (patientId: number) => {
        const addSecondDoseEndpoint = `${import.meta.env.VITE_PATIENT_BASE_URL}/${patientId}`;

        try {
            const response = await fetch(addSecondDoseEndpoint, {
                method: "PATCH"
            });

            if(!response.ok){
                const info = await response.json();
                setSecondDoseToast(`${info.message}`);
                //console.log(info)
                throw new Error(`${info.status} - ${info.message} - ${info.path}`);
            } 

            const data: Patient = await response.json();

            setPatients(prev => prev!.map((patient) =>
                patient.id === patientId ? data : patient
            ));

            if(isSearchModalOpen) setSearchedPatient(prev => prev?.id === patientId ? data : prev);
            console.log(`Searched Patient state: ${searchedPatient}`);

            console.log(data);
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = e.target.value;

        if(inputField === ""){
            setPrompt("");
            return;
        }
        else if(/[^0-9]/.test(inputField)){
            return;
        } else if(Number(inputField) <= 0){
            return;
        }

        setPrompt(inputField);
    }

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        registerDialogRef.current?.showModal();
    }

    const closeRegisterModal = () => {
        registerDialogRef.current?.close();
        setIsRegisterModalOpen(false);
    }

    const handlePatientCreated = async (patient: Patient) => {
        setToast(`Patient ${patient.firstName} ${patient.lastName} was successfully added.`);
        await fetchData();
    };

    const handlePatientSearch = async (e : React.SubmitEvent) => {
        e.preventDefault();

        const getPatientURL = `${import.meta.env.VITE_PATIENT_BASE_URL}/${prompt}`

        try {
            const response = await fetch(getPatientURL);

            if(!response.ok){
                const info = await response.json();
                setSearchToast(`${info.message}`);
                console.log(info)
                throw new Error(`${info.status} - ${info.message} - ${info.path}`)
            }

            const data : Patient = await response.json();
            setIsSearchModalOpen(true)
            setSearchedPatient(data);
            searchPatientDialogRef.current?.showModal();

        } catch (error) {
            console.error(error)
        }
    }

    const closeSearchedPatientModal = () => {
        setIsSearchModalOpen(false);
        searchPatientDialogRef.current?.close()
    }

    return(
        <>
            <Navbar navigator={nav}></Navbar>
            <main className="min-h-[calc(100dvh-13rem)] mt-20 p-5">
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[calc(100dvh-13rem-2.5rem)]">
                        <Icon icon="svg-spinners:bars-fade" height={60} width={60}></Icon>
                    </div>
                ) : patients !== null ? (
                    <div className="min-h-255 flex flex-col">
                        <div className="flex justify-between items-center gap-4 mb-6">
                            <button onClick={openRegisterModal} className="min-w-36 px-5 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">+ Add Patient</button>
                            <RegisterPatientProxy ref={registerDialogRef} onClose={closeRegisterModal} isOpen={isRegisterModalOpen} onSuccess={handlePatientCreated}></RegisterPatientProxy>

                            <div className="relative w-50">
                                <form onSubmit={handlePatientSearch}>
                                    <input className="peer shadow-[0_0_10px_#5B7787] outline-hidden rounded-full w-full pl-11 pr-11 py-2" placeholder=" " type="text" id="keyword-search" required value={prompt}  onChange={handleChange}/>
                                    <label htmlFor="keyword-search" className=" absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-[:not(:placeholder-shown)]:hidden truncate">Patient ID</label>
                                    <button type="submit" className=" absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                        <Icon icon="bitcoin-icons:search-filled" height={32} width={32}></Icon>
                                    </button>
                                    {prompt !== "" && (
                                        <button type="button" className=" absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setPrompt("")}>
                                            <Icon icon="bitcoin-icons:cross-filled"></Icon>
                                        </button>
                                    )}
                                </form>
                            </div>
                            <SearchPatientModal ref={searchPatientDialogRef} patient={searchedPatient} onClose={closeSearchedPatientModal} onSecondDose={handleSecondDose}></SearchPatientModal>
                        </div>

                        <PatientTable patients={patients} onSecondDose={handleSecondDose}></PatientTable>

                        <MobilePatientView patients={patients} onSecondDose={handleSecondDose}/>

                        {numberOfPages !== null && (
                            <div className="mt-auto">
                                <PatientPagination currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}></PatientPagination>
                            </div>
                        )}
                    </div>
                ) : ""}
                

            </main>
            {toast && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
                    {toast}
                </div>
            )}
            {searchToast && (
                <div className="fixed bottom-5 right-5 border bg-amber-500 text-white px-5 py-3 rounded-lg shadow-lg">
                    {searchToast}
                </div>
            )}
            {secondDoseToast && (
                <div className="fixed bottom-5 right-5 border bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg">
                    <p>Failed to add second Dose:</p>
                    {secondDoseToast}
                </div>
            )}
            
            <Footer></Footer>
        </>
    );
}

export default PatientPortal;