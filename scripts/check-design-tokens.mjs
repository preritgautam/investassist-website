#!/usr/bin/env node
// Fails CI when code bypasses the global design system in app/globals.css.
import { readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, sep } from "node:path"

const ROOT = process.cwd()
const SCAN_DIRS = ["app", "components", "lib"]
const CODE_EXT = /\.(tsx|ts|jsx|js|mjs)$/
const ALLOWED_CSS = new Set(["app/globals.css"])
const CSS_IMPORT_ALLOWED = new Set(["app/layout.tsx"])
const HEX_ALLOWED = new Set(["lib/brand.ts"])

const TW_COLORS =
  "slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black"
const TW_PREFIXES =
  "bg|text|border|border-[trblxy]|from|via|to|ring|ring-offset|fill|stroke|outline|divide|placeholder|decoration|caret|accent|shadow"

const CODE_RULES = [
  { id: "px-font-size", re: /\btext-\[\d+(?:\.\d+)?px\]/g, msg: "pixel font size; use a type-scale token (text-micro … text-copy)" },
  { id: "rounded-large", re: /\brounded(?:-[trblse]{1,2})?-(?:full|xl|2xl|3xl)\b/g, msg: "rounded-full/xl+; use rounded, rounded-pill or rounded-round" },
  { id: "tw-color", re: new RegExp(`\\b(?:${TW_PREFIXES})-(?:${TW_COLORS})(?:-\\d{2,3})?(?:\\/\\d+)?\\b`, "g"), msg: "Tailwind palette colour; use a semantic token" },
  { id: "font-family", re: /\bfontFamily\s*:|\bfont-\[/g, msg: "stray font-family; fonts come from @theme (font-sans / font-mono)" },
]
// Status fills (--success, --warning, …) fail contrast as text on their pale --*-muted backgrounds.
// Status icons go through components/ui/status-icon.tsx (the only file allowed text-{status});
// text must use --*-muted-foreground.
const STATUS = "success|warning|info|destructive|attention"
const STATUS_ICON_FILE = "components/ui/status-icon.tsx"
const STATUS_TEXT_MSG = "status fill colour as a class; text uses text-{status}-muted-foreground, icons use <StatusIcon tone=…>"
const TW_STATUS_TEXT = new RegExp(`\\btext-(?:${STATUS})(?:\\/\\d+)?(?![\\w-])`, "g")
function recordStatusText(file, text) {
  if (file === STATUS_ICON_FILE) return
  for (const m of text.matchAll(TW_STATUS_TEXT)) {
    hits.push({ file, line: lineOf(text, m.index), rule: "status-text", match: m[0], msg: STATUS_TEXT_MSG })
  }
}

// --accent is the neutral HOVER surface only. Selected/subject states use --highlight,
// callouts and icon tiles use --surface-muted. Shared primitives in components/ui may use it
// for their own hover/highlighted states.
const ACCENT_MSG = "--accent is hover-only; selected/subject → highlight, callout/icon tile → surface-muted"
const TW_BARE_ACCENT = /(?<![\w:\/-])bg-accent(?:\/\d+)?(?![\w-])/g
function recordAccent(file, text) {
  if (file.startsWith("components/ui/")) return
  for (const m of text.matchAll(TW_BARE_ACCENT)) {
    hits.push({ file, line: lineOf(text, m.index), rule: "accent-non-hover", match: m[0], msg: ACCENT_MSG })
  }
}

const HEX_RULE = { id: "hex-color", re: /(?<![\w&/-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3,4})(?![\w-])/g, msg: "hex colour in code; read a CSS variable instead" }
const CSS_IMPORT_RULE = { id: "css-import", re: /^\s*import\s+(?:[^'"]*from\s+)?['"][^'"]+\.css['"]/gm, msg: "CSS import outside app/layout.tsx" }

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === "node_modules" || name.startsWith(".")) continue
    const full = join(dir, name)
    if (statSync(full).isDirectory()) walk(full, out)
    else out.push(full)
  }
  return out
}

const lineOf = (text, index) => text.slice(0, index).split("\n").length
const hits = []
const record = (file, text, rule) => {
  for (const m of text.matchAll(rule.re)) {
    hits.push({ file, line: lineOf(text, m.index), rule: rule.id, match: m[0].trim(), msg: rule.msg })
  }
}

for (const dir of SCAN_DIRS) {
  let files = []
  try { files = walk(join(ROOT, dir)) } catch { continue }
  for (const full of files) {
    const file = relative(ROOT, full).split(sep).join("/")
    if (file.endsWith(".css")) {
      if (!ALLOWED_CSS.has(file)) hits.push({ file, line: 1, rule: "extra-css", match: file, msg: "only app/globals.css may exist" })
      continue
    }
    if (!CODE_EXT.test(file) || file.endsWith(".test.ts")) continue
    const text = readFileSync(full, "utf8")
    for (const rule of CODE_RULES) record(file, text, rule)
    recordStatusText(file, text)
    recordAccent(file, text)
    if (!HEX_ALLOWED.has(file)) record(file, text, HEX_RULE)
    if (!CSS_IMPORT_ALLOWED.has(file)) record(file, text, CSS_IMPORT_RULE)
  }
}

const css = readFileSync(join(ROOT, "app/globals.css"), "utf8")
const withoutTheme = css.replace(/@theme[^{]*\{[\s\S]*?\n\}/g, (block) => block.replace(/[^\n]/g, " "))
for (const m of withoutTheme.matchAll(/font-family\s*:\s*([^;]+);/g)) {
  const value = m[1].trim()
  if (/^(?:var\(--font-[\w-]+\)|inherit|initial|unset)(?:\s*!important)?$/.test(value)) continue
  hits.push({ file: "app/globals.css", line: lineOf(css, m.index), rule: "font-family", match: value, msg: "font-family outside @theme must be var(--font-*)" })
}

const cssStatusText = new RegExp(`(?<![\\w-])color\\s*:\\s*var\\(--(?:${STATUS})\\)`, "g")
for (const m of withoutTheme.matchAll(cssStatusText)) {
  hits.push({ file: "app/globals.css", line: lineOf(css, m.index), rule: "status-text", match: m[0], msg: "status fill colour used as text; use var(--{status}-muted-foreground)" })
}

// Real property declarations (not token definitions) using var(--accent) must sit in a :hover/:focus rule.
for (const m of withoutTheme.matchAll(/(?<![\w-])([a-z][a-z-]*)\s*:\s*[^;{}]*var\(--accent\)/g)) {
  const open = withoutTheme.lastIndexOf("{", m.index)
  const start = Math.max(withoutTheme.lastIndexOf("}", open), withoutTheme.lastIndexOf("{", open - 1), withoutTheme.lastIndexOf(";", open)) + 1
  const selector = withoutTheme.slice(start, open).trim()
  if (/:(?:hover|focus|focus-visible|focus-within)\b/.test(selector)) continue
  hits.push({ file: "app/globals.css", line: lineOf(css, m.index), rule: "accent-non-hover", match: `${selector} { ${m[1]}: …var(--accent) }`, msg: ACCENT_MSG })
}

if (hits.length) {
  for (const h of hits) console.error(`${h.file}:${h.line}  [${h.rule}]  ${h.match}  — ${h.msg}`)
  console.error(`\nDesign guardrail: ${hits.length} violation(s).`)
  process.exit(1)
}
console.log("Design guardrail: 0 violations.")
