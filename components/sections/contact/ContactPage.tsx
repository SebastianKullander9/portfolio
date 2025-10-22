import Input from "@/components/ui/input/Input"

export default function ContactPage() {
    return (
        <section className="w-screen h-screen relative site-x-padding site-y-padding">
            <div className="w-full h-full grid grid-cols-12">
                <div className="h-full col-span-4 bg-blue-500/30">
                    <h1 className="special-heading text-8xl text-white my-[25vh]">Contact</h1>

                </div>
                <div className="h-full col-span-8 bg-green-500/30">
                    <div className="flex flex-col text-white text-xl">
                        <Input label="Name *" name="name" type="text" placeholder="Name" />
                        <Input label="Company" name="company" type="text" placeholder="Company" />
                        <Input label="Email *" name="email" type="text" placeholder="Company@email.se" />
                        <Input label="Message *" name="message" type="text" placeholder="Message" />
                    </div>
                </div>
            </div>
        </section>
    )
}