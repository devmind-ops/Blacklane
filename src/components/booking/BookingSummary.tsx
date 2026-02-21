import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

interface BookingSummaryProps {
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    onEdit: () => void;
}

export function BookingSummary({ pickup, dropoff, date, time, onEdit }: BookingSummaryProps) {
    let formattedDate = "Invalid Date";
    try {
        formattedDate = format(new Date(`${date}T${time}`), "EEE, d MMM 'at' HH:mm");
    } catch (e) { }

    return (
        <div className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gold-primary">
                    <Calendar className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Journey Details</span>
                    <span className="text-sm text-white font-medium">{formattedDate}</span>
                </div>
            </div>

            <div className="flex-1 flex items-center gap-4 bg-white/5 px-6 py-3 rounded-xl border border-white/5 min-w-[300px]">
                <div className="flex-1 truncate">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Pickup</span>
                    <span className="text-sm text-white truncate block">{pickup}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0" />
                <div className="flex-1 truncate">
                    <span className="block text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Drop-off</span>
                    <span className="text-sm text-white truncate block">{dropoff}</span>
                </div>
            </div>

            <Button
                variant="outline"
                onClick={onEdit}
                className="border-white/10 text-[10px] uppercase tracking-widest font-bold h-10 hover:bg-white/5"
            >
                Edit Route
            </Button>
        </div>
    );
}
