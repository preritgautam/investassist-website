"use client"

import { useEffect, useRef } from "react"

/**
 * NeuralNetworkCanvas — "Document Constellation"
 *
 * A CRE/AI document-extraction motif for the homepage hero. "Document" glyph
 * nodes are scattered across the right side of the hero and linked to their
 * nearest neighbors by gently curved connection lines, forming a flowing mesh
 * (a constellation of deal documents). Bright data packets continuously travel
 * along the links between documents, evoking line items being extracted and
 * passed between files. There is NO central hub — the mesh is decentralized so
 * it never collides with the headline copy.
 *
 * The scene is confined to the right side via a horizontal fade mask, keeping
 * the headline copy on the far left clean.
 *
 * Respects prefers-reduced-motion by rendering a single static frame.
 *
 * `variant="light"` (default) draws white lines/nodes for use over a colorful
 * gradient. `variant="dark"` draws purple-tinted lines for light surfaces.
 */

type DocNode = {
  nx: number
  ny: number
  x: number
  y: number
  size: number
  twinkle: number
  driftPhase: number
  driftAmp: number
}

type Link = {
  a: number
  b: number
  // packets travelling along this link
  speed: number
  phase: number
  count: number
}

export function NeuralNetworkCanvas({
  className,
  variant = "light",
}: {
  className?: string
  variant?: "light" | "dark"
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const lineRGB = variant === "dark" ? "124, 58, 237" : "255, 255, 255"
    const nodeRGB = variant === "dark" ? "147, 51, 234" : "255, 255, 255"
    const packetRGB = variant === "dark" ? "219, 39, 119" : "255, 255, 255"

    let width = 0
    let height = 0
    let dpr = 1
    let raf = 0
    let t = 0
    const mouse = { x: -9999, y: -9999 }

    // Document glyph nodes scattered across the right side and right-half of the
    // left column. Kept clear of the far-left headline band by the fade mask.
    // First node relocated to middle-right to avoid "Pricing" header animation overlap.
    // Rest remain at original high positions for visual impact.
    const docDefs: Array<Pick<DocNode, "nx" | "ny" | "size">> = [
      { nx: 0.75, ny: 0.62, size: 16 },   // Moved down 20% to clear "Pricing" nav
      { nx: 0.62, ny: 0.08, size: 18 },
      { nx: 0.74, ny: 0.2, size: 15 },
      { nx: 0.87, ny: 0.12, size: 17 },
      { nx: 0.55, ny: 0.42, size: 15 },
      { nx: 0.68, ny: 0.5, size: 19 },
      { nx: 0.82, ny: 0.4, size: 16 },
      { nx: 0.93, ny: 0.52, size: 15 },
      { nx: 0.52, ny: 0.74, size: 17 },
      { nx: 0.64, ny: 0.88, size: 16 },
      { nx: 0.78, ny: 0.78, size: 18 },
      { nx: 0.9, ny: 0.86, size: 15 },
    ]

    let docs: DocNode[] = []
    let links: Link[] = []

    const buildNodes = () => {
      docs = docDefs.map((d) => ({
        ...d,
        x: 0,
        y: 0,
        twinkle: Math.random() * Math.PI * 2,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 4 + Math.random() * 5,
      }))

      // Connect each node to its 3-4 nearest neighbors (in normalized space) to
      // form a more densely interconnected mesh. This creates more curved links
      // throughout the network, especially visible for bottom and top-right nodes.
      // Dedupe pairs.
      const seen = new Set<string>()
      links = []
      docs.forEach((d, i) => {
        const dists = docs
          .map((o, j) => ({ j, dist: Math.hypot(o.nx - d.nx, o.ny - d.ny) }))
          .filter((o) => o.j !== i)
          .sort((p, q) => p.dist - q.dist)
        // Increase from 2 to 3 nearest neighbors for denser connectivity
        dists.slice(0, 3).forEach((n, k) => {
          const key = i < n.j ? `${i}-${n.j}` : `${n.j}-${i}`
          if (seen.has(key)) return
          seen.add(key)
          links.push({
            a: i,
            b: n.j,
            speed: 0.4 + Math.random() * 0.4,
            phase: Math.random(),
            count: 1 + (k % 2),
          })
        })
      })
    }

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      docs.forEach((d) => {
        d.x = d.nx * width
        d.y = d.ny * height
      })
    }

    // Animated position of a node (gentle drift)
    const nodePos = (d: DocNode) => ({
      x: d.x + Math.sin(t * 0.6 + d.driftPhase) * d.driftAmp,
      y: d.y + Math.cos(t * 0.5 + d.driftPhase) * d.driftAmp,
    })

    // Quadratic curve between two nodes, bowed perpendicular to the segment so
    // links read as flowing arcs rather than straight wires.
    const linkControl = (pa: { x: number; y: number }, pb: { x: number; y: number }) => {
      const mx = (pa.x + pb.x) / 2
      const my = (pa.y + pb.y) / 2
      const dx = pb.x - pa.x
      const dy = pb.y - pa.y
      const len = Math.hypot(dx, dy) || 1
      // perpendicular offset (consistent side via sign of dx)
      const off = Math.min(48, len * 0.18)
      return {
        x: mx + (-dy / len) * off,
        y: my + (dx / len) * off,
      }
    }

    const quad = (
      pa: { x: number; y: number },
      pc: { x: number; y: number },
      pb: { x: number; y: number },
      p: number,
    ) => {
      const m = 1 - p
      return {
        x: m * m * pa.x + 2 * m * p * pc.x + p * p * pb.x,
        y: m * m * pa.y + 2 * m * p * pc.y + p * p * pb.y,
      }
    }

    const drawLink = (link: Link, alpha: number) => {
      const pa = nodePos(docs[link.a])
      const pb = nodePos(docs[link.b])
      const pc = linkControl(pa, pb)
      ctx.beginPath()
      ctx.moveTo(pa.x, pa.y)
      ctx.quadraticCurveTo(pc.x, pc.y, pb.x, pb.y)
      ctx.strokeStyle = `rgba(${lineRGB}, ${alpha})`
      ctx.lineWidth = variant === "dark" ? 1 : 1.2
      ctx.stroke()
      return { pa, pb, pc }
    }

    const drawDocGlyph = (d: DocNode, glow: number) => {
      const p = nodePos(d)
      const s = d.size
      const x = p.x - s / 2
      const y = p.y - s * 0.62
      const w = s
      const h = s * 1.24
      const fold = s * 0.34

      ctx.save()
      ctx.shadowColor = `rgba(${nodeRGB}, ${0.5 + glow * 0.4})`
      ctx.shadowBlur = 10 + glow * 10

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + w - fold, y)
      ctx.lineTo(x + w, y + fold)
      ctx.lineTo(x + w, y + h)
      ctx.lineTo(x, y + h)
      ctx.closePath()
      ctx.fillStyle = `rgba(${nodeRGB}, ${variant === "dark" ? 0.1 : 0.16})`
      ctx.fill()
      ctx.strokeStyle = `rgba(${lineRGB}, ${0.55 + glow * 0.4})`
      ctx.lineWidth = 1.2
      ctx.stroke()
      ctx.shadowBlur = 0

      // dog-ear fold
      ctx.beginPath()
      ctx.moveTo(x + w - fold, y)
      ctx.lineTo(x + w - fold, y + fold)
      ctx.lineTo(x + w, y + fold)
      ctx.strokeStyle = `rgba(${lineRGB}, ${0.4 + glow * 0.3})`
      ctx.lineWidth = 1
      ctx.stroke()

      // text lines
      const lineCount = 3
      const pad = s * 0.22
      for (let i = 0; i < lineCount; i++) {
        const ly = y + fold + pad + i * (s * 0.26)
        ctx.beginPath()
        ctx.moveTo(x + pad, ly)
        ctx.lineTo(x + w - pad - (i === lineCount - 1 ? fold : 0), ly)
        ctx.strokeStyle = `rgba(${lineRGB}, ${0.35 + glow * 0.3})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      // 1) Curved links between neighboring documents
      const linkGeo = links.map((link, i) => {
        const base = variant === "dark" ? 0.16 : 0.3
        return { link, geo: drawLink(link, base + (i % 3) * 0.04) }
      })

      // 2) Travelling data packets along the links
      linkGeo.forEach(({ link, geo }) => {
        for (let k = 0; k < link.count; k++) {
          const p = (t * link.speed + link.phase + k / link.count) % 1
          const pt = quad(geo.pa, geo.pc, geo.pb, p)
          const fade = Math.sin(p * Math.PI)
          const r = 2.4 + fade * 1.4
          ctx.save()
          ctx.shadowColor = `rgba(${packetRGB}, 0.9)`
          ctx.shadowBlur = 12
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, r, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${packetRGB}, ${0.5 + fade * 0.5})`
          ctx.fill()
          ctx.restore()
        }
      })

      // 3) Document glyph nodes (twinkle + cursor highlight)
      docs.forEach((d) => {
        const p = nodePos(d)
        const mDist = Math.hypot(p.x - mouse.x, p.y - mouse.y)
        const near = mDist < 130 ? 1 - mDist / 130 : 0
        const glow = (Math.sin(t * 1.4 + d.twinkle) * 0.5 + 0.5) * 0.6 + near * 0.6
        drawDocGlyph(d, Math.min(1, glow))
      })
    }

    const tick = () => {
      t += 0.006
      draw()
      raf = requestAnimationFrame(tick)
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    buildNodes()
    resize()
    if (prefersReduced) {
      draw()
    } else {
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseout", onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseout", onLeave)
    }
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // Horizontal fade: the document mesh lives on the right; fade the left
      // portion so the headline/subheading copy stays clean.
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.5) 42%, #000 52%, #000 100%)",
        maskImage:
          "linear-gradient(to right, transparent 30%, rgba(0,0,0,0.5) 42%, #000 52%, #000 100%)",
      }}
      className={className}
    />
  )
}
