'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { buildings } from '../data/properties';

export default function BuildingCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % buildings.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + buildings.length) % buildings.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % buildings.length);
  };

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden rounded-xl shadow-lg">
      {/* Carousel Images */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {buildings.map((building) => (
          <div key={building.id} className="min-w-full h-full relative">
            <Image
              src={building.image}
              alt={building.name}
              fill
              className="object-cover"
              priority={building.id === buildings[0].id}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#8B6914]/80 via-[#B8860B]/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg">{building.name}</h2>
              <p className="text-lg md:text-xl drop-shadow-md">{building.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-white p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#D4AF37]/90 hover:bg-[#D4AF37] text-white p-2 rounded-full shadow-lg transition-all z-10"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {buildings.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 md:h-3 rounded-full transition-all ${
              index === currentIndex ? 'w-8 md:w-10 bg-[#D4AF37]' : 'w-2 md:w-3 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
