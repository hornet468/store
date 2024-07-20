import React from "react";
import { useForm } from "react-hook-form";

const OrderForm = ({ onSubmit }) => {
    const {
        register,
        formState: { errors, isValid },
        reset,
        handleSubmit,
    } = useForm({
        mode: "onChange", 
    });

    const handleOrderSubmit = async (data) => {
        const success = await onSubmit({
            Name: data.name,
            PhoneNumber: data.phone,
        });
        if (success) {
            alert("Your order was send")
            reset();
        };
    };

    return (
        <form onSubmit={handleSubmit(handleOrderSubmit)} className="flex justify-center items-center min-h-screen bg-gray-100 rounded-lg shadow-md p-8  flex-col">
            <div>
                <div className="p-5">
                Name
                    <label className="block mb-2 font-semibold text-gray-700">
                        <input
                            placeholder="Name"
                            className="mt-1 p-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring focus:border-blue-500"
                            {...register("name", {
                                required: "Input your name",
                                minLength: {
                                    value: 3,
                                    message: "Min 3 symbols",
                                },
                            })}
                        />
                    </label>
                    <div className="h-3 text-red-500">
                        {errors?.name && <p>{errors?.name?.message || "Error!"}</p>}
                    </div>
                </div>
                <div className="p-5">
                Phone Number
                    <label className="block mb-2 font-semibold text-gray-700">
                        <input
                            placeholder="Your Phone Number"
                            className="mt-1 p-2 border border-gray-300 rounded w-64 focus:outline-none focus:ring focus:border-blue-500"
                            {...register("phone", {
                                required: "Input your phone",
                                minLength: {
                                    value: 10,
                                    message: "Min 10 symbols",
                                },
                            })}
                        />
                    </label>
                    <div className="h-3 text-red-500">
                        {errors?.phone && <p>{errors?.phone?.message || "Error!"}</p>}
                    </div>
                </div>
                <div className="p-5">
                    <input
                        type="submit"
                        disabled={!isValid}
                        className={`mt-3 p-2 rounded w-64 ${
                            isValid
                                ? "bg-blue-500 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    />
                </div>
            </div>
        </form>
    );
};

export default OrderForm;