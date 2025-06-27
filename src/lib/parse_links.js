import { LinkPreview } from "@/components/ui/link-preview";

export function parseText(text) {
  const regex = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const matchIndex = match.index;
    if (matchIndex > lastIndex) {
      parts.push(text.substring(lastIndex, matchIndex));
    }
    const linkText = match[1];
    const url = match[2];
    parts.push(
      <LinkPreview
        className="text-white hover:text-violet-400 transition-colors"
        key={url + matchIndex}
        url={url}
        newTab
      >
        {linkText}
      </LinkPreview>,
    );
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}
