import type Vaccine from "../types/vaccines";


const MobileVaccineView = ({ vaccinesList, onAddDoses }: { vaccinesList: Vaccine[] | null, onAddDoses: (vaccineId: number) => void }) => {
    return(
        <div className="md:hidden flex flex-col divide-y divide-gray-100">
            {vaccinesList?.map((vaccine) => (
                <div key={vaccine.vaccineName + vaccine.id} className="py-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-lg font-medium text-gray-900 truncate">
                            {vaccine.vaccineName}
                        </p>
                        <p className="text-sm font-medium text-gray-500">Doses Required: {vaccine.dosesRequired}</p>
                        <p className="text-sm font-medium text-gray-500">Dose Interval: {vaccine.dosesRequired === 1 ? "N/A" : vaccine.doseInterval}</p>
                    </div>

                    <div className="shrink-0 flex flex-col gap-2">
                        <p className="px-2 py-0.5 text-xs font-medium text-gray-500">
                            Doses Received: {vaccine.totalDosesReceived}
                        </p>

                        {vaccine.quantityRemaining < 1 && (
                            <span className="px-2 py-.5 text-center rounded-full bg-red-50 text-red-600 text-sm font-medium">
                                Out Of Stock
                            </span>
                        )}
                        {vaccine.quantityRemaining > 0 && vaccine.quantityRemaining < 100 && (
                            <span className="px-2 py-.5 text-center rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium">
                                {vaccine.quantityRemaining} low stock
                            </span>
                        )}
                        {vaccine.quantityRemaining >= 100 && (
                            <span className="px-2 py-.5 text-center rounded-full bg-green-50 text-green-700 text-sm font-medium">
                                {vaccine.quantityRemaining} available
                            </span>
                        )}

                        <button type="button" onClick={() => onAddDoses(vaccine.id)} className="px-2 py-.5 rounded-md text-sm bg-blue-50 font-medium text-blue-600">+ Add Dose</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MobileVaccineView;