import { useEffect, useRef, useState } from 'react';

export default function useScroll(
  totalCount: number,
  pageSize: number,
  enablePagination = true,
) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const loadingRef = useRef(false);

  const hasMore = enablePagination && visibleCount < totalCount;

  useEffect(() => {
    function handleScroll() {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;

      setShowScrollTop(window.scrollY > 400);

      if (!enablePagination) return;

      if (scrollPosition < pageHeight - 700) {
        loadingRef.current = false;
      }

      if (
        hasMore &&
        !loadingRef.current &&
        scrollPosition >= pageHeight - 500
      ) {
        loadingRef.current = true;

        setVisibleCount((count) => Math.min(count + pageSize, totalCount));
      }
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enablePagination, hasMore, totalCount, pageSize]);

  function resetVisibleCount() {
    setVisibleCount(pageSize);
    loadingRef.current = false;
  }

  return {
    visibleCount,
    hasMore,
    showScrollTop,
    resetVisibleCount,
  };
}
