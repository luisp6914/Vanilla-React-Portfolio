import { useEffect, useRef, useState } from "react";
import Navbar from "../../../components/Navbar";
import type { Navigation } from "../../../types/navigation";
import type Vaccine from "../types/vaccines";
import { Icon } from "@iconify/react";
import Footer from "../../../components/Footer";
import VaccineTable from "./VaccineTable";
import AddDosesModal from "./AddDosesModal";
import MobileVaccineView from "./MobileVaccineView";
import VaccinePagination from "./VaccinePagination";
import SearchVaccineModal from "./SearchVaccineModal";
import RegisterVaccineModal from "./RegisterVaccineModal";

const VaccinePortal = () => {
    
    //Vaccine state and functions
    const [vaccinesList, setVaccinesList] = useState<Vaccine[] | null>(null);
    const [isVaccineListLoading, setIsVaccineListLoading]= useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number | null>(null);

    //Adding second dose state and functions
    const addDosesModal = useRef<HTMLDialogElement>(null);
    const [isAddDosesModalOpen, setIsAddDosesModal] = useState<boolean>(false);
    const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
    const [addDosesToast, setAddDosesToast] = useState<string | null>(null);

    const onAddDoses = (vaccineId: number) => {
        const vaccine = vaccinesList!.find(vaccine => vaccine.id === vaccineId) ?? null;

        console.log("Vaccine selected:", vaccine?.vaccineName);

        setSelectedVaccine(vaccine);
        setIsAddDosesModal(true);

        console.log("Opening add doses modal...");
        addDosesModal.current?.showModal();
    }

    const onCloseAddDosesModal = () => {
        console.log("Closing modal");
        console.log("Vaccine before clearing:", selectedVaccine?.vaccineName);

        setSelectedVaccine(null);
        setIsAddDosesModal(false);
        
        addDosesModal.current?.close();
    }

    const onAddDosesSuccess = async (vaccine: Vaccine, receivedDoses: string) => {
        setAddDosesToast(`Vaccine ${vaccine.vaccineName} received ${receivedDoses} doses`)
        await fetchData();
    }

    useEffect(() => {
        if(isAddDosesModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isAddDosesModalOpen]);

    useEffect(() => {
        if(!addDosesToast) return;

        const timer = setTimeout(() => {
            setAddDosesToast(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [addDosesToast]);

    //Search Vaccine state and functions
    const [searchPrompt, setSearchPrompt] = useState<string>("");
    const searchVaccineModal = useRef<HTMLDialogElement>(null);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
    const [searchedVaccine, setSearchedVaccine] = useState<Vaccine | null>(null);
    const [searchToast, setSearchToast] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = e.target.value;

        if(inputField === ""){
            setSearchPrompt("");
            return;
        }
        else if(/[^0-9]/.test(inputField)){
            return;
        } else if(Number(inputField) <= 0){
            return;
        }

        setSearchPrompt(inputField);
    }

    const onCloseSearchModal = () => {
        console.log("Closing search modal");
        console.log("Vaccine before clearing:", searchedVaccine?.vaccineName);

        setSearchedVaccine(null);
        setIsSearchModalOpen(false);
        
        searchVaccineModal.current?.close();
    }

    const handleVaccineSearch = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const searchVaccineEndpoint = `${import.meta.env.VITE_VACCINE_BASE_URL}/${searchPrompt}`

        try {
            const response = await fetch(searchVaccineEndpoint);
            
            if(!response.ok){
               const info = await response.json();
                setSearchToast(`${info.message}`);
                console.log(info)
                throw new Error(`${info.status} - ${info.message} - ${info.path}`)
            }

            const data: Vaccine = await response.json();
            console.log(data)
            setSearchedVaccine(data);
            setIsSearchModalOpen(true);
            searchVaccineModal.current?.showModal();
        } catch (error) {
            console.error(error)
        }
        
    }

    const onAddDosesInSearch = (updatedVaccine: Vaccine) => {
        setVaccinesList(prev => prev!.map((vaccine) =>
            vaccine.id === updatedVaccine.id ? updatedVaccine : vaccine
        ));

        setSearchedVaccine(updatedVaccine);
    }

    useEffect(() => {
        if(isSearchModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isSearchModalOpen]);
    
    useEffect(() => {
        if(!searchToast) return;

        const timer = setTimeout(() => {
            setSearchToast(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [searchToast]);

    //Adding new vaccine and functions
    const registerVaccineModal = useRef<HTMLDialogElement>(null);
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
    const [registerVaccineToast, setRegisterVaccineToast] = useState<string | null>(null);


    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        registerVaccineModal.current?.showModal();
    }

    const onCloseRegisterVaccineModal = () => {
        setIsRegisterModalOpen(false);
        registerVaccineModal.current?.close();
    }

    const onRegisterVaccine = async (vaccine: Vaccine) => {
        setRegisterVaccineToast(`${vaccine.vaccineName} vaccine was successfully created`);
        await fetchData();
    }

    useEffect(() => {
        if(isRegisterModalOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isRegisterModalOpen]);

    useEffect(() => {
        if(!registerVaccineToast) return;

        const timer = setTimeout(() => {
            setRegisterVaccineToast(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, [registerVaccineToast]);

    
    //Global funcitons
    const nav : Navigation[] = [
        {type: "link", to: "/", label: "Home"},
        {type: "link", to: "/vax-track/patients", label: "Patients"},
    ];

    const fetchData = async () => {
        const vaccinesListEndpoint = `${import.meta.env.VITE_VACCINE_BASE_URL}?currentPage=${currentPage}`
        setIsVaccineListLoading(true);

        try {
            const response = await fetch(vaccinesListEndpoint);

            if(!response.ok){
                const info = await response.json();
                throw new Error(`${info.status} - ${info.message} - ${info.path}`);
            }

            const data = await response.json();

            console.log(data);

            setIsVaccineListLoading(false);
            setVaccinesList(data.vaccines);
            setNumberOfPages(data.totalPages);
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        window.scrollTo(0,0);
        fetchData();
    }, [currentPage]);

    return(
        <>
            <Navbar navigator={nav}></Navbar>
            <main className="mt-20 min-h-[calc(100dvh-8rem)] p-5">
                {isVaccineListLoading ? (
                    <div className="flex justify-center items-center min-h-[calc(100dvh-13rem-2.5rem)]">
                        <Icon icon="svg-spinners:bars-fade" height={60} width={60}></Icon>
                    </div>
                ) : vaccinesList !== null ? (
                    <div className="min-h-255 flex flex-col">
                        {/* Modal Buttons */}
                        <div className="flex justify-between items-center gap-4 mb-6">
                            <button type="button" onClick={openRegisterModal} className="min-w-36 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white cursor-pointer transition-colors duration-150"> + Add Vaccine</button>
                            <RegisterVaccineModal ref={registerVaccineModal} onCloseRegisterVaccineModal={onCloseRegisterVaccineModal} onRegisterVaccine={onRegisterVaccine}></RegisterVaccineModal>

                            <div className="relative w-50">
                                <form onSubmit={handleVaccineSearch}>
                                    <input className="peer shadow-[0_0_10px_#5B7787] outline-hidden rounded-full w-full pl-11 pr-11 py-2" placeholder=" " type="text" id="keyword-search" required value={searchPrompt}  onChange={handleChange}/>
                                    <label htmlFor="keyword-search" className=" absolute left-11 top-1/2 -translate-y-1/2 text-gray-400 text-sm peer-[:not(:placeholder-shown)]:hidden truncate">Vaccine ID</label>
                                    <button type="submit" className=" absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer">
                                        <Icon icon="bitcoin-icons:search-filled" height={32} width={32}></Icon>
                                    </button>
                                    {searchPrompt !== "" && (
                                        <button type="button" className=" absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setSearchPrompt("")}>
                                            <Icon icon="bitcoin-icons:cross-filled"></Icon>
                                        </button>
                                    )}
                                </form>
                            </div>
                            <SearchVaccineModal ref={searchVaccineModal} vaccine={searchedVaccine} onCloseSearchModal={onCloseSearchModal} onAddDosesInSearch={onAddDosesInSearch}></SearchVaccineModal>
                        </div>

                        {/* Vaccine table */}
                        <VaccineTable vaccinesList={vaccinesList} onAddDoses={onAddDoses}></VaccineTable>

                        {/* Vaccine mobile view */}
                        <MobileVaccineView vaccinesList={vaccinesList} onAddDoses={onAddDoses}></MobileVaccineView>

                        {/* Add Doses modal */}
                        <AddDosesModal ref={addDosesModal} vaccine={selectedVaccine} onCloseAddDosesModal={onCloseAddDosesModal} onAddDosesSuccess={onAddDosesSuccess}></AddDosesModal>

                        {/* Pagination */}
                        {numberOfPages !== null && (
                            <div className="mt-auto">
                                <VaccinePagination currentPage={currentPage} setCurrentPage={setCurrentPage} numberOfPages={numberOfPages}></VaccinePagination>
                            </div>
                        )}
                        
                    </div>
                ) : ""}
            </main>

            {/* Toasts */}
            {addDosesToast && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
                    {addDosesToast}
                </div>
            )}

            {searchToast && (
                <div className="fixed bottom-5 right-5 border bg-amber-500 text-white px-5 py-3 rounded-lg shadow-lg">
                    {searchToast}
                </div>
            )}

            {registerVaccineToast && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg">
                    {registerVaccineToast}
                </div>
            )}

            <Footer></Footer>
        </>
    );
}

export default VaccinePortal;