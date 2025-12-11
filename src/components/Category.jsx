import React from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Pets", emoji: "🐶", bg: "bg-orange-200" },
    { name: "Pet Food", emoji: "🍖", bg: "bg-yellow-200" },
    { name: "Accessories", emoji: "🧸", bg: "bg-pink-200" },
    { name: "Pet Care Products", emoji: "💊", bg: "bg-green-200" },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-5">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={`card cursor-pointer hover:scale-105 transform transition ${cat.bg} text-center py-10 rounded-lg shadow-lg`}
            onClick={() => navigate("/supplies", { state: { category: cat.name } })}
          >
            <div className="text-5xl mb-4">{cat.emoji}</div>
            <h3 className="text-xl font-semibold">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}
