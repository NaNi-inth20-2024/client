import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionsPage from "./components/auctions-page/auctions-page";
import UserPage from "./components/user-page/user-page";
import AuthPage from "./components/auth-page/auth-page";
import Header from "./components/common/header/header";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<AuctionsPage />} />
                    <Route path="/user" element={<UserPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/*" element={<AuctionsPage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
