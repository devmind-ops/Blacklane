export function FleetSkeleton() {
    return (
        <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-panel overflow-hidden rounded-lg border border-white/5 bg-zinc-900/20">
                    <div className="h-80 w-full bg-zinc-800/50" />
                    <div className="p-10 space-y-6">
                        <div className="h-8 bg-zinc-800 rounded w-1/2" />
                        <div className="space-y-3">
                            <div className="h-4 bg-zinc-800 rounded w-full" />
                            <div className="h-4 bg-zinc-800 rounded w-5/6" />
                        </div>
                        <div className="pt-6 flex gap-4">
                            <div className="h-12 bg-zinc-800 rounded flex-1" />
                            <div className="h-12 bg-zinc-800 rounded flex-1" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
