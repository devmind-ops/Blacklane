"use server";

import { supabase } from "@/lib/supabase";

export async function getFleet() {
    const { data, error } = await supabase
        .from("fleet")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.error("Error fetching fleet:", error.message, error.details, error.hint);
        return [];
    }

    return data;
}

export async function getFleetByCategory(category: string) {
    const { data, error } = await supabase
        .from("fleet")
        .select("*")
        .eq("category", category)
        .order("name", { ascending: true });

    if (error) {
        console.error(`Error fetching fleet for category ${category}:`, error);
        return [];
    }

    return data;
}
