import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "var(--border)",
                input: "var(--input)",
                ring: "var(--ring)",
                background: "var(--background)",
                foreground: "var(--text-primary)",
                primary: {
                    DEFAULT: "var(--gov-blue)",
                    foreground: "var(--gov-white)",
                    dark: "var(--gov-blue-dark)",
                },
                secondary: {
                    DEFAULT: "var(--gov-saffron)",
                    foreground: "#000000",
                },
                destructive: {
                    DEFAULT: "var(--accent)",
                    foreground: "var(--accent-foreground)",
                },
                muted: {
                    DEFAULT: "var(--surface-muted)",
                    foreground: "var(--text-muted)",
                },
                popover: {
                    DEFAULT: "var(--surface)",
                    foreground: "var(--text-primary)",
                },
                card: {
                    DEFAULT: "var(--surface)",
                    foreground: "var(--text-primary)",
                },
            },
            borderRadius: {
                lg: "var(--radius-lg)",
                md: "var(--radius-md)",
                sm: "var(--radius-sm)",
            },
        },
    },
    plugins: [],
};
export default config;
