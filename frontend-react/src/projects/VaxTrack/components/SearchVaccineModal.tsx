import { Icon } from "@iconify/react";
import type Vaccine from "../types/vaccines";
import { useState } from "react";


const SearchVaccineModal = ({ ref, vaccine, onCloseSearchModal, onAddDosesInSearch }: { ref: React.Ref<HTMLDialogElement>, vaccine: Vaccine | null, onCloseSearchModal: () => void, onAddDosesInSearch: (vaccine: Vaccine) => void }) => {
    const [doses, setDoses] = useState<string>("");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputField = e.target.value;

        if(inputField === ""){
            setDoses("");
            return;
        }
        else if(/[^0-9]/.test(inputField)){
            return;
        } else if(Number(inputField) <= 0){
            return;
        }

        setDoses(inputField);
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSubmitError(null);
        setSuccessMessage(null);

        const addDosesEndpoint = `${import.meta.env.VITE_VACCINE_BASE_URL}/${vaccine?.id}?restockAmount=${doses}`
        try {
            const response = await fetch(addDosesEndpoint, {
                method: "PATCH"
            });

            if(!response.ok){
                const info = await response.json();
                setSubmitError(`${info.error}: ${info.message}`);
                throw new Error(`Failed to add doses to ${vaccine?.vaccineName} vaccine - ${info.message}`);
            }

            const updatedVaccine: Vaccine = await response.json();

            onAddDosesInSearch(updatedVaccine);
            setSuccessMessage(`${doses} dose${Number(doses) > 1 ? "s" : ""} added successfully`);
            setDoses("");

            setTimeout(() => {
                setSuccessMessage(null);
                setIsSubmitting(false);
            }, 3000);
            
        } catch (error) {
            console.error(error)
            setIsSubmitting(false);
        }

    }

    const handleCancel = () => {
        setSubmitError(null);
        setDoses("");
        setSuccessMessage(null);
        setIsSubmitting(false);
        onCloseSearchModal();
    }

    return(
        <dialog ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-[50dvh]">
            {vaccine ? (
                <div className="flex flex-col h-full">
                    
                    {/* Card banner */}
                    <div className="bg-linear-to-br from-blue-100 to-indigo-200 px-6 pt-4 pb-6 relative shrink-0">
                        <button onClick={handleCancel} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                            <Icon icon="ant-design:close-outlined" width={20} height={20} />
                        </button>

                        <div className="flex flex-col items-center gap-3 mt-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ring-4 ring-white shadow-sm bg-linear-to-br from-gray-600 to-indigo-700">
                                <Icon icon="healthicons:syringe-outline" height={42} width={42} style={{color: "white"}}/>
                            </div>

                            <div className="text-center">
                                <h1 className="text-lg font-bold text-gray-800">
                                    {vaccine.vaccineName}
                                </h1>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex flex-col divide-y divide-gray-100">
                        {/* Vaccine Details */}
                        <div className="px-6 py-4 flex flex-col gap-3">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Details</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400">Doses Required</span>
                                    <span className="text-sm text-gray-700 font-medium">{vaccine.dosesRequired}</span>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400">Dose Interval</span>
                                    <span className="text-sm text-gray-700 font-medium">{vaccine.dosesRequired === 1 ? "N/A" : vaccine.doseInterval}</span>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400">Doses Received</span>
                                    <span className="text-sm text-gray-700 font-medium">{vaccine.totalDosesReceived}</span>
                                </div>

                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400">Doses Remaining</span>
                                    {vaccine.quantityRemaining < 1 && (
                                        <span className="px-2 py-.5 w-30 text-center rounded-full bg-red-50 text-red-600 text-sm font-medium">
                                            Out Of Stock
                                        </span>
                                    )}
                                    {vaccine.quantityRemaining > 0 && vaccine.quantityRemaining < 100 && (
                                        <span className="px-2 py-.5 w-28 text-center rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium">
                                            {vaccine.quantityRemaining} low stock
                                        </span>
                                    )}
                                    {vaccine.quantityRemaining >= 100 && (
                                        <span className="px-2 py-.5 w-28 text-center rounded-full bg-green-50 text-green-700 text-sm font-medium">
                                            {vaccine.quantityRemaining} available
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Add Second Dose */}
                        <div className="px-6 py-4 flex flex-col gap-3">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Add Doses</h2>
                            
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                {/* input field */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="doses" className="text-sm font-medium text-gray-700">Number of Doses</label>

                                    {successMessage && (
                                        <p className="text-sm text-green-600 flex items-center gap-1">
                                            <Icon icon="mdi:check-circle-outline" width={14} height={14} />
                                            {successMessage}
                                        </p>
                                    )}

                                    
                                    {submitError && 
                                        (<p className="text-xs text-red-500 flex items-center gap-1">
                                            <Icon icon="mdi:alert-circle-outline" width={14} height={14} />
                                            {submitError}
                                        </p>)
                                    }

                                    <div className="flex gap-2 items-center">
                                        <input type="text" id="doses" value={doses} onChange={handleChange} placeholder="e.g 50" className="border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg flex-1 text-gray-800 placeholder:text-gray-400 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed text-sm"/>
                                        <button type="submit" disabled={isSubmitting || !doses} className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 cursor-pointer text-sm font-medium shrink-0">
                                            {isSubmitting ? (
                                                <Icon icon="svg-spinners:ring-resize" width={16} height={16} />
                                            ) : (
                                                "Add"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <Icon icon="svg-spinners:bars-fade" height={30} width={30} />
                </div>
            )}
        </dialog>
    );
}

export default SearchVaccineModal;