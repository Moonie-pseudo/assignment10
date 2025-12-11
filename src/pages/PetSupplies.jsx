import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

export default function PetSupplies() {
  const location = useLocation();

  // Home → category mapping
  const categoryMap = {
    Pets: "pet",
    "Pet Food": "food",
    Accessories: "accessory",
    "Pet Care Products": "care",
    All: "All",
  };

  const defaultType = categoryMap[location.state?.category] || "All";

  const [typeFilter, setTypeFilter] = useState(defaultType);
  const [searchTerm, setSearchTerm] = useState("");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterOptions = ["All", "pet", "food", "accessory", "care"];

  // Fetch listings from backend
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/pets");
        if (!res.ok) throw new Error("Failed to fetch listings");

        const data = await res.json();
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  // Filtering logic (type + name search)
  useEffect(() => {
    let results = listings;

    // Filter by type
    if (typeFilter !== "All") {
      results = results.filter((item) => item.type === typeFilter);
    }

    // Filter by search name
    if (searchTerm.trim() !== "") {
      results = results.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredListings(results);
  }, [typeFilter, searchTerm, listings]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-[80vh] px-5 py-8 bg-base-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Pets & Supplies</h2>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="flex justify-center gap-4 mb-6">
        {filterOptions.map((type) => (
          <button
            key={type}
            className={`btn btn-sm ${
              typeFilter === type ? "btn-primary" : "btn-outline"
            }`}
            onClick={() => setTypeFilter(type)}
          >
            {type === "pet"
              ? "Pets"
              : type === "food"
              ? "Food"
              : type === "accessory"
              ? "Accessories"
              : type === "care"
              ? "Care Products"
              : "All"}
          </button>
        ))}
      </div>

      {/* Listings Grid */}
      {filteredListings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing._id}
              className="bg-base-200 rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-1">{listing.name}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Category:</strong> {listing.category}
                </p>
                <p className="text-gray-600 mb-1">
                  <strong>Location:</strong> {listing.location}
                </p>
                <p className="text-gray-800 font-semibold mb-2">
                  <strong>Price:</strong> ${listing.price}
                </p>
                <Link
                  to={`/listing/${listing._id}`}
                  className="btn btn-sm btn-primary w-full"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
