import Comedy from "./pages/comedy/Comedy";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    BrowserRouter,
    Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="comedy" element={<Comedy />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
