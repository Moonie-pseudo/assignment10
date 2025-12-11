import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "react-modal";
import { AuthContext } from "../context/AuthContext";

Modal.setAppElement("#root"); // accessibility

export default function ListingDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    buyerName: user?.displayName || "",
    email: user?.email || "",
    productId: id,
    productName: "",
    quantity: 1,
    price: 0,
    address: "",
    date: "",
    phone: "",
    notes: "",
  });

  // Fetch listing
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:3000/pets/${id}`);
        if (!res.ok) throw new Error("Failed to fetch listing");
        const data = await res.json();
        setListing(data);
        setOrderData((prev) => ({
          ...prev,
          productName: data.name,
          price: data.price,
          quantity: data.type === "pet" ? 1 : prev.quantity,
        }));
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  // Handle input changes
  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit order
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!res.ok) throw new Error("Failed to submit order");
      toast.success("Order placed successfully!");
      setModalIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!listing) return <p className="text-center py-10">Listing not found</p>;

  return (
    <div className="min-h-[80vh] px-5 py-8 bg-base-100 max-w-4xl mx-auto">
      {/* Listing Details */}
      <h2 className="text-3xl font-bold mb-4">{listing.name}</h2>
      <img
        src={listing.image}
        alt={listing.name}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p><strong>Category:</strong> {listing.category}</p>
      <p><strong>Owner Email:</strong> {listing.ownerEmail || "Not Provided"}</p>
      <p><strong>Location:</strong> {listing.location}</p>
      <p><strong>Price:</strong> ${listing.price}</p>
      <p className="mt-2"><strong>Description:</strong> {listing.description}</p>

      <button
        className="btn btn-primary mt-6"
        onClick={() => setModalIsOpen(true)}
      >
        🛒 Adopt / Order Now
      </button>

      {/* Order Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg outline-none w-full max-w-lg max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
      >
        <h2 className="text-2xl text-black font-bold mb-4">Place Your Order</h2>
        <form onSubmit={handleSubmitOrder} className="space-y-3">
          <input
            type="text"
            name="buyerName"
            value={orderData.buyerName}
            readOnly
            className="input w-full input-bordered"
          />
          <input
            type="email"
            name="email"
            value={orderData.email}
            readOnly
            className="input w-full input-bordered"
          />
          <input
            type="text"
            name="productId"
            value={orderData.productId}
            readOnly
            className="input w-full input-bordered"
          />
          <input
            type="text"
            name="productName"
            value={orderData.productName}
            readOnly
            className="input w-full input-bordered"
          />
          <input
            type="number"
            name="quantity"
            value={orderData.quantity}
            readOnly={listing.type === "pet"}
            onChange={handleOrderChange}
            className="input w-full input-bordered"
          />
          <input
            type="number"
            name="price"
            value={orderData.price}
            readOnly
            className="input w-full input-bordered"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={orderData.address}
            onChange={handleOrderChange}
            className="input w-full input-bordered"
            required
          />
          <input
            type="date"
            name="date"
            value={orderData.date}
            onChange={handleOrderChange}
            className="input w-full input-bordered"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={orderData.phone}
            onChange={handleOrderChange}
            className="input w-full input-bordered"
            required
          />
          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={orderData.notes}
            onChange={handleOrderChange}
            className="textarea w-full textarea-bordered"
          />
          <div className="flex justify-end gap-2 mt-3">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit Order
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
