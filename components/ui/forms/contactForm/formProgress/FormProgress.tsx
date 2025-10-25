"use client";

import React from "react";
import { steps } from "./steps";
import { FormProgressType } from "@/components/sections/contact/ContactPage";

type FormProgressProps = {
    formProgress: FormProgressType;
};

export default function FormProgress({ formProgress }: FormProgressProps) {
    return (
        <div className="flex flex-row md:flex-col gap-16 justify-center md:justify-start">
            {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                    <div className="flex flex-col md:flex-row items-center gap-4 relative" style={{ color: formProgress == index ? "black" : "white" }}>
                        <div style={{ backgroundColor: formProgress == index ? "white" : "" }} className="relative w-12 h-12 border-1 border-white rounded-full backdrop-blur-sm bg-white/20">
                            <p className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2">0{step.number}</p>
                        </div>

                        {index < steps.length - 1 && (
                            <div className="absolute left-14 md:left-6 top-6 md:top-14 w-12 md:h-12 border-t md:border-l md:border-t-0 border-white"></div>
                        )}

                        <p className="text-white">{step.text}</p>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}