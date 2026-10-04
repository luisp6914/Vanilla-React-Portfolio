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

const MobilePatientView = ({ patients, onSecondDose}: {patients: Patient[] | null, onSecondDose: (patientId: number) => Promise<void> }) => {

    return(
        <div className="md:hidden flex flex-col  divide-y divide-gray-100">
            {patients?.map((patient) => (
                <div key={patient.phoneNumber} className="py-4 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: getAvatarColor(patient.firstName + patient.lastName) }}>
                        {getInitials(patient.firstName, patient.lastName)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                            {patient.firstName} {patient.lastName}
                        </p>
                        <p className="text-sm text-gray-500 truncate">{patient.email}</p>
                        <p className="text-sm text-gray-500">{patient.phoneNumber}</p>
                    </div>

                    <div className="shrink-0 flex flex-col gap-1 items-end">
                        <span className={`w-30 px-2 py-0.5 rounded text-xs font-medium ${patient.dose1 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                            D1: {patient.dose1}
                        </span>

                        {patient.dosesRequired === 1 ? (
                            <span className="w-30 px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                                D2: Not Required
                            </span>
                        ) : patient.dose2 ? (
                            <span className="w-30 px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                                D2: {patient.dose2}
                            </span>
                        ) : (
                            <button onClick={() => onSecondDose(patient.id)} className="w-30 px-2  rounded text-xs font-medium bg-orange-500 text-white cursor-pointer">
                                + Add Dose 2
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MobilePatientView