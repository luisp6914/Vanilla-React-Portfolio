import { Icon } from "@iconify/react";
import { useState } from "react";
import type Vaccine from "../types/vaccines";


const RegisterVaccineModal = ({ ref, onCloseRegisterVaccineModal, onRegisterVaccine }: { ref: React.Ref<HTMLDialogElement>, onCloseRegisterVaccineModal: () => void, onRegisterVaccine: (vaccine: Vaccine) => void }) => {
    const [vaccineName, setVaccineName] = useState<string>("");
    const [dosesRequired, setDosesRequired] = useState<1 | 2>(1);
    const [vaccineInterval, setVaccineInterval] = useState<string>("");
    const [initialDoses, setInitialDoses] = useState<string>("");
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formErrors, setFormErrors] = useState<{
        vaccineName?: string;
        vaccineInterval?: string;
        initialDoses?: string;
    }>({});

    const handleNumberInput = (value: string, setter: (v: string) => void) => {
        if(value === "") { setter(""); return; }
        if(/[^0-9]/.test(value)) return;
        if(Number(value) <= 0) return;
        setter(value);
    }

    const handleCancel = () => {
        setVaccineName("");
        setDosesRequired(1);
        setVaccineInterval("");
        setInitialDoses("");
        setSubmitError(null);
        setFormErrors({});
        onCloseRegisterVaccineModal();
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        const newErrors: typeof formErrors = {};

        if(!vaccineName.trim()){
            newErrors.vaccineName = "Vaccine name is required";
        } else if(vaccineName.trim().length > 100){
            newErrors.vaccineName = "Vaccine name is too long";
        }

        if(dosesRequired === 2 && !vaccineInterval) newErrors.vaccineInterval = "Dose interval is required for two-dose vaccines";

        if(!initialDoses) newErrors.initialDoses = "Initial dose count is required";

        setFormErrors(newErrors);

        if(Object.keys(newErrors).length > 0) return;

        const registerVaccineURL = `${import.meta.env.VITE_VACCINE_BASE_URL}`;

        try {
            const response = await fetch(registerVaccineURL, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: vaccineName.trim(),
                    doseInterval: dosesRequired === 1 ? 0 : vaccineInterval,
                    dosesReceived: initialDoses,
                    dosesRequired: dosesRequired
                })
            });

            if(!response.ok){
                const info = await response.json();
                setSubmitError(`${info.message}`);
                throw new Error(`Failed to register vaccine - ${info.message}`);
            }

            const data: Vaccine = await response.json();
            onRegisterVaccine(data);
            setVaccineName("");
            setDosesRequired(1);
            setVaccineInterval("");
            setInitialDoses("");
            setSubmitError(null);
            setFormErrors({});
            onCloseRegisterVaccineModal();

        } catch (error) {
            console.error(error)
        }
    }

    return(
        <dialog ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-[50dvh]">
            <div className="p-6 flex flex-col gap-4">
                {/* Close button */}
                <div className="flex justify-end">
                    <button onClick={handleCancel} type="button" className="ml-auto text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                        <Icon icon="ant-design:close-outlined" width={20} height={20}></Icon>
                    </button>
                </div>

                {/* Title */}
                <div className="border-b border-gray-100 pb-3 shrink-0">
                    <h1 className="text-xl font-bold text-gray-800">Register Vaccine</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Enter the new vaccine information</p>
                    {submitError && (
                        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                            <Icon icon="mdi:alert-circle-outline" width={14} height={14} />
                            {submitError}
                        </p>
                    )}
                </div>

                {/* Vaccine form */}
                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 gap-4">
                    <div className="flex-1 min-h-0 overflow-y-auto md:overflow-y-visible scrollbar-hide">
                        <div className="flex flex-col gap-4">

                            {/* Vaccine Name */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="vaccine-name" className="text-sm font-medium text-gray-700">
                                    Vaccine Name
                                </label>
                                <input type="text" id="vaccine-name"value={vaccineName} onChange={e => setVaccineName(e.target.value)} placeholder="e.g. Moderna" className={`border ${formErrors.vaccineName ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150 text-sm`}/>
                                {formErrors.vaccineName && <p className="text-xs text-red-500">{formErrors.vaccineName}</p>}
                            </div>

                            {/* Doses Required - toggle style */}
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-medium text-gray-700">Doses Required</label>
                                <div className="flex rounded-lg border border-gray-200 overflow-hidden w-fit">
                                    <button type="button" onClick={() => { setDosesRequired(1); setVaccineInterval(""); }} className={`px-6 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${dosesRequired === 1 ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                                        1 Dose
                                    </button>
                                    <button type="button" onClick={() => setDosesRequired(2)} className={`px-6 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${dosesRequired === 2 ? "bg-blue-600 text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}>
                                        2 Doses
                                    </button>
                                </div>
                            </div>

                            {/* Dose Interval - only shows for 2 doses */}
                            {dosesRequired === 2 && (
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="vaccine-interval" className="text-sm font-medium text-gray-700">
                                        Dose Interval
                                        <span className="text-gray-400 font-normal ml-1">(days between doses)</span>
                                    </label>
                                    <input type="text" id="vaccine-interval" value={vaccineInterval} onChange={e => handleNumberInput(e.target.value, setVaccineInterval)} placeholder="e.g. 21" className={`border ${formErrors.vaccineInterval ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150 text-sm`}/>
                                    {formErrors.vaccineInterval && <p className="text-xs text-red-500">{formErrors.vaccineInterval}</p>}
                                </div>
                            )}

                            {/* Initial Doses */}
                            <div className="flex flex-col gap-1">
                                <label htmlFor="initial-doses" className="text-sm font-medium text-gray-700">
                                    Initial Stock
                                    <span className="text-gray-400 font-normal ml-1">(number of doses)</span>
                                </label>
                                <input type="text" id="initial-doses" value={initialDoses} onChange={e => handleNumberInput(e.target.value, setInitialDoses)} placeholder="e.g. 500" className={`border ${formErrors.initialDoses ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"} focus:bg-white focus:border-blue-400 outline-none py-2.5 px-3 rounded-lg w-full text-gray-800 placeholder:text-gray-400 transition-colors duration-150 text-sm`}/>
                                {formErrors.initialDoses && <p className="text-xs text-red-500">{formErrors.initialDoses}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 shrink-0">
                        <button onClick={handleCancel} type="button" className="px-5 py-2 rounded-lg text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors duration-150 cursor-pointer text-sm font-medium">
                            Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-150 cursor-pointer text-sm font-medium">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default RegisterVaccineModal;