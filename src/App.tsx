import { useState, useEffect } from "react"
import { colord, extend } from "colord"
import namesPlugin from "colord/plugins/names"
import { parse, formatHex, formatRgb, formatHsl } from "culori"
import { Copy, Check, Search, Moon, Sun, Monitor } from "lucide-react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

extend([namesPlugin])

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const TAILWIND_COLORS = {
  slate: {
    50: "oklch(98.4% 0.003 247.858)",
    100: "oklch(96.8% 0.007 247.896)",
    200: "oklch(92.9% 0.013 255.508)",
    300: "oklch(86.9% 0.022 252.894)",
    400: "oklch(70.4% 0.04 256.788)",
    500: "oklch(55.4% 0.046 257.417)",
    600: "oklch(44.6% 0.043 257.281)",
    700: "oklch(37.2% 0.044 257.287)",
    800: "oklch(27.9% 0.041 260.031)",
    900: "oklch(20.8% 0.042 265.755)",
    950: "oklch(12.9% 0.042 264.695)",
  },
  gray: {
    50: "oklch(98.5% 0.002 247.839)",
    100: "oklch(96.7% 0.003 264.542)",
    200: "oklch(92.8% 0.006 264.531)",
    300: "oklch(87.2% 0.01 258.338)",
    400: "oklch(70.7% 0.022 261.325)",
    500: "oklch(55.1% 0.027 264.364)",
    600: "oklch(44.6% 0.03 256.802)",
    700: "oklch(37.3% 0.034 259.733)",
    800: "oklch(27.8% 0.033 256.848)",
    900: "oklch(21% 0.034 264.665)",
    950: "oklch(13% 0.028 261.692)",
  },
  zinc: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(96.7% 0.001 286.375)",
    200: "oklch(92% 0.004 286.32)",
    300: "oklch(87.1% 0.006 286.286)",
    400: "oklch(70.5% 0.015 286.067)",
    500: "oklch(55.2% 0.016 285.938)",
    600: "oklch(44.2% 0.017 285.786)",
    700: "oklch(37% 0.013 285.805)",
    800: "oklch(27.4% 0.006 286.033)",
    900: "oklch(21% 0.006 285.885)",
    950: "oklch(14.1% 0.005 285.823)",
  },
  neutral: {
    50: "oklch(98.5% 0 0)",
    100: "oklch(97% 0 0)",
    200: "oklch(92.2% 0 0)",
    300: "oklch(87% 0 0)",
    400: "oklch(70.8% 0 0)",
    500: "oklch(55.6% 0 0)",
    600: "oklch(43.9% 0 0)",
    700: "oklch(37.1% 0 0)",
    800: "oklch(26.9% 0 0)",
    900: "oklch(20.5% 0 0)",
    950: "oklch(14.5% 0 0)",
  },
  stone: {
    50: "oklch(98.5% 0.001 106.423)",
    100: "oklch(97% 0.001 106.424)",
    200: "oklch(92.3% 0.003 48.717)",
    300: "oklch(86.9% 0.005 56.366)",
    400: "oklch(70.9% 0.01 56.259)",
    500: "oklch(55.3% 0.013 58.071)",
    600: "oklch(44.4% 0.011 73.639)",
    700: "oklch(37.4% 0.01 67.558)",
    800: "oklch(26.8% 0.007 34.298)",
    900: "oklch(21.6% 0.006 56.043)",
    950: "oklch(14.7% 0.004 49.25)",
  },
  red: {
    50: "oklch(97.1% 0.013 17.38)",
    100: "oklch(93.6% 0.032 17.717)",
    200: "oklch(88.5% 0.062 18.334)",
    300: "oklch(80.8% 0.114 19.571)",
    400: "oklch(70.4% 0.191 22.216)",
    500: "oklch(63.7% 0.237 25.331)",
    600: "oklch(57.7% 0.245 27.325)",
    700: "oklch(50.5% 0.213 27.518)",
    800: "oklch(44.4% 0.177 26.899)",
    900: "oklch(39.6% 0.141 25.723)",
    950: "oklch(25.8% 0.092 26.042)",
  },
  orange: {
    50: "oklch(98% 0.016 73.684)",
    100: "oklch(95.4% 0.038 75.164)",
    200: "oklch(90.1% 0.076 70.697)",
    300: "oklch(83.7% 0.128 66.29)",
    400: "oklch(75% 0.183 55.934)",
    500: "oklch(70.5% 0.213 47.604)",
    600: "oklch(64.6% 0.222 41.116)",
    700: "oklch(55.3% 0.195 38.402)",
    800: "oklch(47% 0.157 37.304)",
    900: "oklch(40.8% 0.123 38.172)",
    950: "oklch(26.6% 0.079 36.259)",
  },
  amber: {
    50: "oklch(98.7% 0.022 95.277)",
    100: "oklch(96.2% 0.059 95.617)",
    200: "oklch(92.4% 0.12 95.746)",
    300: "oklch(87.9% 0.169 91.605)",
    400: "oklch(82.8% 0.189 84.429)",
    500: "oklch(76.9% 0.188 70.08)",
    600: "oklch(66.6% 0.179 58.318)",
    700: "oklch(55.5% 0.163 48.998)",
    800: "oklch(47.3% 0.137 46.201)",
    900: "oklch(41.4% 0.112 45.904)",
    950: "oklch(27.9% 0.077 45.635)",
  },
  yellow: {
    50: "oklch(98.7% 0.026 102.212)",
    100: "oklch(97.3% 0.071 103.193)",
    200: "oklch(94.5% 0.129 101.54)",
    300: "oklch(90.5% 0.182 98.111)",
    400: "oklch(85.2% 0.199 91.936)",
    500: "oklch(79.5% 0.184 86.047)",
    600: "oklch(68.1% 0.162 75.834)",
    700: "oklch(55.4% 0.135 66.442)",
    800: "oklch(47.6% 0.114 61.907)",
    900: "oklch(42.1% 0.095 57.708)",
    950: "oklch(28.6% 0.066 53.813)",
  },
  lime: {
    50: "oklch(98.6% 0.031 120.757)",
    100: "oklch(96.7% 0.067 122.328)",
    200: "oklch(93.8% 0.127 124.321)",
    300: "oklch(89.7% 0.196 126.665)",
    400: "oklch(84.1% 0.238 128.85)",
    500: "oklch(76.8% 0.233 130.85)",
    600: "oklch(64.8% 0.2 131.684)",
    700: "oklch(53.2% 0.157 131.589)",
    800: "oklch(45.3% 0.124 130.933)",
    900: "oklch(40.5% 0.101 131.063)",
    950: "oklch(27.4% 0.072 132.109)",
  },
  green: {
    50: "oklch(98.2% 0.018 155.826)",
    100: "oklch(96.2% 0.044 156.743)",
    200: "oklch(92.5% 0.084 155.995)",
    300: "oklch(87.1% 0.15 154.449)",
    400: "oklch(79.2% 0.209 151.711)",
    500: "oklch(72.3% 0.219 149.579)",
    600: "oklch(62.7% 0.194 149.214)",
    700: "oklch(52.7% 0.154 150.069)",
    800: "oklch(44.8% 0.119 151.328)",
    900: "oklch(39.3% 0.095 152.535)",
    950: "oklch(26.6% 0.065 152.934)",
  },
  emerald: {
    50: "oklch(97.9% 0.021 166.113)",
    100: "oklch(95% 0.052 163.051)",
    200: "oklch(90.5% 0.093 164.15)",
    300: "oklch(84.5% 0.143 164.978)",
    400: "oklch(76.5% 0.177 163.223)",
    500: "oklch(69.6% 0.17 162.48)",
    600: "oklch(59.6% 0.145 163.225)",
    700: "oklch(50.8% 0.118 165.612)",
    800: "oklch(43.2% 0.095 166.913)",
    900: "oklch(37.8% 0.077 168.94)",
    950: "oklch(26.2% 0.051 172.552)",
  },
  teal: {
    50: "oklch(98.4% 0.014 180.72)",
    100: "oklch(95.3% 0.051 180.801)",
    200: "oklch(91% 0.096 180.426)",
    300: "oklch(85.5% 0.138 181.071)",
    400: "oklch(77.7% 0.152 181.912)",
    500: "oklch(70.4% 0.14 182.503)",
    600: "oklch(60% 0.118 184.704)",
    700: "oklch(51.1% 0.096 186.391)",
    800: "oklch(43.7% 0.078 188.216)",
    900: "oklch(38.6% 0.063 188.416)",
    950: "oklch(27.7% 0.046 192.524)",
  },
  cyan: {
    50: "oklch(98.4% 0.019 200.873)",
    100: "oklch(95.6% 0.045 203.388)",
    200: "oklch(91.7% 0.08 205.041)",
    300: "oklch(86.5% 0.127 207.078)",
    400: "oklch(78.9% 0.154 211.53)",
    500: "oklch(71.5% 0.143 215.221)",
    600: "oklch(60.9% 0.126 221.723)",
    700: "oklch(52% 0.105 223.128)",
    800: "oklch(45% 0.085 224.283)",
    900: "oklch(39.8% 0.07 227.392)",
    950: "oklch(30.2% 0.056 229.695)",
  },
  sky: {
    50: "oklch(97.7% 0.013 236.62)",
    100: "oklch(95.1% 0.026 236.824)",
    200: "oklch(90.1% 0.058 230.902)",
    300: "oklch(82.8% 0.111 230.318)",
    400: "oklch(74.6% 0.16 232.661)",
    500: "oklch(68.5% 0.169 237.323)",
    600: "oklch(58.8% 0.158 241.966)",
    700: "oklch(50% 0.134 242.749)",
    800: "oklch(44.3% 0.11 240.79)",
    900: "oklch(39.1% 0.09 240.876)",
    950: "oklch(29.3% 0.066 243.157)",
  },
  blue: {
    50: "oklch(97% 0.014 254.604)",
    100: "oklch(93.2% 0.032 255.585)",
    200: "oklch(88.2% 0.059 254.128)",
    300: "oklch(80.9% 0.105 251.813)",
    400: "oklch(70.7% 0.165 254.624)",
    500: "oklch(62.3% 0.214 259.815)",
    600: "oklch(54.6% 0.245 262.881)",
    700: "oklch(48.8% 0.243 264.376)",
    800: "oklch(42.4% 0.199 265.638)",
    900: "oklch(37.9% 0.146 265.522)",
    950: "oklch(28.2% 0.091 267.935)",
  },
  indigo: {
    50: "oklch(96.2% 0.018 272.314)",
    100: "oklch(93% 0.034 272.788)",
    200: "oklch(87% 0.065 274.039)",
    300: "oklch(78.5% 0.115 274.713)",
    400: "oklch(67.3% 0.182 276.935)",
    500: "oklch(58.5% 0.233 277.117)",
    600: "oklch(51.1% 0.262 276.966)",
    700: "oklch(45.7% 0.24 277.023)",
    800: "oklch(39.8% 0.195 277.366)",
    900: "oklch(35.9% 0.144 278.697)",
    950: "oklch(25.7% 0.09 281.288)",
  },
  violet: {
    50: "oklch(96.9% 0.016 293.756)",
    100: "oklch(94.3% 0.029 294.588)",
    200: "oklch(89.4% 0.057 293.283)",
    300: "oklch(81.1% 0.111 293.571)",
    400: "oklch(70.2% 0.183 293.541)",
    500: "oklch(60.6% 0.25 292.717)",
    600: "oklch(54.1% 0.281 293.009)",
    700: "oklch(49.1% 0.27 292.581)",
    800: "oklch(43.2% 0.232 292.759)",
    900: "oklch(38% 0.189 293.745)",
    950: "oklch(28.3% 0.141 291.089)",
  },
  purple: {
    50: "oklch(97.7% 0.014 308.299)",
    100: "oklch(94.6% 0.033 307.174)",
    200: "oklch(90.2% 0.063 306.703)",
    300: "oklch(82.7% 0.119 306.383)",
    400: "oklch(71.4% 0.203 305.504)",
    500: "oklch(62.7% 0.265 303.9)",
    600: "oklch(55.8% 0.288 302.321)",
    700: "oklch(49.6% 0.265 301.924)",
    800: "oklch(43.8% 0.218 303.724)",
    900: "oklch(38.1% 0.176 304.987)",
    950: "oklch(29.1% 0.149 302.717)",
  },
  fuchsia: {
    50: "oklch(97.7% 0.017 320.058)",
    100: "oklch(95.2% 0.037 318.852)",
    200: "oklch(90.3% 0.076 319.62)",
    300: "oklch(83.3% 0.145 321.434)",
    400: "oklch(74% 0.238 322.16)",
    500: "oklch(66.7% 0.295 322.15)",
    600: "oklch(59.1% 0.293 322.896)",
    700: "oklch(51.8% 0.253 323.949)",
    800: "oklch(45.2% 0.211 324.591)",
    900: "oklch(40.1% 0.17 325.612)",
    950: "oklch(29.3% 0.136 325.661)",
  },
  pink: {
    50: "oklch(97.1% 0.014 343.198)",
    100: "oklch(94.8% 0.028 342.258)",
    200: "oklch(89.9% 0.061 343.231)",
    300: "oklch(82.3% 0.12 346.018)",
    400: "oklch(71.8% 0.202 349.761)",
    500: "oklch(65.6% 0.241 354.308)",
    600: "oklch(59.2% 0.249 0.584)",
    700: "oklch(52.5% 0.223 3.958)",
    800: "oklch(45.9% 0.187 3.815)",
    900: "oklch(40.8% 0.153 2.432)",
    950: "oklch(28.4% 0.109 3.907)",
  },
  rose: {
    50: "oklch(96.9% 0.015 12.422)",
    100: "oklch(94.1% 0.03 12.58)",
    200: "oklch(89.2% 0.058 10.001)",
    300: "oklch(81% 0.117 11.638)",
    400: "oklch(71.2% 0.194 13.428)",
    500: "oklch(64.5% 0.246 16.439)",
    600: "oklch(58.6% 0.253 17.585)",
    700: "oklch(51.4% 0.222 16.935)",
    800: "oklch(45.5% 0.188 13.697)",
    900: "oklch(41% 0.159 10.272)",
    950: "oklch(27.1% 0.105 12.094)",
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

  const copyToClipboard = (
    colorName: string,
    shade: string,
    colorValue: string
  ) => {
    let textToCopy = ""
    const color = parse(colorValue)
    if (!color) return

    switch (format) {
      case "className":
        textToCopy = `${colorName}-${shade}`
        break
      case "hex":
        textToCopy = formatHex(color) || colorValue
        break
      case "rgb":
        textToCopy = formatRgb(color) || ""
        break
      case "hsl":
        textToCopy = formatHsl(color) || ""
        break
      case "oklch":
        textToCopy = colorValue
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
              className="fill-sky-500"
            />
            <g id="Wave2" transform="matrix(1,0,0,1,-227,269.46787)">
              <path
                d="M512,237C696.178,237 729.365,399.347 835.365,399.312C910.81,399.287 962,328 962,328C912.328,526.515 747.315,507.015 737,507C547.592,506.718 525.266,345.252 414.107,345.155C337.949,345.089 289,417 289,417C289,417 310.473,237 512,237Z"
                className="fill-sky-500"
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

        <div className="flex w-full">
          {(
            ["className", "hex", "rgb", "hsl", "oklch", "var"] as ColorFormat[]
          ).map((f, index) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={cn(
                "flex-1 px-4 py-2 text-xs font-medium border transition-all",
                index === 0 ? "rounded-l-md" : "",
                index === 5 ? "rounded-r-md" : "",
                index < 5 ? "border-r-0" : "",
                format === f
                  ? "bg-sky-500 border-sky-500 hover:bg-sky-400 text-white shadow-sm"
                  : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
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
                {Object.entries(shades).map(([shade, color]) => (
                  <button
                    key={shade}
                    onClick={() => copyToClipboard(name, shade, color)}
                    className="group relative aspect-square rounded-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    style={{ backgroundColor: color }}
                    title={`${name}-${shade}: ${color}`}>
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center transition-opacity",
                        colord(
                          formatHex(parse(color) ?? "#000") ?? "#000"
                        ).isDark()
                          ? "text-zinc-100 hover:text-white"
                          : "text-zinc-700 hover:text-zinc-900"
                      )}>
                      <span className="text-[10px] font-medium opacity-100 group-hover:opacity-0 transition-opacity">
                        {shade}
                      </span>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {copiedColor === `${name}-${shade}` ? (
                          <Check size={12} />
                        ) : (
                          <Copy size={12} />
                        )}
                      </div>
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
