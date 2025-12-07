import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem("user-info");

        if (stored) {
            setUserInfo(JSON.parse(stored));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("user-info");
        navigate("/");
    };

    if (!userInfo) {
        return (
            <div className="flex justify-center items-center min-h-screen text-white text-xl">
                No user data found.
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center min-h-screen text-white px-4">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md text-center border border-gray-700">
                {/* Profile Image */}
                <div className="flex justify-center mb-6">
                    <img
                        src={userInfo.image || "https://via.placeholder.com/150"}
                        alt="user"
                        referrerPolicy="no-referrer"
                        className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-600"
                    />
                </div>

                {/* Name */}
                <h1 className="text-3xl font-semibold mb-2">
                    Welcome, <span className="text-blue-400">{userInfo.name}</span>
                </h1>

                {/* Email */}
                <p className="text-gray-300 text-lg">
                    Email: <span className="text-gray-100">{userInfo.email}</span>
                </p>

                <div className="h-px bg-gray-700 my-6"></div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="bg-red-900/50 border border-rose-800 hover:bg-red-900/70 transition p-4 rounded-xl shadow-inner"
                >
                    Log out
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
