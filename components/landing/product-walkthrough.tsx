/**
 * Product walkthrough — a single inline <video>.
 *
 * The committed local asset is authoritative. We intentionally do NOT read
 * NEXT_PUBLIC_LANDING_VIDEO_URL here so a stale/remote env value can never
 * override the in-repo walkthrough. Matches the inline <video> the live
 * landing (app/page.tsx) already renders.
 */
export function ProductWalkthrough() {
  return (
    <div className="max-w-5xl mx-auto">
      <video
        className="block w-full rounded-2xl shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
        controls
        playsInline
        preload="none"
        poster="/media/investassist-poster.jpg"
        aria-label="InvestAssist product overview"
      >
        <source src="/media/investassist-walkthrough.mp4" type="video/mp4" />
        Your browser does not support embedded video.{" "}
        <a href="/media/investassist-walkthrough.mp4">Open the product overview.</a>
      </video>
    </div>
  )
}
