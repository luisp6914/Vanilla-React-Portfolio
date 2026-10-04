import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DigiContent from "./projects/digikeyProject/components/DigiContent";
import Dashboard from "./projects/VaxTrack/components/Dashboard";
import VaccinePortal from "./projects/VaxTrack/components/VaccinePortal";
import PatientPortal from "./projects/VaxTrack/components/PatientPortal";

const App = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />

                <Route path="/digikey-api" element={<DigiContent/>} />

                <Route path="/vax-track/dashboard" element={<Dashboard/>}/>
                <Route path="/vax-track/vaccines" element={<VaccinePortal/>}/>
                <Route path="/vax-track/patients" element={<PatientPortal/>}/>
            </Routes>
        </div>
    );
}

export default App
