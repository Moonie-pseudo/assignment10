import React from "react";

export default function ExtraSections() {
  const heroes = [
    {
      name: "Sara Khan",
      role: "Pet Care Volunteer",
      image: "/assets/hero1.png",
    },
    {
      name: "Ali Rahman",
      role: "Adopter",
      image: "/assets/hero2.png",
    },
    {
      name: "Nadia Islam",
      role: "Foster Home",
      image: "/assets/hero3.png",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-5 space-y-16 mt-20">

      {/* Why Adopt Section */}
      <div className="bg-orange-100 rounded-lg p-10 flex flex-col lg:flex-row items-center gap-8">
        <img
          src="/assets/whyAdopt1.png"
          alt="Adopt Pets"
          className="w-full lg:w-1/2 h-64 object-cover rounded-lg"
        />
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-3xl text-black font-bold mb-4">Why Adopt from PawMart?</h2>
          <p className="text-gray-700">
            Adopting pets saves lives! Every pet deserves a loving home.
            By choosing adoption, you reduce overpopulation and give abandoned
            pets a second chance.
          </p>
        </div>
      </div>

      {/* Meet Our Pet Heroes */}
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Pet Heroes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {heroes.map((hero, idx) => (
            <div
              key={idx}
              className="card shadow-lg rounded-lg overflow-hidden text-center p-4"
            >
              <img
                src={hero.image}
                alt={hero.name}
                className="w-32 h-32 rounded-full mx-auto object-cover mb-4"
              />
              <h3 className="text-xl font-semibold">{hero.name}</h3>
              <p className="text-gray-500">{hero.role}</p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
