import { Icon } from "@iconify/react";
import type Vaccine from "../types/vaccines";
import { useState } from "react";


const AddDosesModal = ({ ref, vaccine, onCloseAddDosesModal, onAddDosesSuccess } : { ref: React.Ref<HTMLDialogElement>, vaccine: Vaccine | null, onCloseAddDosesModal: () => void, onAddDosesSuccess: (vaccine: Vaccine, receivedDoses: string) => void }) => {
    const [doses, setDoses] = useState<string>("");
    const [submitError, setSubmitError] = useState<string | null>(null)

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

        setSubmitError(null);

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

            onAddDosesSuccess(updatedVaccine, doses);
            onCloseAddDosesModal();
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <dialog ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-[50dvh]"> 
            {vaccine ? (
                <div className="p-6 flex flex-col gap-4">
                    {/* Close button */}
                    <div className="flex justify-end">
                        <button onClick={onCloseAddDosesModal} type="button" className="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                            <Icon icon="ant-design:close-outlined" width={20} height={20}></Icon>
                        </button>
                    </div>

                    {/* Title */}
                    <div className="border-b border-gray-100 pb-2 shrink-0">
                        <h1 className="text-xl font-bold text-gray-800">Add Doses</h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Enter amount of doses to restock
                        </p>
                        {submitError && <p className="text-xs text-red-500">{submitError}</p>}
                    </div>

                    {/* Vaccine Details */}
                    <div className="pb-2 shrink-0">
                        <h1 className="text-lg font-bold text-gray-800">{vaccine.vaccineName}</h1>
                        {vaccine.quantityRemaining < 1 && (
                            <p className="text-sm text-gray-500">
                                Doses Remaining:
                                <span className="px-2 py-.5 text-center rounded-full bg-red-50 text-red-600 text-sm font-medium">
                                    Out Of Stock
                                </span>
                            </p>
                        )}
                        {vaccine.quantityRemaining > 0 && vaccine.quantityRemaining < 100 && (
                            
                            <p className="text-sm text-gray-500">
                                Doses Remaining:
                                <span className="px-2 py-.5 text-center rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium">
                                    {vaccine.quantityRemaining} low stock
                                </span>
                            </p>
                        )}
                        {vaccine.quantityRemaining >= 100 && (
                            <p className="text-sm text-gray-500">
                                Doses Remaining:
                                <span className="px-2 py-.5 text-center rounded-full bg-green-50 text-green-700 text-sm font-medium">
                                    {vaccine.quantityRemaining} available
                                </span>
                            </p>
                        )}
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* input field */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="doses" className="text-sm font-medium text-gray-700">Number of Doses</label>
                            <input type="tel" id="doses" value={doses} onChange={handleChange} placeholder="" className="border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150"/>
                        </div>

                        {/*Cancel and Submit buttons */}
                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 shrink-0">
                            <button onClick={onCloseAddDosesModal} type="button" className="px-5 py-2 rounded-lg text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer text-sm font-medium">
                                Cancel
                            </button>

                            <button type="submit" className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 cursor-pointer text-sm font-medium">
                                Submit
                            </button>
                        </div>
                    </form>

                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <Icon icon="svg-spinners:bars-fade" height={30} width={30} />
                </div>
            )}
        </dialog>
    );
}

export default AddDosesModal;