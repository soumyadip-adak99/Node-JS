import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function GoogleLogin() {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                setLoading(true);
                const result = await googleAuth(authResult["code"]);

                const { email, name, image } = result.data.user;
                const token = result.data.token;

                const obj = { email, name, image, token };
                localStorage.setItem("user-info", JSON.stringify(obj));
                navigate("/dashboard");
            } else {
                console.log("No code received from Google");
            }
        } catch (error) {
            console.error("Error while requesting google code: ", error);
        } finally {
            setLoading(false);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-900">
                <div className="text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <div className="mt-10 flex justify-center">
            <button
                className="border border-black rounded-lg p-3 cursor-pointer hover:bg-gray-100 transition-all"
                onClick={googleLogin}
            >
                Login with Google
            </button>
        </div>
    );
}

export default GoogleLogin;
