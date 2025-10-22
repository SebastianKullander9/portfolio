import Header from "@/components/ui/header/Header";
import ClientHeaderWrapper from "@/components/ui/header/ClientHeaderWrapper";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <> 
            <ClientHeaderWrapper>
                <Header />
            </ClientHeaderWrapper>
            {children}
        </>
    )
}