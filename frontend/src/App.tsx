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
import ProtectedRoute from "./components/route/ProtectedRoute";
import Profile from "./pages/Profile";
import GuestRoute from "./components/route/GuestRoute";
import MyArtworks from "./pages/MyArtworks";
import SellerRoute from "./components/route/SellerRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    // accessible to all users
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/browse" element={<Browse />} />
                    <Route path="/auctions" element={<Auctions />} />
                    <Route path="/artworks/:id" element={<ArtworkDetail />} />
                    <Route path="/auctions/:id" element={<AuctionDetail />} />
                    <Route element={<GuestRoute />}>
                        // accessible to guests only
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        // accessible to all logged in users
                        <Route path="/profile" element={<Profile />} />
                        <Route element={<SellerRoute />}>
                            // accessible to sellers or administrators who are logged in
                            <Route path="/my-artworks" element={<MyArtworks />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;