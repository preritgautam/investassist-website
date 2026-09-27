import type { ArticleVideo } from "@/lib/insights"

/**
 * Lazy YouTube embed using the privacy-enhanced nocookie domain. The video's
 * title is applied to the iframe for accessibility; VideoObject JSON-LD is
 * emitted separately by the article template from the same metadata.
 */
export function YouTubeEmbed({ video }: { video: ArticleVideo }) {
  return (
    <figure className="video-embed">
      <div className="frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
          title={video.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption>{video.title}</figcaption>
    </figure>
  )
}
