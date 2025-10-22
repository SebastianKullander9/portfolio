type InputProps = {
    state?: string;
    setState?: (value: string) => void;
    label: string;
    type: string;
    name: string;
    placeholder: string;
}

export default function Input({ state, setState, label, name, placeholder }: InputProps) {
    return (
        <div className="flex flex-col gap-8">
            <label htmlFor={name} className="mt-24">
                {label}
            </label> 
            <input
                id={name}
                name={name}
                value={state}
                //onChange={(e) => setState(e.target.value)}
                placeholder={placeholder}
                className="border-1 border-white p-8"
            />
        </div>
    )
}