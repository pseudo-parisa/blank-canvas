import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Browse from "./pages/Browse";
import Auctions from "./pages/Auctions";
import About from "./pages/About"
import Home from "./pages/Home"
import ArtworkDetail from "./pages/ArtworkDetail";
import AuctionDetail from "./pages/AuctionDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/auctions" element={<Auctions />} />
                    <Route path="/artworks/:id" element={<ArtworkDetail />} />
                    <Route path="/auctions/:id" element={<AuctionDetail />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;