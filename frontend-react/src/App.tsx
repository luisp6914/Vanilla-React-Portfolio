import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import DigiContent from "./projects/digikeyProject/components/DigiContent";

const App = () => {
    return(
        <div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/digikey-api" element={<DigiContent/>} />
            </Routes>
        </div>
    );
}

export default App
