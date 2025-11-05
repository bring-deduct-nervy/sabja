import { useState, useEffect, useCallback } from 'react';

interface LightboxProps {
  images: Array<{
    id: string;
    src: string;
    alt: string;
    title?: string;
  }>;
  initialIndex: number;
  onClose: () => void;
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    },
    [onClose, goToPrevious, goToNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [handleKeyDown]);

  const currentImage = images[currentIndex];

  return (
    <div
      className="lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close lightbox"
          title="Press ESC to close"
        >
          ✕
        </button>

        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="lightbox-image"
          loading="lazy"
        />

        {currentIndex > 0 && (
          <button
            className="lightbox-nav lightbox-prev"
            onClick={goToPrevious}
            aria-label="Previous image"
            title="Press LEFT ARROW to go to previous image"
          >
            ‹
          </button>
        )}

        {currentIndex < images.length - 1 && (
          <button
            className="lightbox-nav lightbox-next"
            onClick={goToNext}
            aria-label="Next image"
            title="Press RIGHT ARROW to go to next image"
          >
            ›
          </button>
        )}

        {currentImage.title && (
          <div className="text-white text-center mt-4">
            <p className="text-lg font-semibold">{currentImage.title}</p>
          </div>
        )}

        <div className="text-white text-center mt-4 text-sm">
          <p>
            Image {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}
