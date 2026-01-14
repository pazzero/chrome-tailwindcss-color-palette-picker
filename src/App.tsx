import { useState, useEffect } from "react"
import { colord, extend } from "colord"
import namesPlugin from "colord/plugins/names"
import {
  parse,
  formatHex,
  formatRgb,
  formatHsl,
  formatCss,
  oklch,
} from "culori"
import { Copy, Check, Search, Moon, Sun, Monitor } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

extend([namesPlugin])

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TAILWIND_COLORS = {
  slate: {
    50: "#f8fafc",
    100: "#f1f5f9",
    200: "#e2e8f0",
    300: "#cbd5e1",
    400: "#94a3b8",
    500: "#64748b",
    600: "#475569",
    700: "#334155",
    800: "#1e293b",
    900: "#0f172a",
    950: "#020617",
  },
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
    950: "#030712",
  },
  zinc: {
    50: "#fafafa",
    100: "#f4f4f5",
    200: "#e4e4e7",
    300: "#d4d4d8",
    400: "#a1a1aa",
    500: "#71717a",
    600: "#52525b",
    700: "#3f3f46",
    800: "#27272a",
    900: "#18181b",
    950: "#09090b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  stone: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c",
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
    950: "#0c0a09",
  },
  red: {
    50: "#fef2f2",
    100: "#fee2e2",
    200: "#fecaca",
    300: "#fca5a5",
    400: "#f87171",
    500: "#ef4444",
    600: "#dc2626",
    700: "#b91c1c",
    800: "#991b1b",
    900: "#7f1d1d",
    950: "#450a0a",
  },
  orange: {
    50: "#fff7ed",
    100: "#ffedd5",
    200: "#fed7aa",
    300: "#fdba74",
    400: "#fb923c",
    500: "#f97316",
    600: "#ea580c",
    700: "#c2410c",
    800: "#9a3412",
    900: "#7c2d12",
    950: "#431407",
  },
  amber: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b",
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
    950: "#451a03",
  },
  yellow: {
    50: "#fefce8",
    100: "#fef9c3",
    200: "#fef08a",
    300: "#fde047",
    400: "#facc15",
    500: "#eab308",
    600: "#ca8a04",
    700: "#a16207",
    800: "#854d0e",
    900: "#713f12",
    950: "#422006",
  },
  lime: {
    50: "#f7fee7",
    100: "#ecfccb",
    200: "#d9f99d",
    300: "#bef264",
    400: "#a3e635",
    500: "#84cc16",
    600: "#65a30d",
    700: "#4d7c0f",
    800: "#3f6212",
    900: "#365314",
    950: "#1a2e05",
  },
  green: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
    950: "#052e16",
  },
  emerald: {
    50: "#ecfdf5",
    100: "#d1fae5",
    200: "#a7f3d0",
    300: "#6ee7b7",
    400: "#34d399",
    500: "#10b981",
    600: "#059669",
    700: "#047857",
    800: "#065f46",
    900: "#064e3b",
    950: "#022c22",
  },
  teal: {
    50: "#f0fdfa",
    100: "#ccfbf1",
    200: "#99f6e4",
    300: "#5eead4",
    400: "#2dd4bf",
    500: "#14b8a6",
    600: "#0d9488",
    700: "#0f766e",
    800: "#115e59",
    900: "#134e4a",
    950: "#042f2e",
  },
  cyan: {
    50: "#ecfeff",
    100: "#cffafe",
    200: "#a5f3fc",
    300: "#67e8f9",
    400: "#22d3ee",
    500: "#06b6d4",
    600: "#0891b2",
    700: "#0e7490",
    800: "#155e75",
    900: "#164e63",
    950: "#083344",
  },
  sky: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9",
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
    950: "#082f49",
  },
  blue: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
    950: "#172554",
  },
  indigo: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  violet: {
    50: "#f5f3ff",
    100: "#ede9fe",
    200: "#ddd6fe",
    300: "#c4b5fd",
    400: "#a78bfa",
    500: "#8b5cf6",
    600: "#7c3aed",
    700: "#6d28d9",
    800: "#5b21b6",
    900: "#4c1d95",
    950: "#2e1065",
  },
  purple: {
    50: "#faf5ff",
    100: "#f3e8ff",
    200: "#e9d5ff",
    300: "#d8b4fe",
    400: "#c084fc",
    500: "#a855f7",
    600: "#9333ea",
    700: "#7e22ce",
    800: "#6b21a8",
    900: "#581c87",
    950: "#3b0764",
  },
  fuchsia: {
    50: "#fdf4ff",
    100: "#fae8ff",
    200: "#f5d0fe",
    300: "#f0abfc",
    400: "#e879f9",
    500: "#d946ef",
    600: "#c026d3",
    700: "#a21caf",
    800: "#86198f",
    900: "#701a75",
    950: "#4a044e",
  },
  pink: {
    50: "#fdf2f8",
    100: "#fce7f3",
    200: "#fbcfe8",
    300: "#f9a8d4",
    400: "#f472b6",
    500: "#ec4899",
    600: "#db2777",
    700: "#be185d",
    800: "#9d174d",
    900: "#831843",
    950: "#500724",
  },
  rose: {
    50: "#fff1f2",
    100: "#ffe4e6",
    200: "#fecdd3",
    300: "#fda4af",
    400: "#fb7185",
    500: "#f43f5e",
    600: "#e11d48",
    700: "#be123c",
    800: "#9f1239",
    900: "#881337",
    950: "#4c0519",
  },
}

type ColorFormat = "className" | "hex" | "rgb" | "hsl" | "oklch" | "var"

function App() {
  const [search, setSearch] = useState("")
  const [format, setFormat] = useState<ColorFormat>("className")
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const applyTheme = () => {
      const currentTheme =
        theme === "system" ? (mediaQuery.matches ? "dark" : "light") : theme

      root.classList.remove("light", "dark")
      root.classList.add(currentTheme)
    }

    applyTheme()

    if (theme === "system") {
      mediaQuery.addEventListener("change", applyTheme)
      return () => mediaQuery.removeEventListener("change", applyTheme)
    }
  }, [theme])

  const copyToClipboard = (colorName: string, shade: string, hex: string) => {
    let textToCopy = ""
    const color = parse(hex)
    if (!color) return

    switch (format) {
      case "className":
        textToCopy = `${colorName}-${shade}`
        break
      case "hex":
        textToCopy = formatHex(color) || hex
        break
      case "rgb":
        textToCopy = formatRgb(color) || ""
        break
      case "hsl":
        textToCopy = formatHsl(color) || ""
        break
      case "oklch":
        // @ts-ignore
        textToCopy = formatCss(oklch(color)) || ""
        break
      case "var":
        textToCopy = `var(--${colorName}-${shade})`
        break
    }

    navigator.clipboard.writeText(textToCopy)
    setCopiedColor(`${colorName}-${shade}`)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const filteredColors = Object.entries(TAILWIND_COLORS).filter(([name]) =>
    name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-w-[400px] max-w-[500px] min-h-[500px] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 p-4 font-sans">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlSpace="preserve"
            className="w-8 h-8">
            {/* <path
              id="Background"
              d="M1024,204.8L1024,819.2C1024,932.232 932.232,1024 819.2,1024L204.8,1024C91.768,1024 0,932.232 0,819.2L0,204.8C0,91.768 91.768,0 204.8,0L819.2,0C932.232,0 1024,91.768 1024,204.8Z"
              fill="url(#linear-gradient)"
            /> */}
            <path
              id="Wave1"
              d="M512,237C696.178,237 729.365,399.347 835.365,399.312C910.81,399.287 962,328 962,328C912.328,526.515 747.315,507.015 737,507C547.592,506.718 525.266,345.252 414.107,345.155C337.949,345.089 289,417 289,417C289,417 310.473,237 512,237Z"
              className="dark:fill-white fill-zinc-900"
            />
            <g id="Wave2" transform="matrix(1,0,0,1,-227,269.46787)">
              <path
                d="M512,237C696.178,237 729.365,399.347 835.365,399.312C910.81,399.287 962,328 962,328C912.328,526.515 747.315,507.015 737,507C547.592,506.718 525.266,345.252 414.107,345.155C337.949,345.089 289,417 289,417C289,417 310.473,237 512,237Z"
                className="dark:fill-white fill-zinc-900"
              />
            </g>
            {/* <defs>
              <linearGradient
                id="linear-gradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
                gradientUnits="userSpaceOnUse"
                gradientTransform="matrix(1024,1024,-1024,1024,0,0)">
                <stop offset="0%" stopColor="#16BECB" stopOpacity="1" />
                <stop offset="100%" stopColor="#161D2D" stopOpacity="1" />
              </linearGradient>
            </defs> */}
          </svg>
          <h1 className="text-lg font-bold">Tailwind CSS Colors</h1>
        </div>
        <div className="flex gap-1 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-md">
          <button
            onClick={() => setTheme("light")}
            className={cn(
              "p-1.5 rounded-sm transition-colors",
              theme === "light"
                ? "bg-white dark:bg-zinc-800 shadow-sm"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
            )}>
            <Sun size={14} />
          </button>
          <button
            onClick={() => setTheme("system")}
            className={cn(
              "p-1.5 rounded-sm transition-colors",
              theme === "system"
                ? "bg-white dark:bg-zinc-800 shadow-sm"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
            )}>
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setTheme("dark")}
            className={cn(
              "p-1.5 rounded-sm transition-colors",
              theme === "dark"
                ? "bg-white dark:bg-zinc-800 shadow-sm"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-800"
            )}>
            <Moon size={14} />
          </button>
        </div>
      </header>

      <div className="space-y-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Search colors..."
            className="w-full bg-zinc-100 dark:bg-zinc-900 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-sky-500 transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            ["className", "hex", "rgb", "hsl", "oklch", "var"] as ColorFormat[]
          ).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "px-2.5 py-1 rounded-md text-xs font-medium border transition-all",
                format === f
                  ? "bg-sky-500 border-sky-500 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700"
              )}>
              {f === "className" ? "Class" : f.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-6 pt-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {filteredColors.map(([name, shades]) => (
            <div key={name} className="space-y-2">
              <h2 className="text-sm font-semibold capitalize px-1">{name}</h2>
              <div className="grid grid-cols-11 gap-1">
                {Object.entries(shades).map(([shade, hex]) => (
                  <button
                    key={shade}
                    onClick={() => copyToClipboard(name, shade, hex)}
                    className="group relative aspect-square rounded-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    style={{ backgroundColor: hex }}
                    title={`${name}-${shade}: ${hex}`}>
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                        colord(hex).isDark() ? "text-white" : "text-black"
                      )}>
                      {copiedColor === `${name}-${shade}` ? (
                        <Check size={12} />
                      ) : (
                        <Copy size={12} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {filteredColors.length === 0 && (
            <div className="text-center py-10 text-zinc-500">
              No colors found for "{search}"
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #27272a;
        }
      `}</style>
    </div>
  )
}

export default App
