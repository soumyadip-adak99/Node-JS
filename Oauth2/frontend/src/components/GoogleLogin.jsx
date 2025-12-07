import { useGoogleLogin } from "@react-oauth/google";
import React from "react";

function GoogleLogin() {
    const responseGoogle = async (authResult) => {
        try {
            if (!authResult["code"]) {
            }

            console.log(authResult);
        } catch (error) {
            console.error("Error whilte requestion google code: ", e);
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code",
    });

    return (
        <div className="mt-10 flex justify-center">
            <button
                className="border border-black rounded-lg p-3 cursor-pointer"
                onClick={googleLogin}
            >
                Login wiht google
            </button>
        </div>
    );
}

export default GoogleLogin;
