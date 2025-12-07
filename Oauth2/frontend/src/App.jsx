import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin";
import Dashboard from "./components/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

function PrivateRoute({ children }) {
    const user = localStorage.getItem("user-info");
    return user ? children : <Navigate to="/login" replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route
                    path="/login"
                    element={
                        <GoogleOAuthProvider clientId="99380069696-n318ntgfclo18o9tjhbl58spg2sohc6m.apps.googleusercontent.com">
                            <GoogleLogin />
                        </GoogleOAuthProvider>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
