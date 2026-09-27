import type { ArticleBlock } from "@/lib/insights"
import { YouTubeEmbed } from "./youtube-embed"

/**
 * Renders an article's typed content blocks to semantic, accessible HTML.
 * The block union is exhaustive; figures and the hero enforce alt text at the
 * type level, so there is no path to an image without a description.
 */
export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="prose">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p>{block.text}</p>
    case "heading":
      return <h2>{block.text}</h2>
    case "subheading":
      return <h3>{block.text}</h3>
    case "list":
      return block.ordered ? (
        <ol>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      )
    case "callout":
      return (
        <div className="callout">
          {block.title ? <strong>{block.title}</strong> : null}
          <p>{block.text}</p>
        </div>
      )
    case "figure":
      return (
        <figure>
          {/* Alt text is required by the ArticleBlock type. */}
          <img src={block.src || "/placeholder.svg"} alt={block.alt} />
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      )
    case "video":
      return <YouTubeEmbed video={block.video} />
  }
}
