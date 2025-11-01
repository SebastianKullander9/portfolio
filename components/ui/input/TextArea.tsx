type InputProps = {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    label: string;
    type: string;
    name: string;
    placeholder: string;
}

export default function TextArea({ value, onChange, label, name, placeholder }: InputProps) {
    return (
        <div className="flex flex-col gap-8">
            <label htmlFor={name}>
                {label}
            </label> 
            <textarea
                id={name}
                name={name}
                value={value}
                rows={5}
                onChange={onChange}
                placeholder={placeholder}
                required={true}
                minLength={10}
                maxLength={5000}
                className="border-1 border-white p-8"
            />
        </div>
    )
}