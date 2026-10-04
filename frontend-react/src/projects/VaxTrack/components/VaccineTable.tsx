import { Icon } from "@iconify/react";
import type Vaccine from "../types/vaccines";


const VaccineTable = ({ vaccinesList, onAddDoses} : {vaccinesList: Vaccine[] | null, onAddDoses: (vaccineId: number) => void }) => {

    return(
        <table className="hidden md:table w-full border-collapse">
            <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 w-16">
                        <span className="sr-only">Avatar</span>
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Vaccine</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Doses Required</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Dose Interval</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Doses Received</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Doses Remaining</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
            </thead>

            <tbody className=" divide-y divide-gray-100">
                {vaccinesList?.map((vaccine, index) => (
                    <tr key={vaccine.vaccineName + vaccine.id} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}>
                        <td className="py-3 px-4">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-50 text-blue-500 shrink-0">
                                <Icon icon="healthicons:syringe-outline" height={24} width={24} />
                            </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-900">{vaccine.vaccineName}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{vaccine.dosesRequired}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{vaccine.dosesRequired === 1 ? "N/A" : vaccine.doseInterval}</td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{vaccine.totalDosesReceived}</td>
                        <td className="py-3 px-4 text-sm">
                            {vaccine.quantityRemaining < 1 && (
                                <span className="px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-medium">
                                    Out Of Stock
                                </span>
                            )}
                            {vaccine.quantityRemaining > 0 && vaccine.quantityRemaining < 100 && (
                                <span className="px-2.5 py-1 rounded-full bg-yellow-50 text-yellow-700 font-medium">
                                    {vaccine.quantityRemaining} low stock
                                </span>
                            )}
                            {vaccine.quantityRemaining >= 100 && (
                                <span className="px-2.5 py-1 rounded-full bg-green-50 text-green-700 font-medium">
                                    {vaccine.quantityRemaining} available
                                </span>
                            )}
                        </td>
                        <td>
                            <button type="button" onClick={() => onAddDoses(vaccine.id)} className="px-3 py-1.5 rounded-md text-sm bg-blue-50 font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-100 cursor-pointer transition-colors duration-150">+ Add Dose</button>
                        </td>

                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default VaccineTable;