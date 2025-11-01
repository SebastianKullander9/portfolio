import BackBtn from "@/components/ui/buttons/backBtn/BackBtn";
import SmartBackBtnWrapper from "@/components/ui/buttons/smartBackBtnWrapper/SmartBackBtnWrapper";

export default async function PrivacyPage() {
    return (
        <>
            <div className="w-full site-x-padding text-white lg:sticky lg:top-[248px]">
                <SmartBackBtnWrapper>
                    <BackBtn label="Go Back"/>
                </SmartBackBtnWrapper>

            </div>

            <section className="relative text-white site-x-padding site-y-padding flex flex-col max-w-prose mx-auto gap-12 pt-0">
                <p className="text-sm flex justify-end">Last updated: November 2025</p>
                <h1>Privacy Policy</h1>

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">1. Who I am</h2>
                    <p>This website is operated by Sebastian Kullander.</p>
                    <p>You can contact me at: <a className="underline underline-offset-2" href="mailto:sebastian.kullander9@gmail.com">sebastian.kullander9@gmail.com</a></p>
                    
                </div>
                

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">2. Information I collect</h2>
                    <p>When you use the contact form on this site i may collect the following information:</p>
                    <ul className="list-disc pl-6">
                        <li>Your <strong>name</strong> (if you choose to provide it)</li>
                        <li>Your <strong>email address</strong></li>
                        <li>Your <strong>phone number</strong> (optional)</li>
                        <li>The <strong>message</strong> you send me</li>
                    </ul>   
                </div>


                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">3. How I use your information</h2>
                    <p>I use the information you provide <strong>solely</strong> to:</p>
                    <ul className="list-disc pl-6">
                        <li>Respond to your message or inquiry</li>
                        <li>Communicate with you about the reason you contacted me</li>
                    </ul>
                    <p>I do not <strong>use</strong> your information for marketing purposes or share it with third parties for advertising.</p>
                </div>
                

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">4. How Your Data Is Processed</h2>
                    <p>Messages submitted through the contact form are sent to me via <strong>Resend</strong>, a third-party email delivery service.</p>
                    <p>Resend processes the data securely to deliver the email to my inbox. You can view Resend&apos;s privacy policy here: <a className="underline underline-offset-2" rel="noopener noreferrer" target="_blank" href="https://resend.com/legal/privacy-policy">https://resend.com/legal/privacy-policy</a></p>
                </div>
                
                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">5. Data retention</h2>
                    <p>
                        I retain your messages only as long as necessary to respond and maintain records of communication.
                        If you would like your message or contact details deleted, you can request this at any time (see Section 7).
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">6. Legal basis for processing</h2>
                    <p>Under the General Data Protection Regulation (GDPR), I process your personal data on the basis of:</p>
                    <ul className="list-disc pl-6">
                        <li><strong>Consent</strong> (Article 6(1)(a)) — when you choose to send me a message, and</li>
                        <li><strong>Legitimate interest</strong> (Article 6(1)(f)) — to respond to inquiries and maintain correspondence.</li>
                    </ul>  
                </div>
                

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">7. Your rights</h2>
                    <p>Under GDPR, you have the following rights regarding your personal data:</p>
                    <ul className="list-disc pl-6">
                        <li>The right to <strong>access</strong> the information I hold about you</li>
                        <li>The right to <strong>rectify</strong> inaccurate information</li>
                        <li>The right to <strong>request deletion</strong> of your data</li>
                        <li>The right to <strong>restrict</strong> or <strong>object</strong> to processing</li>
                        <li>The right to <strong>data portability</strong></li>
                    </ul>
                    <p>To exercise these rights, please contact me at <a href="mailto:sebastian.kullander9@email.com" className="underline underline-offset-2">sebastian.kullander9@email.com</a></p>
                </div>
                

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">8. Data security</h2>
                    <p>
                        I take reasonable measures to protect your data against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet is 100% secure.
                    </p>
                </div>
                

                <div className="flex flex-col gap-2">
                    <h2 className="heading-4">9. Changes to this policy</h2>
                    <p>I may update this Privacy Policy from time to time. The most recent version will always be available on this page.</p>
                </div>
            </section>
        </>
    );
}