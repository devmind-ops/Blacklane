'use server';

import { createClient } from "@/lib/supabase/server";

export async function submitContactInquiry(formData: {
    full_name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
}) {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("contact_inquiries")
            .insert([formData])
            .select()
            .single();

        if (error) {
            console.error("Supabase contact insert error:", error);
            return { error: `Database error: ${error.message}` };
        }

        return { success: true, inquiryId: data.id };
    } catch (e: any) {
        console.error("Contact inquiry exception:", e);
        return { error: `Exception: ${e.message || "Unknown error"}` };
    }
}
