interface ShowFooterProps {
  url?: string | null;
}

export default function ShowFooter({ url }: ShowFooterProps) {
  return (
    <footer className="show-modal__footer">
      <span>Data provided by TVmaze</span>

      {url && (
        <a href={url} target="_blank" rel="noreferrer">
          View on TVmaze ↗
        </a>
      )}
    </footer>
  );
}
