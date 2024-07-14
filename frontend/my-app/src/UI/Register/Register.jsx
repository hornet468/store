import React from "react";
import { useForm } from "react-hook-form";

const Register = ({ onSubmit, isAuth}) => {
    const {
        register,
        formState: { errors, isValid },
        reset,
        handleSubmit,
    } = useForm({
        mode: "onBlur",
    });

    const handleFormSubmit = (data) => {
        if (onSubmit(data)) {
            onSubmit(data)
            reset();
            console.log(isAuth);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="bg-gray-100 rounded-lg shadow-md p-8 flex flex-col">
                <div className="p-5">
                Email
                    <label className="block mb-2 font-semibold text-gray-700">
                       
                        <input 
                            placeholder="email" 
                            className="mt-1 p-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring focus:border-blue-500" 
                            {...register("email", {
                                required: "input your data",
                                minLength: {
                                    value: 5, 
                                    message: "Min 5 symbols"
                                }
                            })}
                        />
                    </label>
                    <div className="h-3 text-red-500">{errors?.email && <p>{errors?.email?.message || "Error!"}</p>}</div>
                </div>
                <div className="p-5">
                Full Name
                    <label className="block mb-2 font-semibold text-gray-700">     
                        <input 
                            placeholder="fullName" 
                            className="mt-1 p-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring focus:border-blue-500" 
                            {...register("fullName", {
                                required: "input your data",
                                minLength: {
                                    value: 5, 
                                    message: "Min 5 symbols"
                                }
                            })}
                        />
                    </label>
                    <div className="h-3 text-red-500">{errors?.fullName && <p>{errors?.fullName?.message || "Error!"}</p>}</div>
                </div>
                <div className="p-5">
                Password
                    <label className="block mb-2 font-semibold text-gray-700">
                        <input 
                            placeholder="password" 
                            type="password" 
                            className="mt-1 p-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring focus:border-blue-500" 
                            {...register("password", {
                                required: "input your data",
                                minLength: {
                                    value: 5, 
                                    message: "Min 5 symbols"
                                }
                            })}
                        />
                    </label>
                    <div className="h-3 text-red-500">{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}</div>
                </div>
                <div className="p-5">
                    <input 
                        type="submit" 
                        disabled={!isValid} 
                        className={`mt-3 p-2 rounded w-64 ${isValid ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} 
                    />
                </div>
            </form>
        </div>
    );
};

export default Register;