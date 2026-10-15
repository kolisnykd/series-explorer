import { ArrowUp } from 'lucide-react';
import './ScrollToTop.css';

interface ScrollToTopProps {
  visible: boolean;
}

export default function ScrollToTop({ visible }: ScrollToTopProps) {
  if (!visible) return null;

  return (
    <button
      type="button"
      className="scroll-to-top"
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }
      aria-label="Scroll to top"
      title="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
