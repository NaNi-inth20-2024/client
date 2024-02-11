import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuctionsPage from "./components/auctions-page/auctions-page";
import AuthPage from "./components/auth-page/auth-page";
import Header from "./components/common/header/header";
import SingleAuctionPage from "./components/single-auction-page/single-auction-page";
import { APP_ROUTES } from "./common/enums/app-routes.enum";
import { useRevalidateQuery } from "./store/auth.api";
import { isSuccessfulResponseDto } from "./common/types/types";
import { useEffect } from "react";
import { localStorageService } from "./services/services";
import { TOKEN_NAME } from "./common/enums/auth.enum";

function App() {
    const { data: userData, refetch: revalidate } = useRevalidateQuery();

    const revalidateUser = async () => {
        const result = await revalidate();

        if (isSuccessfulResponseDto(result)) {
            return;
        }

        localStorageService.reset();
    };

    useEffect(() => {
        const tokenToRevalidate = localStorageService.getByKey(
            TOKEN_NAME.ACCESS,
        );

        if (!tokenToRevalidate || userData) {
            return;
        }

        revalidateUser();
    }, []);

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
