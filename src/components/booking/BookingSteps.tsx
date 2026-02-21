import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface BookingStepsProps {
    currentStep: number;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
    const steps = [
        { id: 1, label: "Vehicle" },
        { id: 2, label: "Details" },
        { id: 3, label: "Checkout" }
    ];

    return (
        <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((step, index) => (
                <div key={step.id} className="flex-1 flex items-center">
                    <div className="flex flex-col items-center gap-2 relative">
                        <div className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                            currentStep >= step.id
                                ? "border-gold-primary bg-gold-primary text-black"
                                : "border-white/20 bg-transparent text-gray-500"
                        )}>
                            {currentStep > step.id ? (
                                <Check className="w-6 h-6" />
                            ) : (
                                <span className="text-sm font-bold">{step.id}</span>
                            )}
                        </div>
                        <span className={cn(
                            "text-[10px] uppercase tracking-widest font-bold",
                            currentStep >= step.id ? "text-gold-primary" : "text-gray-600"
                        )}>
                            {step.label}
                        </span>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "flex-1 h-[2px] mx-4 -mt-6 transition-all duration-1000",
                            currentStep > step.id ? "bg-gold-primary" : "bg-white/10"
                        )} />
                    )}
                </div>
            ))}
        </div>
    );
}
