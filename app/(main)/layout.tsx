import Header from "@/components/ui/header/Header";
import HeaderWrapper from "@/components/ui/header/HeaderWrapper";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <> 
            <HeaderWrapper>
                <Header />
            </HeaderWrapper>
            {children}
        </>
    )
}