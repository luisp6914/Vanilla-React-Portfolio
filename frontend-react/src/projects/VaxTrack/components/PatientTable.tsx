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

const PatientTable = ({ patients, onSecondDose}: { patients: Patient[] | null, onSecondDose: (patientId: number) => Promise<void>}) => { 

    return(
        <table className="hidden md:table w-full border-collapse">
            <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 w-16">
                        <span className="sr-only">Avatar</span>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Phone Number</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Gender</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Date Of Birth</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Vaccine</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Dose 1</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Dose 2</th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
                {patients?.map((patient, index) => (
                    <tr key={patient.phoneNumber} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="py-3 px-4">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0`}
                                style={{ backgroundColor: getAvatarColor(patient.firstName + patient.lastName) }}>
                                {getInitials(patient.firstName, patient.lastName)}
                            </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">{patient.firstName + " " + patient.lastName}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{formatPhoneNumber(patient.phoneNumber)}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{patient.email}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{patient.gender}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{patient.dateOfBirth}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{patient.vaccineName ?? "-"}</td>
                        <td className="py-3 px-4 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${patient.dose1 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                {patient.dose1 ? patient.dose1 : "Not Given"}
                            </span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                            {patient.dosesRequired === 1 ? (
                                <span className="w-30 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                                    Not Required
                                </span>
                            ) : patient.dose2 ? (
                                <span className="w-30 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                    {patient.dose2}
                                </span>
                            ) : (
                                <button type="button" onClick={() => onSecondDose(patient.id)} className="w-27 px-2 cursor-pointer rounded-full text-xs font-medium bg-orange-500 text-white hover:bg-orange-600">
                                    + Add Dose 2
                                </button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PatientTable;