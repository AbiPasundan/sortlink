import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router";
import * as yup from "yup";
import { HiArrowRight, HiEye, HiEyeOff, HiLink, } from "react-icons/hi";

import Footer from "#/components/Footer.jsx"
import InputField from "#/components/auth/InputField.jsx";
import LayoutAuth from "#/components/auth/LayoutAuth.jsx";
import Logo from "#/assets/img/logo.png";

const signupSchema = yup.object({
    email: yup
        .string()
        .email("Enter a valid email address")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Minimum 8 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
});


export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: yupResolver(signupSchema) });

    const onSubmit = async (data) => {
        await new Promise((r) => setTimeout(r, 1000));
        alert(`Account created for ${data.email}`);
    };

    return (
        <LayoutAuth>

            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-16 -left-16 h-96 w-96 rounded-full bg-blue-100 opacity-50 blur-3xl" />
                <div className="absolute bottom-20 -right-20 h-72 w-72 rounded-full bg-indigo-100 opacity-40 blur-3xl" />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
                <img src={Logo} alt="logo" loading="lazy" />

                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
                <p className="text-sm text-gray-500 mb-8">Join the elite architects of the web.</p>

                <div className="w-full max-w-sm rounded-2xl bg-white shadow-xl shadow-blue-100/50 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                        <InputField label="Email Address" id="email" type="email" placeholder="name@company.com" register={register("email")} error={errors.email?.message} />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="relative">
                                <input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" {...register("password")} className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"}`} />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" >
                                    {showPassword ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                </button>
                            </div>
                            {errors.password ? (
                                <p className="text-xs text-red-500 mt-0.5">{errors.password.message}</p>
                            ) : (
                                <p className="text-[10px] uppercase tracking-widest text-gray-400 mt-0.5 font-medium">
                                    Minimum 8 characters
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input id="confirmPassword" type={showConfirm ? "text" : "password"} placeholder="********"
                                    {...register("confirmPassword")}
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10 ${errors.confirmPassword ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"
                                        }`} />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors" >
                                    {showConfirm ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-xs text-red-500 mt-0.5">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        <button type="submit" disabled={isSubmitting} className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed" >
                            {isSubmitting ? (
                                <span className="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <>
                                    Sign Up <HiArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-5 text-center text-xs text-gray-400 leading-relaxed">
                        <span>By signing up, you agree to our</span>
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Terms of Service
                        </a>
                        <span>and</span>
                        <a href="#" className="text-blue-600 hover:underline font-medium">
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>

                <p className="mt-6 text-sm text-gray-500">
                    <span> Already have an account? </span>
                    <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors" >
                        Log in
                    </Link>
                </p>
            </div>

            <Footer />
        </LayoutAuth>
    );
}