import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand.ts';

interface ImageLightboxModalProps {
  imageIndex: number | null;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  imageIndex,
  onClose,
  onSelectIndex,
}) => {
  if (imageIndex === null) return null;

  const current = BRAND_CONFIG.images[imageIndex];
  const total = BRAND_CONFIG.images.length;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((imageIndex - 1 + total) % total);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectIndex((imageIndex + 1) % total);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          aria-label="Close image zoom view"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Display */}
        <div className="relative rounded-2xl overflow-hidden bg-black/40 border border-white/10 max-h-[75vh]">
          <img
            src={current.url}
            alt={current.alt}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[75vh] object-contain"
          />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Caption */}
        <div className="mt-3 text-center text-white/90 text-sm">
          <p className="font-medium">{current.title}</p>
          <p className="text-xs text-white/60 mt-0.5">{current.alt}</p>
        </div>
      </div>
    </div>
  );
};
