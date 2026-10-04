import { useEffect, useRef, useState } from "react";
import type Vaccine from "../types/vaccines";
import { Icon } from "@iconify/react";
import type { Patient, RegisterPatientForm, RegisterPatientFormErrors } from "../types/patients";

const formatPhoneNumber = (value : string) => {
    const digits = value.replace(/\D/g, "").slice(0,10);

    if(digits.length < 1) return

    if(digits.length <= 3){
        return `(${digits}`;
    }
    if(digits.length <= 6){
        return `(${digits.slice(0,3)}) ${digits.slice(3)}`;
    }
    
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
}


const RegisterPatientModal = ({ onClose, onSuccess }: { onClose: () => void, onSuccess: (patient: Patient) => void }) => {
    const [formData, setFormData] = useState<RegisterPatientForm>({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        vaccineId: null
    });
    const [formProgress, setFormProgress] = useState<number>(1);
    const [formError, setFormError] = useState<RegisterPatientFormErrors>({});
    const [submitError, setSubmitError] = useState<string | null>(null);
    

    const [vaccines, setVaccines] = useState<Vaccine[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [numberOfPages, setNumberOfPages] = useState<number | null>(0)
    
    const observerRef = useRef<HTMLDivElement>(null);

    //Limit date 
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    useEffect(() => {
        const listOfVaccinesEndpoint = `${import.meta.env.VITE_VACCINE_BASE_URL}?currentPage=${currentPage}`
        const fetchVaccines = async () => {
            try {
                const response = await fetch(listOfVaccinesEndpoint);

                if(!response.ok) throw new Error(`Failed to fetch Vaccine Data in modal: ${response.status}`);

                const data = await response.json();

                setVaccines(prev => currentPage === 0 ? data.vaccines : [...(prev ?? []), ...data.vaccines]);
                setNumberOfPages(data.totalPages)

                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }

        fetchVaccines();
        
    }, [currentPage]);

    useEffect(() => {
        if (formProgress !== 2) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];

            // console.log("Observer callback ran");
            // console.log("Is intersecting:", entry.isIntersecting);

            if (entry.isIntersecting && currentPage < numberOfPages! - 1) {
                //console.log("Loading next page");
                setCurrentPage(prev => prev + 1);
            }
        }, { threshold: 0.5 });

        if (observerRef.current) {
            //console.log("Observing sentinel");
            observer.observe(observerRef.current);
        } else {
            //console.log("No sentinel found");
        }

        return () => observer.disconnect();
    }, [formProgress, currentPage, numberOfPages]);

    const handleCancel = () => {
        setFormData({
            firstName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            gender: "",
            dateOfBirth: "",
            vaccineId: null
        });

        onClose();
    }

    const handleNextForm = () => {
        const newErrors: RegisterPatientFormErrors = {};

        const firstName = formData.firstName.trim();
        if (!firstName) {
            newErrors.firstName = "First name is required";
        } else if (!/^[A-Za-z\p{L}'\s-]+$/u.test(firstName)) {
            newErrors.firstName = "Enter a valid first name";
        } else if (firstName.length > 50) {
            newErrors.firstName = "First name is too long";
        }

        const lastName = formData.lastName.trim();
        if (!lastName) {
            newErrors.lastName = "Last name is required";
        } else if (!/^[A-Za-z\p{L}'\s-]+$/u.test(lastName)) {
            newErrors.lastName = "Enter a valid last name";
        } else if (lastName.length > 50) {
            newErrors.lastName = "Last name is too long";
        }

        const email = formData.email.trim();
        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email";
        } else if (email.length > 254) {
            newErrors.email = "Email is too long";
        }

        const phoneNumber = formData.phoneNumber;
        if (!phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (phoneNumber.length !== 10) {
            newErrors.phoneNumber = "Enter a valid phone number";
        }

        const dateOfBirth = formData.dateOfBirth;
        const today = new Date().toISOString().split("T")[0];
        if (!dateOfBirth) {
            newErrors.dateOfBirth = "Date of birth is required";
        } else if (dateOfBirth < "1900-01-01") {
            newErrors.dateOfBirth = "Enter a valid date of birth";
        } else if (dateOfBirth > today) {
            newErrors.dateOfBirth = "Date of birth cannot be in the future";
        }

        const validGenders = ["Male", "Female", "Other"];
        if (!formData.gender) {
            newErrors.gender = "Gender is required";
        } else if (!validGenders.includes(formData.gender)) {
            newErrors.gender = "Select a valid gender";
        }

        setFormError(newErrors);
        
        if(Object.keys(newErrors).length === 0) setFormProgress(2);
        console.log(formData);

    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        // console.log("SUBMIT fired", e.nativeEvent);
        e.preventDefault();

        setSubmitError(null);

        const newError: RegisterPatientFormErrors = {};
        
        if(!formData.vaccineId){
            newError.vaccineId = "Select a vaccine";
        }

        setFormError(newError);

        if(Object.keys(newError).length >= 1){
            console.log(newError);
            return;
        }

        const registerPatientURL = `${import.meta.env.VITE_PATIENT_BASE_URL}`;

        try {
            const response = await fetch(registerPatientURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorText = await response.json();
                setSubmitError(errorText.error + ": " + errorText.message);
                console.error("Status:", response.status);
                console.error("Backend error:", errorText);

                throw new Error(`Failed to add patient - ${errorText.error}: ${errorText.message}`);
            }

            const patient: Patient = await response.json();
            
            onSuccess(patient);
            onClose();

        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div className="p-6 flex flex-col h-full gap-4">
            <div className="flex justify-end">
                <button onClick={handleCancel} type="button" className="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                    <Icon icon="ant-design:close-outlined" width={20} height={20}></Icon>
                </button>
            </div>

            <div className="flex justify-center items-center gap-1">
                <div className="flex flex-col items-center">
                    <span className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold border-2 transition-all duration-200 ${formProgress >= 1 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"}`}>
                        1
                    </span>
                    <span className="text-xs mt-1 text-gray-500">Details</span>
                </div>

                <div className={`h-0.5 w-24 mb-4 transition-colors duration-200 ${formProgress === 2 ? "bg-blue-600" : "bg-gray-200"}`} />

                <div className="flex flex-col items-center">
                    <span className={`w-9 h-9 flex items-center justify-center rounded-full text-sm font-bold border-2 transition-all duration-200 ${formProgress === 2 ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300 text-gray-400"}`}>
                        2
                    </span>
                    <span className="text-xs mt-1 text-gray-500">Vaccine</span>
                </div>
            </div>
            
            <div className="border-b border-gray-100 pb-2 shrink-0">
                <h1 className="text-xl font-bold text-gray-800">Add Patient</h1>
                <p className="text-sm text-gray-500 mt-0.5">
                    {formProgress === 1 ? "Enter patient personal information" : "Select a vaccine for this patient"}
                </p>
                {submitError && <p className="text-xs text-red-500">{submitError}</p>}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 gap-4">
                <div className="flex-1 min-h-0 overflow-y-auto">
                    {formProgress === 1 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="first-name" className="text-sm font-medium text-gray-700">First Name</label>
                                <input value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} type="text" id="first-name" placeholder="John" className={`border ${formError.firstName ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150`}/>
                                {formError.firstName && <p className="text-xs text-red-500">{formError.firstName}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="last-name" className="text-sm font-medium text-gray-700">Last Name</label>
                                <input value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} type="text" id="last-name" placeholder="Doe" className={`border ${formError.lastName ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150`}/>
                                {formError.lastName && <p className="text-xs text-red-500">{formError.lastName}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                                <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" id="email" placeholder="john@example.com" className={`border ${formError.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150`}/>
                                {formError.email && <p className="text-xs text-red-500">{formError.email}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</label>
                                <input type="tel" id="phone" value={formatPhoneNumber(formData.phoneNumber)} onChange={(e) => {const digitsOnly = e.target.value.replace(/\D/g, "").slice(0,10); setFormData({...formData, phoneNumber: digitsOnly});}} placeholder="(_ _ _) _ _ _-_ _ _ _" className={`border ${formError.phoneNumber ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150`}/>
                                {formError.phoneNumber && <p className="text-xs text-red-500">{formError.phoneNumber}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="date-of-birth" className="text-sm font-medium text-gray-700">Date of Birth</label>
                                <input type="date" id="date-of-birth" min="1900-01-01" max={yesterday.toISOString().split("T")[0]} value={formData.dateOfBirth} onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})} className={`border ${formError.dateOfBirth ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full cursor-pointer transition-colors duration-150 ${formData.dateOfBirth ? "text-gray-800" : "text-gray-400"}`}/>
                                {formError.dateOfBirth && <p className="text-xs text-red-500">{formError.dateOfBirth}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gender</label>
                                <div className="relative">
                                    <select id="gender" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className={`border ${formError.gender ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full appearance-none cursor-pointer pr-8 transition-colors duration-150 ${formData.gender ? "text-gray-800" : "text-gray-400"}`}>
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                        <Icon icon="mdi:chevron-down" width={20} height={20} />
                                    </div>
                                </div>
                                {formError.gender && <p className="text-xs text-red-500">{formError.gender}</p>}
                            </div>
                        </div>
                    ) : (
                        <div className="h-full overflow-y-auto overscroll-contain scrollbar-hide flex flex-col gap-3">
                            {formError.vaccineId && <p className="text-xs text-red-500">{formError.vaccineId}</p>}
                            {vaccines ? (
                                <>
                                    <div className="grid grid-cols-1 gap-3">
                                        {vaccines.map((vaccine) => (
                                            <label key={vaccine.id + vaccine.vaccineName} className={`flex items-start gap-4 p-4 rounded-lg border-2 ${vaccine.quantityRemaining === 0 ? "cursor-not-allowed" : "cursor-pointer"}  transition-all duration-150 ${formData.vaccineId === vaccine.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"}`}>
                                                <input disabled={vaccine.quantityRemaining == 0}  type="radio" name="vaccine" value={vaccine.id} checked={formData.vaccineId === vaccine.id} onChange={() => setFormData(prev => ({...prev, vaccineId: vaccine.id}))} className="mt-1 accent-blue-500"/>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-gray-800">{vaccine.vaccineName}</p>
                                                    <div className="flex gap-4 mt-1 flex-wrap">
                                                        <span className="text-xs text-gray-500">
                                                            <span className="font-medium text-gray-700">Doses:</span> {vaccine.dosesRequired}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            <span className="font-medium text-gray-700">Interval:</span> {vaccine.doseInterval} days
                                                        </span>
                                                        <span className={`text-xs font-medium ${vaccine.quantityRemaining < 10 ? "text-red-500" : "text-green-600"}`}>
                                                            {vaccine.quantityRemaining} remaining
                                                        </span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))}
                                    </div> 

                                    {currentPage < numberOfPages! - 1 && (
                                        <div ref={observerRef} className="flex justify-center py-4">
                                            <Icon icon="svg-spinners:bars-fade" height={30} width={30} />
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="flex justify-center items-center h-full">
                                    <Icon icon="svg-spinners:bars-fade" height={60} width={60} />
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 shrink-0">
                    {formProgress === 1 ? (
                        <button onClick={handleCancel} type="button" className="px-5 py-2 rounded-lg text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer text-sm font-medium">
                            Cancel
                        </button>
                    ) : (
                        <button onClick={() => setFormProgress(1)} type="button" className="px-5 py-2 rounded-lg text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer text-sm font-medium">
                            ← Back
                        </button>
                    )}

                    {formProgress === 2 ? (
                        <button type="submit" className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 cursor-pointer text-sm font-medium">
                            Submit
                        </button>
                    ) : (
                        <button onClick={(e) => {e.preventDefault(); handleNextForm();}} type="button" className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 cursor-pointer text-sm font-medium">
                            Next →
                        </button>
                    )}
                </div>
            </form>
        </div>
    );

}

export default RegisterPatientModal;