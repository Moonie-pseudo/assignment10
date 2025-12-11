import React, { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

export default function AddListing() {
  const { user } = useContext(AuthContext);

  const [listingData, setListingData] = useState({
    name: "",
    category: "Pets",
    price: 0,
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
    type: "pet", // we’ll derive type from category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If category changes, adjust type and price
    if (name === "category") {
      const typeMap = {
        Pets: "pet",
        "Pet Food": "food",
        Accessories: "accessory",
        "Pet Care Products": "care",
      };
      setListingData((prev) => ({
        ...prev,
        [name]: value,
        type: typeMap[value],
        price: value === "Pets" ? 0 : prev.price, // pets price = 0 by default
      }));
    } else {
      setListingData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(listingData),
      });

      if (!res.ok) throw new Error("Failed to add listing");

      toast.success("Listing added successfully!");
      // Optionally, reset form
      setListingData({
        name: "",
        category: "Pets",
        price: 0,
        location: "",
        description: "",
        image: "",
        date: "",
        email: user?.email || "",
        type: "pet",
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[80vh] px-5 py-8 bg-base-100 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Listing</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product/Pet Name"
          value={listingData.name}
          onChange={handleChange}
          className="input w-full input-bordered"
          required
        />

        <select
          name="category"
          value={listingData.category}
          onChange={handleChange}
          className="select w-full select-bordered"
        >
          <option>Pets</option>
          <option>Pet Food</option>
          <option>Accessories</option>
          <option>Pet Care Products</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={listingData.price}
          onChange={handleChange}
          className="input w-full input-bordered"
          required
          disabled={listingData.category === "Pets"} // pets price fixed at 0
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={listingData.location}
          onChange={handleChange}
          className="input w-full input-bordered"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={listingData.description}
          onChange={handleChange}
          className="textarea w-full textarea-bordered"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={listingData.image}
          onChange={handleChange}
          className="input w-full input-bordered"
          required
        />

        <label for="Date">Pick up date:</label>
        <input
          type="date"
          name="date"
          value={listingData.date}
          onChange={handleChange}
          className="input w-full input-bordered"
          required
        />

        <input
          type="email"
          name="email"
          value={listingData.email}
          readOnly
          className="input w-full input-bordered "
        />

        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Listing
        </button>
      </form>
    </div>
  );
}
