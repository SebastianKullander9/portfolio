"use client";

// TODO: Simplyify this overly complicated multi-form setup with proper validation, maybe yup/zod and server actions

import { useState, useCallback } from "react";
import FormProgress from "@/components/ui/forms/contactForm/formProgress/FormProgress";
import StepFill from "@/components/ui/forms/contactForm/StepFill";
import StepReview from "@/components/ui/forms/contactForm/StepReview";
import StepResult from "@/components/ui/forms/contactForm/StepResult";
import SmartBackBtnWrapper from "@/components/ui/buttons/smartBackBtnWrapper/SmartBackBtnWrapper";
import BackBtn from "@/components/ui/buttons/backBtn/BackBtn";

export type FormProgressType = 0 | 1 | 2;

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
        privacy: false,
    });
    const [formProgress, setFormProgress] = useState<FormProgressType>(0);

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, type, value } = e.target;
            const isCheckbox = type === "checkbox";

            setFormData(prev => ({
                ...prev,
                [name]: isCheckbox && e.target instanceof HTMLInputElement
                ? e.target.checked
                : value,
            }));
        }, 
        []
    );
    
    return (
        <section className="w-full h-full relative site-x-padding site-y-padding">
            <div className="w-full h-full grid grid-cols-12 relative">
                <div className="h-[calc(100vh-384px)] col-span-12 flex items-center justify-center md:justify-start">
                    <h1 className="special-heading heading-1 font-normal text-white">Contact</h1>
                </div>
                <div className="col-span-12 md:col-span-4 mb-24 md:mb-0">
                    <div className="sticky top-[384px] ">
                        <FormProgress formProgress={formProgress}/>
                    </div>
                </div>
                <div className="h-full col-span-12 md:col-span-8">
                    <div className="flex flex-col text-white body">
                        {formProgress == 0 ? (
                            <StepFill formData={formData} handleChange={handleChange} setFormProgress={setFormProgress} />
                        ) : formProgress == 1 ? (
                            <StepReview formData={formData} setFormProgress={setFormProgress} />
                        ) : (
                            <StepResult />
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}