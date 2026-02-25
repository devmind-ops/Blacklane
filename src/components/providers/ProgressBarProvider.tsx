'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { Suspense } from 'react';

export const ProgressBarProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Suspense fallback={null}>
                <ProgressBar
                    height="4px"
                    color="#EAB308"
                    options={{ showSpinner: true, trickleSpeed: 200 }}
                    shallowRouting={false}
                    delay={100}
                />
            </Suspense>
        </>
    );
};
