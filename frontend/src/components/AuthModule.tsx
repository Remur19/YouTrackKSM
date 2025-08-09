import { useState } from "react";
import type {User} from "../types";
import {createUser, getUser} from "../services/api";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
    const [tab, setTab] = useState<"login" | "register">("login");


    if (!isOpen) return null;
    const [user,setUser] = useState<User >({
        id: -1, password: "",
        email: "",
        name: ""
    });


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
                >
                    &times;
                </button>

                <div className="flex mb-4 border-b">
                    <button
                        onClick={() => setTab("login")}
                        className={`flex-1 py-2 text-center ${
                            tab === "login"
                                ? "border-b-2 border-blue-600 font-semibold text-blue-600"
                                : "text-gray-500"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setTab("register")}
                        className={`flex-1 py-2 text-center ${
                            tab === "register"
                                ? "border-b-2 border-green-600 font-semibold text-green-600"
                                : "text-gray-500"
                        }`}
                    >
                        Registrieren
                    </button>
                </div>

                {tab === "login" ? (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black">E-Mail</label>
                            <input
                                type="email"
                                className="w-full mt-1 p-2 border rounded-lg text-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Passwort</label>
                            <input
                                type="password"
                                className="w-full mt-1 p-2 border rounded-lg text-black"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={()=>{
                                getUser(user.id);
                            }}
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-black">Name</label>
                            <input
                                type="text"
                                className="w-full mt-1 p-2 border rounded-lg text-black"
                                required
                                value={user.name}
                                onChange={(e)=>{
                                    setUser((prevUser) => ({
                                        ...prevUser,
                                        name: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">E-Mail</label>
                            <input
                                type="email"
                                className="w-full mt-1 p-2 border rounded-lg text-black"
                                required
                                value={user.email}
                                onChange={(e)=>{
                                    setUser((prevUser) => ({
                                        ...prevUser,
                                        email: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Passwort</label>
                            <input
                                type="password"
                                className="w-full mt-1 p-2 border rounded-lg text-black"
                                required
                                value={user.password}
                                onChange={(e)=>{
                                    setUser((prevUser) => ({
                                        ...prevUser,
                                        password: e.target.value
                                    }))
                                }}
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                            onClick={()=>{
                                createUser(user);
                            }}
                        >
                            Registrieren
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
