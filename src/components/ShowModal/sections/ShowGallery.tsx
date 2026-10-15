import { useState } from 'react';

import { useFetch } from '../../../hooks/useFetch';
import type { TVmazeImage } from '../../../types/api/tvmaze';

interface ShowGalleryProps {
  showId: number;
  showName: string;
  fallbackImage?: string | null;
}

export default function ShowGallery({
  showId,
  showName,
  fallbackImage,
}: ShowGalleryProps) {
  const [images] = useFetch<TVmazeImage[]>([
    `https://api.tvmaze.com/shows/${showId}/images`,
  ]);

  const [selectedImageId, setSelectedImageId] = useState<number | null>(null);

  const galleryImages = images
    .filter((image) => image.resolutions.original?.url)
    .slice(0, 10);

  const selectedImage =
    galleryImages.find((image) => image.id === selectedImageId) ??
    galleryImages.find((image) => image.main) ??
    galleryImages[0];

  const mainImage = selectedImage?.resolutions.original?.url ?? fallbackImage;

  return (
    <div className="show-modal__gallery">
      <div className="show-modal__main-image">
        {mainImage ? (
          <img src={mainImage} alt={`${showName} promotional image`} />
        ) : (
          <div className="show-modal__image-placeholder" role="status">
            <span>Image not found</span>
          </div>
        )}
      </div>

      {galleryImages.length > 1 && (
        <div className="show-modal__thumbnails">
          {galleryImages.map((image, index) => {
            const thumbnail =
              image.resolutions.medium?.url ?? image.resolutions.original?.url;

            if (!thumbnail) return null;

            const active = selectedImage?.id === image.id;

            return (
              <button
                className={`show-modal__thumbnail ${
                  active ? 'show-modal__thumbnail--active' : ''
                }`}
                key={image.id}
                type="button"
                onClick={() => setSelectedImageId(image.id)}
                aria-label={`Show image ${index + 1}`}
                aria-pressed={active}
              >
                <img src={thumbnail} alt="" loading="lazy" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
