'use client';

import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    function toggleTheme() {
        const root = document.documentElement;
        const nextIsDark = !root.classList.contains('dark');
        root.classList.toggle('dark', nextIsDark);
        localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors hover:border-solstice-300 hover:text-solstice-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-solstice-500 dark:hover:text-solstice-400"
        >
            <Sun className="h-[18px] w-[18px] dark:hidden" strokeWidth={1.75} />
            <Moon className="hidden h-[18px] w-[18px] dark:block" strokeWidth={1.75} />
        </button>
    );
}
