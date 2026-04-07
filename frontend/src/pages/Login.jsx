import Footer from "#/components/Footer.jsx"
import InputField from "#/components/auth/InputField.jsx";
import AuthLayout from "#/components/auth/LayoutAuth.jsx";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
    HiArrowRight, HiEye, HiEyeOff,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const loginSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),
    password: yup.string().required("Password is required"),
});

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log("test");
    };

    return (
        <AuthLayout>

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-blue-100 opacity-60 blur-3xl" />
                <div className="absolute top-40 -right-20 h-72 w-72 rounded-full bg-indigo-100 opacity-50 blur-3xl" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                <p className="mb-8 text-2xl font-black tracking-tight text-gray-900 select-none">
                    Short<span className="text-blue-600">Link</span>
                </p>

                <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl shadow-blue-100/50 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
                    <p className="text-sm text-gray-500 mb-7">Please enter your details to sign in.</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <InputField label="Email Address" id="email" type="email" placeholder="name@company.com" register={register("email")} error={errors.email?.message} />

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <button type="button" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors" >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" {...register("password")}
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                                        }`} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" >
                                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-red-500 mt-0.5">{errors.password.message}</p>
                            )}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed" >
                            {isSubmitting ? (
                                <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <>
                                    Log In <HiArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">
                            or continue with
                        </span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <button type="button" className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 active:scale-[0.98] transition-all">
                        <FcGoogle size={18} />
                        Sign in with Google
                    </button>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    <span>Don&apos;t have an account? </span>
                    <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                        Sign up
                    </Link>
                </p>
            </div>

            <Footer />
        </AuthLayout>
    );
}