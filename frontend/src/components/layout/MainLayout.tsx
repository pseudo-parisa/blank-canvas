import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function MainLayout() {
    return (
        <div className="min-h-screen bg-[#1c1c1c]">
            <Navbar />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;