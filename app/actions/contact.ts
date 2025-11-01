"use server";

import { Resend } from "resend";
import { ipAddress } from "@vercel/edge";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);
    
    const MAX_REQUESTS = 3;
    const WINDOW_MS = 60 * 60 * 1000;
    
    if (!limit || now > limit.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
        return true;
    }
    
    if (limit.count >= MAX_REQUESTS) {
        return false;
    }
    
    limit.count++;
    return true;
}

function sanitizeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function sendContactEmail(formData: FormData) {
    const honeypot = formData.get("website");

    if (honeypot) {
        return { success: true};
    }

    const headersList = await headers();
    const ip = ipAddress({ headers: headersList }) || "unknown";

    if (!checkRateLimit(ip)) {
        return { 
            success: false, 
            error: "Too many requests. Please try again later." 
        };
    }

    const name = formData.get("name") as string;
    const company = formData.get("company") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;
    const privacy = formData.get("privacy") as string;

    if (!name || !email || !message || privacy !== "true") {
        return { success: false, error: "Missing required fields." };
    }

    if (name.length < 2 || name.length > 100) {
        return { success: false, error: "Name must be between 2 and 100 characters." };
    }

    if (!isValidEmail(email)) {
        return { success: false, error: "Invalid email format." };
    }

    if (message.length < 10 || message.length > 5000) {
        return { success: false, error: "Message must be between 10 and 5000 characters." };
    }

    if (phone && phone.length > 20) {
        return { success: false, error: "Invalid phone number." };
    }

    if (company && company.length > 100) {
        return { success: false, error: "Company name too long." };
    }

    const safeName = sanitizeHtml(name);
    const safeCompany = sanitizeHtml(company);
    const safeEmail = sanitizeHtml(email);
    const safePhone = sanitizeHtml(phone);
    const safeMessage = sanitizeHtml(message);

    try {
        await resend.emails.send({
            from: "Contact Form <onboarding@resend.dev>",
            to: "kullander.sebastian@gmail.com",
            replyTo: email,
            subject: `New message from ${safeName}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>From:</strong> ${safeName}</p>
                <p><strong>Email:</strong> ${safeEmail}</p>
                ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
                ${safePhone ? `<p><strong>Phone:</strong> ${safePhone}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${safeMessage.replace(/\n/g, '<br>')}</p>
            `
        });

        return { success: true };
    } catch (error) {
        console.error("Error sending email: ", error);
        return { success: false, error: "Failed to send message" };
    }
}