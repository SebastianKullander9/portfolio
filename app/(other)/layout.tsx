import Header from "@/components/ui/header/Header";

export default function OtherLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}