import React from "react";

export default function Home() {
  const banners = [
    {
      image: "/assets/banner1.jpg",
      tagline: "Find Your Furry Friend Today!",
    },
    {
      image: "/assets/banner2.jpg",
      tagline: "Adopt, Don’t Shop — Give a Pet a Home.",
    },
    {
      image: "/assets/banner3.jpg",
      tagline: "Because Every Pet Deserves Love and Care.",
    },
  ];

  return (
    <div className="space-y-16">

      {/* Carousel */}
      <div className="carousel w-full rounded-lg overflow-hidden">
        {banners.map((banner, idx) => (
          <div
            key={idx}
            id={`slide${idx}`}
            className="carousel-item relative w-full h-[400px] lg:h-[500px]"
          >
            <img
              src={banner.image}
              alt={`banner-${idx}`}
              className="w-full h-full object-cover"
            />

            {/* Overlay + Text */}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h2 className="text-3xl lg:text-5xl text-white font-bold text-center px-4">
                {banner.tagline}
              </h2>
            </div>

            {/* Navigation */}
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${idx === 0 ? banners.length - 1 : idx - 1}`}
                className="btn btn-circle btn-sm bg-white/50 text-orange-600 hover:bg-white"
              >
                ❮
              </a>
              <a
                href={`#slide${(idx + 1) % banners.length}`}
                className="btn btn-circle btn-sm bg-white/50 text-orange-600 hover:bg-white"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
