import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuctionsPage from "./components/auctions-page/auctions-page";
import UserPage from "./components/user-page/user-page";
import AuthPage from "./components/auth-page/auth-page";
import Header from "./components/common/header/header";
import SingleAuctionPage from "./components/single-auction-page/single-auction-page";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<AuctionsPage />} />
                        <Route path="/user" element={<UserPage />} />
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/auction/:id" element={<SingleAuctionPage />} />
                        <Route path="/*" element={<AuctionsPage />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
