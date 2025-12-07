import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
    return (
        <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route
                            path="/login"
                            element={
                                <GoogleOAuthProvider clientId="99380069696-n318ntgfclo18o9tjhbl58spg2sohc6m.apps.googleusercontent.com">
                                    <GoogleLogin />
                                </GoogleOAuthProvider>
                            }
                        />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </BrowserRouter>
        </>
    );
}

export default App;
