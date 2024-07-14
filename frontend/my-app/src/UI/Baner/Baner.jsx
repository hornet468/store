import React from "react";

const Baner = () => {
    return (
        <div className="relative w-full">
            <img
                src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1720&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className="w-full h-64 object-cover"
                alt="Banner"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-white text-2xl md:text-4xl lg:text-6xl font-bold">The best phone store from Ukraine</h2>
            </div>
        </div>
    );
};

export default Baner;