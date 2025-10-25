import FormBtn from "../../buttons/formBtn/FormBtn";
import Link from "next/link";

export default function StepResult() {
    return (
        <div  className="flex flex-col gap-24">
            <div className="flex flex-col gap-12 text-center md:text-start">
                <h2 className="text-3xl font-bold">Message sent!</h2>
                <div>
                    <p>Thank you for reaching out. Your message has been successfully delivered.</p>
                    <p>I will review your message and get back to you as soon as possible!</p>
                </div>
            </div>
            
            
            <div className="w-full flex justify-center md:justify-end">
                <Link href="/">
                    <FormBtn label="Home page" />
                </Link>
            </div>
        </div>
    )
}