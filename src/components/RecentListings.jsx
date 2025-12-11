import React from "react";
import { useNavigate } from "react-router-dom";

export default function RecentListings({ listings }) {
  const navigate = useNavigate();

  // If no listings yet, show placeholders
  const placeholderListings = Array.from({ length: 6 }).map((_, idx) => ({
    _id: idx,
    name: "Sample Pet / Product",
    category: "Pets",
    price: 0,
    location: "Dhaka",
    image: "/assets/sample.jpg",
  }));

  const displayListings = listings?.length ? listings : placeholderListings;

  return (
    <section className="max-w-[1200px] mx-auto px-5 mt-16">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayListings.map((item) => (
          <div
            key={item._id}
            className="card shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transform transition"
            onClick={() => navigate(`/listing/${item._id}`)}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-orange-600 font-bold">
                {item.price > 0 ? `$${item.price}` : "Free for Adoption"}
              </p>
              <p className="text-gray-500 text-sm">{item.location}</p>
              <button
                className="mt-2 btn btn-sm btn-outline w-full"
                onClick={() => navigate(`/listing/${item._id}`)}
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
