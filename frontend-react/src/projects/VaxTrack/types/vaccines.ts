export default interface Vaccine{
    id: number;
    doseInterval: number;
    dosesRequired: number;
    quantityRemaining: number;
    totalDosesReceived: number;
    vaccineName: string;
}