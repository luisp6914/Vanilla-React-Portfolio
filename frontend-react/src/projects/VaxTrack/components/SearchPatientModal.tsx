import { Icon } from "@iconify/react";
import type { Patient } from "../types/patients";

const getAvatarColor = (name : string): string => {
    let hash = 0;
    for(let i = 0; i < name.length; i++){
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 65%, 50%)`;
}

const getInitials = (firstName: string, lastName: string): string => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

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

const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDiff = today.getMonth() - birthDate.getMonth();
    const dayDiff = today.getDate() - birthDate.getDate();

    if(monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)){
        age--;
    }

    return age;
}

const SearchPatientModal = ({ ref, patient, onClose, onSecondDose } : { ref: React.Ref<HTMLDialogElement>, patient: Patient | null, onClose: () => void, onSecondDose: (id : number) => void }) => {
    return(
        <dialog ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-[50dvh]">
            {patient ? (
                <div className="flex flex-col h-full">
                    
                    <div className="bg-linear-to-br from-blue-50 to-blue-100 px-6 pt-4 pb-6 relative shrink-0">
                        <button onClick={onClose} type="button" className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer">
                            <Icon icon="ant-design:close-outlined" width={20} height={20} />
                        </button>

                        <div className="flex flex-col items-center gap-3 mt-4">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0 ring-4 ring-white shadow-sm" style={{ backgroundColor: getAvatarColor(patient.firstName + patient.lastName) }}>
                                {getInitials(patient.firstName, patient.lastName)}
                            </div>

                            <div className="text-center">
                                <h1 className="text-lg font-bold text-gray-800">
                                    {patient.firstName} {patient.lastName}
                                </h1>
                                <p className="text-sm text-gray-500">{patient.gender} · {calculateAge(patient.dateOfBirth)} years old</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col divide-y divide-gray-100">
                        {/* Contact Details */}
                        <div className="px-6 py-4 flex flex-col gap-3">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3">
                                    <Icon icon="mdi:phone-outline" width={16} height={16} className="text-gray-400 shrink-0" />
                                    <span className="text-sm text-gray-700">{formatPhoneNumber(patient.phoneNumber)}</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Icon icon="mdi:email-outline" width={16} height={16} className="text-gray-400 shrink-0" />
                                    <span className="text-sm text-gray-700 break-all">{patient.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="px-6 py-4 flex flex-col gap-3">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Personal</h2>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400">Date of Birth</span>
                                    <span className="text-sm text-gray-700 font-medium">{patient.dateOfBirth}</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-xs text-gray-400">Gender</span>
                                    <span className="text-sm text-gray-700 font-medium">{patient.gender}</span>
                                </div>
                            </div>
                        </div>

                        {/* Medical Details */}
                        <div className="px-6 py-4 flex flex-col gap-3">
                            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Medical</h2>
                            
                            <div className="flex flex-col gap-0.5">
                                <span className="text-xs text-gray-400">Vaccine</span>
                                <span className="text-sm text-gray-700 font-medium">{patient.vaccineName ?? "—"}</span>
                            </div>

                            <div className="flex gap-3 flex-wrap">
                                {/* Dose 1 */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-400">Dose 1</span>
                                    <span className={`px-2.5 py-1 rounded text-xs font-medium w-fit ${patient.dose1 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                        {patient.dose1 ?? "Not Given"}
                                    </span>
                                </div>

                                {/* Dose 2 */}
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs text-gray-400">Dose 2</span>
                                    {patient.dosesRequired === 1 ? (
                                        <span className="px-2.5 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500 w-fit">
                                            Not Required
                                        </span>
                                    ) : patient.dose2 ? (
                                        <span className="px-2.5 py-1 rounded text-xs font-medium bg-green-100 text-green-700 w-fit">
                                            {patient.dose2}
                                        </span>
                                    ) : (
                                        <button type="button" onClick={() => onSecondDose(patient.id)} className="px-2.5 rounded text-xs font-medium leading-none bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-150 cursor-pointer whitespace-nowrap inline-flex items-center justify-center">
                                            + Add Dose 2
                                        </button>
                                    )}
                                </div>
                            </div>
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

export default SearchPatientModal;