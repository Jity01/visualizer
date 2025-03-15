import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        inknut: ['Inknut Antiqua', 'serif'],
      },
      colors: {
        themeBlue: '#160084',
      },
    },
  },
  plugins: [],
} satisfies Config;
