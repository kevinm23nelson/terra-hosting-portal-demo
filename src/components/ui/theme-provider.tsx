'use client';

import { ReactNode } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Define the possible values for attribute
type Attribute = 'class' | 'data-theme' | 'data-mode';

type ThemeProviderProps = {
  children: ReactNode;
  attribute?: Attribute | Attribute[];
  defaultTheme?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  storageKey?: string;
  forcedTheme?: string;
  themes?: string[];
};

export function ThemeProvider({ 
  children, 
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}