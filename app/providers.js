'use client';

import { GlidersProvider } from "@/hooks/useGliders";
import { DriversProvider } from "@/hooks/useDrivers";
import { KartsProvider } from "@/hooks/useKarts";

export function Providers({ children }){
    return(
        <KartsProvider>
            <DriversProvider>
                <GlidersProvider>
                    {children}
                </GlidersProvider>
            </DriversProvider>
        </KartsProvider>
    )
}