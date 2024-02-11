import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionsPage from "./components/auctions-page/auctions-page";
import AuthPage from "./components/auth-page/auth-page";
import Header from "./components/common/header/header";
import SingleAuctionPage from "./components/single-auction-page/single-auction-page";
import { APP_ROUTES } from "./common/enums/app-routes.enum";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <main>
                    <Routes>
                        <Route
                            path={APP_ROUTES.AUCTIONS}
                            element={<AuctionsPage />}
                        />
                        <Route path={APP_ROUTES.AUTH} element={<AuthPage />} />
                        <Route
                            path={APP_ROUTES.AUCTION}
                            element={<SingleAuctionPage />}
                        />
                        <Route path="/*" element={<AuctionsPage />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;
