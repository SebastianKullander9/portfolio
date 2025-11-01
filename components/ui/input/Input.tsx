import React from "react";

type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    type: string;
    name: string;
    required: boolean;
    placeholder: string;
    minLength?: number;
    maxLength?: number;
}

function Input({ value, onChange, label, type, name, required, placeholder, minLength, maxLength }: InputProps) {
    return (
        <div className="flex flex-col gap-8">
            <label htmlFor={name}>
                {label}
            </label> 
            <input
                id={name}
                name={name}
                value={value}
                type={type}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                className="border-1 border-white p-8"
            />
        </div>
    );
}

export default React.memo(Input);