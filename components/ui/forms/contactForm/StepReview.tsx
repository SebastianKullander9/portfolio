import React, { useState } from "react";
import { FormDataState } from "./StepFill";
import { inputData } from "./inputData";
import FormBtn from "../../buttons/formBtn/FormBtn";
import BackBtn from "../../buttons/backBtn/BackBtn";
import { FormProgressType } from "@/components/sections/contact/ContactPage";
import { sendContactEmail } from "@/app/actions/contact";

type StepReviewProps = {
    formData: FormDataState;
    setFormProgress: React.Dispatch<React.SetStateAction<FormProgressType>>;
};

export default function StepReview({ formData, setFormProgress }: StepReviewProps ) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setError(null);

        try {
            const submitData = new FormData();
            submitData.append("name", formData.name);
            submitData.append("email", formData.email);

            const fullMessage = `
                ${formData.message}
                ---
                Company: ${formData.company || "N/A" }
                Phone: ${formData.phone || "N/A" }
            `.trim();

            submitData.append("message", fullMessage);

            const result = await sendContactEmail(submitData);

            if (result.success) {
                setFormProgress(2);
            } else {
                setError(result.error || "Failed to send your message.");
            }
        } catch (err) {
            setError("An unexpected error occured");
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col gap-12">
            <h2 className="text-2xl">
                Please review your information before submitting.
            </h2>
            
            <div className="flex flex-col gap-12">
                {inputData.map((input) => {
                    const inputName = input.name as keyof FormDataState;

                    if (formData[inputName] === "") return null;

                    return (
                        <div key={input.name}>
                            <h3 className="text-gray-200">{input.label}</h3>
                            <p>{formData[inputName]}</p>
                        </div>
                    );
                })}

                <div>
                    <h3 className="text-gray-200">Message</h3>
                    <p>{formData.message}</p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
                    {error}
                </div>
            )}

            <div className="flex flex-col md:flex-row gap-12 md:gap-0 justify-between items-center">
                <button type="button" onClick={() => setFormProgress(0)} disabled={isSubmitting} className="order-2 md:order-1">
                    <BackBtn label="Back" />
                </button>
                <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="order-1 md:order-2">
                    <FormBtn label={isSubmitting ? "Sending..." : "Send"} />
                </button>
            </div>
        </div>
    )
}