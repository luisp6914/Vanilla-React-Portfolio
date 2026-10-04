import type { Patient } from "../types/patients";
import RegisterPatientModal from "./RegisterPatientModal";


const RegisterPatientProxy = ({ ref, onClose, isOpen, onSuccess} : { ref: React.Ref<HTMLDialogElement>, onClose: () => void, isOpen:boolean, onSuccess: (patient: Patient) => void }) => {
    return(
        <dialog ref={ref} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%] h-[90%] md:min-h-[70%] max-w-2xl p-0 rounded-md">
            {isOpen && <RegisterPatientModal onClose={onClose} onSuccess={onSuccess}/>}
        </dialog>
    );
}

export default RegisterPatientProxy;