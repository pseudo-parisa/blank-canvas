import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function Home() {
    return <h1>Blank Canvas</h1>;
}

function About() {
    return <h1>About</h1>;
}

function Browse() {
    return <h1>Browse</h1>;
}

function Auctions() {
    return <h1>Auctions</h1>;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/auctions" element={<Auctions />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;