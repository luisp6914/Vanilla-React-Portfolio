export interface Patient{
    id: number;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dateOfBirth: string;
    email: string;
    gender: string;
    vaccineName: string;
    dose1: string;
    dose2: string;
    dosesRequired: number;
}

export interface RegisterPatientForm{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    gender: string
    dateOfBirth: string;
    vaccineId: number | null;
}

export interface RegisterPatientFormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    gender?: string;
    dateOfBirth?: string;
    vaccineId?: string;
}

