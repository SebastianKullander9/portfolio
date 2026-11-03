import Header from "@/components/ui/header/Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <> 
            <Header />
            {children}
        </>
    )
}
