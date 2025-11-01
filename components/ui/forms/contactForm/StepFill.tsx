import { useRef } from "react";
import Input from "../../input/Input";
import TextArea from "../../input/TextArea";
import PrivacyBtn from "../../buttons/PrivacyIntegrityBtn/PrivacyBtn";
import FormBtn from "../../buttons/formBtn/FormBtn";
import { inputData } from "./inputData";
import { FormProgressType } from "@/components/sections/contact/ContactPage";

export type FormDataState = {
    name: string;
    company: string;
    email: string;
    phone: string;
    message: string;
    privacy: boolean;
}

type StepFillProps = {
    formData: FormDataState;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    setFormProgress: React.Dispatch<React.SetStateAction<FormProgressType>>
}

export default function StepFill({ formData, handleChange, setFormProgress } : StepFillProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const handleReviewClick = () => {
        if (formRef.current?.reportValidity()) {
            setFormProgress(1);
        }
    }

    return (
        <>
            <div className="w-full flex justify-end">
                <p className="">* required fields</p>
            </div>
            <form ref={formRef} className="flex flex-col gap-24" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="absolute left-[-9999px] w-[1px] h-[1px]"
                />

                {inputData.map((field) => (
                    <Input 
                        key={field.name}
                        label={field.label + (field.required ? " *" : "")}
                        name={field.name}
                        type={field.type}
                        value={String(formData[field.name as keyof FormDataState])}
                        onChange={handleChange}
                        required={field.required}
                        placeholder={field.placeholder}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                    />
                ))}
                <TextArea 
                    label="Message *" 
                    name="message" 
                    type="text" 
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message" 
                />
                <div className="w-full flex flex-col xl:flex-row gap-12 xl:gap-0 justify-between items-center">
                    <PrivacyBtn 
                        checked={formData.privacy} 
                        onChange={handleChange} 
                    />
                    <button
                        type="button"
                        onClick={handleReviewClick}
                    >
                        <FormBtn 
                            label="Review" 
                        />
                    </button>
                </div>
            </form>
        </>
    )
}