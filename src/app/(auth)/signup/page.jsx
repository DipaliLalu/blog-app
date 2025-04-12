"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@heroui/react";
import { MdEmail, MdOutlineSecurity } from "react-icons/md";
import { signupSchema } from "@/schema/(auth)/signupSchema";
import toast from "react-hot-toast";
import { endPoints } from "@/axios/axios";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const router=useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const url = endPoints.auth.signup;
            const response = await axios.post(url, data);
            reset();
            toast.success(response.data.message || "Registation successfully");
            router.push('/login');
            setLoading(false);

        } catch (error) {
            setLoading(true);
            console.log(error)
            const message = error.message || 'Something went wrong';
            toast.error(message);
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
            <div className="w-full max-w-sm rounded-lg p-6 shadow-lg border border-white text-white m-5">
                <h2 className="text-2xl font-bold text-white">
                    Sign up
                </h2>
                <p>Continue to blogin - Dashboard</p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4">

                    <div className="relative">
                        <Label className="mb-3 text-md" htmlFor="username">Username</Label>
                        <div className="flex bg-gray-800 items-center justify-start ps-2 rounded-lg">
                            <FaUser size={22} />
                            <Input
                                autoComplete="off"
                                id="username"
                                type="username"
                                placeholder="Enter your username"
                                {...register("username")}
                                className="focus-visible:outline-none"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <Label className="mb-3 text-md" htmlFor="email">Email</Label>
                        <div className="flex bg-gray-800 items-center justify-start ps-2 rounded-lg">
                            <MdEmail size={22} />
                            <Input
                                autoComplete="off"
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                {...register("email")}
                                className="focus-visible:outline-none"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div className="relative">
                        <Label className="mb-3 text-md" htmlFor="password">Passowrd</Label>
                        <div className="flex bg-gray-800 items-center justify-start ps-2 rounded-lg">
                            <MdOutlineSecurity size={25} />
                            <Input
                                id="password"
                                type={isVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password")}
                                className="focus-visible:outline-none"
                            />
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none pe-3"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Error Message */}
                    {errorMessage && (
                        <p className="text-sm text-red-500 text-center mt-4">{errorMessage}</p>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-white text-black font-bold mt-4 text-md" disabled={loading}>
                        {loading ? "Signing in..." : "Submit"}
                    </Button>
                </form>

                <div className="text-lg mt-4">
                    Already have an account?
                    <Link href="/signup" className="text-blue-600 ps-1">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
