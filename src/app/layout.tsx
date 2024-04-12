import './globals.css';
import type { Metadata } from 'next';
import { type ReactNode } from 'react';

import { Providers } from './providers';

export const metadata: Metadata = {
  description: 'Ethereum Exercise',
  title: 'ethereum-exercise',
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen min-w-screen flex flex-col">
        <Providers>
          <main className="flex flex-col flex-1 md:items-center my-12">
            <div className="w-full h-full px-4 md:w-[768px] md:px-0">
              {props.children}
            </div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
