import { Icon } from "@iconify/react";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";


const Dashboard = () => {
    return(
        <>
            <div className="min-h-[calc(100dvh-8rem)] p-5 grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="rounded-lg p-5 flex flex-col justify-center items-center gap-5 bg-white border border-gray-200 border-t-4 border-t-blue-500 h-full shadow-lg">
                    <Icon icon="ph:users-three-light" height={80} width={80} className="text-blue-500"/>
                    <Link className="w-full text-center bg-blue-500 hover:bg-blue-600 text-white rounded-md px-5 py-2 transition-colors duration-200" to="/vax-track/patients">Patient Portal</Link>
                    <p className="text-sm text-gray-600">Manage all the patients and their information</p>
                </div>
                <div className="rounded-lg p-5 flex flex-col justify-center items-center gap-5 bg-white border border-gray-200 border-t-4 border-t-emerald-500 h-full shadow-lg">
                    <Icon icon="material-symbols-light:vaccines-outline" height={80} width={80} className="text-emerald-500"/>
                    <Link className="w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-md px-5 py-2 transition-colors duration-200" to="/vax-track/vaccines">Vaccine Portal</Link>
                    <p className="text-sm text-gray-600">Manage all the vaccines and their information</p>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Dashboard;