'use client';

import { ReactNode, useEffect } from 'react';
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
  // Effect to add the CSS variables for the Terra theme
  useEffect(() => {
    // Add the Terra theme CSS variables to the :root element
    const style = document.createElement('style');
    style.innerHTML = `
      /* Terra theme - Miami Vice inspired */
      [data-theme='terra'] {
        /* Base colors */
        --background: 0 0% 7%;
        --foreground: 210 40% 98%;
        
        /* Card colors */
        --card: 0 0% 10%;
        --card-foreground: 210 40% 98%;
        
        /* Primary palette: Miami Vice colors */
        --primary: 187 59% 67%;   /* #7FD1DB - Teal/cyan */
        --primary-foreground: 0 0% 7%;
        
        /* Secondary color: Pink */
        --secondary: 329 65% 65%; /* #E06CB0 - Pink */
        --secondary-foreground: 0 0% 100%;
        
        /* Accent color: Purple */
        --accent: 283 49% 56%;    /* #A35DC0 - Purple */
        --accent-foreground: 0 0% 100%;
        
        /* UI elements */
        --muted: 0 0% 16%;
        --muted-foreground: 0 0% 82%;
        
        --popover: 0 0% 10%;
        --popover-foreground: 210 40% 98%;
        
        /* Other UI elements */
        --border: 0 0% 20%;
        --input: 0 0% 16%;
        --ring: 329 65% 65%;      /* Pink for focus rings */
        
        /* Status colors */
        --destructive: 0 84% 60%;
        --destructive-foreground: 0 0% 100%;
        
        /* Border radius */
        --radius: 0.5rem;
      }
      
      /* Gradient effect for Terra theme buttons and accents */
      .terra-gradient {
        background: linear-gradient(to right, #E06CB0, #A35DC0, #7FD1DB);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <NextThemesProvider 
      attribute="data-theme"
      defaultTheme="system" 
      enableSystem={true}
      themes={['light', 'dark', 'terra']} // Add terra to the themes list
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}