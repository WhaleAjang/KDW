import { Outlet, Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import { useEffect } from "react";
import { authUser } from "./store/thunkFunctions";
import ProtectedPage from "./pages/ProtectedPage";
import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import HistoryPage from "./pages/HistoryPage";
import CartPage from "./pages/CartPage";
import TestPage from "./pages/TestPage";
import DetailProductPage from "./pages/DetailProductPage";
import UploadProductPage from "./pages/UploadProductPage";

function Layout() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <ToastContainer
                position="bottom-right"
                theme="light"
                pauseOnHover
                autoClose={1500}
            />
            <Navbar />
            <main className="mb-auto w-10/12 max-w-4l mx-auto">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.user?.isAuth);
    const { pathname } = useLocation();

    useEffect(() => {
        if (isAuth) {
            dispatch(authUser());
            console.log(isAuth);
        }
    }, [isAuth, pathname, dispatch]);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route path="/test" element={<TestPage />} />
                {/* 로그인한 사람만 갈 수 있는 경로 */}
                <Route element={<ProtectedRoutes isAuth={isAuth} />}>
                    <Route path="/protected" element={<ProtectedPage />} />
                    <Route
                        path="/product/upload"
                        element={<UploadProductPage />}
                    />
                    <Route
                        path="/product/:productId"
                        element={<DetailProductPage />}
                    />
                    <Route path="/user/cart" element={<CartPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                </Route>
                {/* 로그인한 사람은 갈 수 없는 경로 */}
                <Route element={<NotAuthRoutes isAuth={isAuth} />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
