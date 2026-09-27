import { Calculator, TrendingUp, Layers } from "lucide-react"

const noiBridge = [
  { label: "Effective gross income", value: "$2.46M" },
  { label: "Operating expenses", value: "($0.98M)" },
  { label: "In-place NOI", value: "$1.48M", strong: true },
  { label: "Loss-to-lease + normalization", value: "+$0.14M" },
  { label: "Stabilized NOI", value: "$1.62M", strong: true },
]

const unitMix = [
  { type: "1BR / 1BA", units: 56, rent: "$1,285" },
  { type: "2BR / 2BA", units: 72, rent: "$1,640" },
  { type: "3BR / 2BA", units: 20, rent: "$2,010" },
]

const scenarios = [
  { cap: "5.75%", value: "$28.2M", delta: "+22%" },
  { cap: "6.25%", value: "$25.9M", delta: "Base", base: true },
  { cap: "6.75%", value: "$24.0M", delta: "-7%" },
  { cap: "7.25%", value: "$22.3M", delta: "-14%" },
]

const card = "min-w-0 rounded border border-border bg-card text-card-foreground card-pad"
const panel = "rounded border border-border bg-muted p-4"
const label = "text-2xs font-semibold uppercase tracking-wider text-muted-foreground"

function CardHeader({ icon: Icon, title }: { icon: typeof Calculator; title: string }) {
  return (
    <div className="mb-2 flex items-center gap-3">
      <div className="flex size-10 items-center justify-center rounded bg-accent">
        <Icon className="size-5 text-accent-foreground" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
    </div>
  )
}

export function FeatureShowcase() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <article data-slot="card" className={`${card} reveal-in-view`}>
        <CardHeader icon={Calculator} title="Underwriting Summary" />
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          Go from raw documents to a clean NOI bridge and unit mix — separating the in-place deal from the
          stabilized business plan, with every line auditable to its source.
        </p>

        <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
          <div className={panel}>
            <p className={`${label} mb-3`}>NOI Bridge</p>
            <div className="flex flex-col gap-2">
              {noiBridge.map((l) => (
                <div
                  key={l.label}
                  className={`flex items-center justify-between gap-2 ${l.strong ? "border-t border-border pt-2" : ""}`}
                >
                  <span className={`text-caption ${l.strong ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                    {l.label}
                  </span>
                  <span
                    className={`whitespace-nowrap text-caption font-bold ${l.strong ? "text-foreground tabular-nums" : "text-foreground tabular-nums"}`}
                  >
                    {l.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={panel}>
            <div className="mb-3 flex items-center gap-1.5">
              <Layers className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <p className={label}>Unit Mix</p>
            </div>
            <table className="w-full">
              <tbody>
                {unitMix.map((u) => (
                  <tr key={u.type} className="border-b border-border last:border-0">
                    <td className="py-1.5 text-caption font-medium text-foreground">{u.type}</td>
                    <td className="py-1.5 text-right text-caption text-muted-foreground">{u.units}</td>
                    <td className="py-1.5 text-right text-caption font-bold text-foreground">{u.rent}</td>
                  </tr>
                ))}
                <tr className="border-t border-border">
                  <td className="py-1.5 text-caption font-semibold text-foreground">148 units</td>
                  <td className="py-1.5" />
                  <td className="py-1.5 text-right text-caption font-bold tabular-nums text-foreground">$1,548</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>

      <article data-slot="card" className={`${card} reveal-in-view reveal-delay`}>
        <CardHeader icon={TrendingUp} title="Valuation Scenarios" />
        <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
          Pressure-test value across a range of exit cap rates instead of betting on a single number — so you
          underwrite to a defensible range and know your downside before you bid.
        </p>

        <div className="overflow-hidden rounded border border-border" aria-hidden="true">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-muted">
                <th className={`${label} px-4 py-2`}>Exit Cap Rate</th>
                <th className={`${label} px-4 py-2 text-right`}>Value</th>
                <th className={`${label} px-4 py-2 text-right`}>Δ vs Base</th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map((s) => (
                <tr key={s.cap} className={`border-t border-border ${s.base ? "bg-accent" : ""}`}>
                  <td className="px-4 py-2.5 text-xs font-medium text-foreground">
                    {s.cap}
                    {s.base && <span className="ml-1.5 text-3xs font-semibold uppercase text-brand-text">Base</span>}
                  </td>
                  <td className="px-4 py-2.5 text-right text-xs font-bold text-foreground">{s.value}</td>
                  <td className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground">{s.delta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-caption text-muted-foreground">
          Applied to stabilized NOI of $1.62M (direct capitalization).
        </p>
      </article>
    </div>
  )
}
