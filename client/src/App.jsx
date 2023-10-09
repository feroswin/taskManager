import {BrowserRouter, Route, Routes} from "react-router-dom";
import GeneralPage from "./pages/GeneralPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CabinetPage from "./pages/CabinetPage";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import "./styles/index.css"

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar/>
            <Container>
                <Routes>
                    <Route path="/" element={<GeneralPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/cabinet" element={<CabinetPage/>}/>
                </Routes>
            </Container>
        </BrowserRouter>
    </div>
  );
}

export default App;
