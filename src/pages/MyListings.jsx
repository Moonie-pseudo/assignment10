import React, { useEffect, useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function MyListings() {
  const { user } = useContext(AuthContext);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Update Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Fetch user's listings
  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/pets");
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();
        const userListings = data.filter((item) => item.email === user?.email);
        setListings(userListings);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserListings();
  }, [user]);

  // Delete listing
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this listing?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/pets/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete listing");

      toast.success("Listing deleted!");
      setListings((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Open modal
  const openEditModal = (listing) => {
    setEditData(listing);
    setModalOpen(true);
  };

  // Handle input change
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  // Update listing
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Remove _id from body
      const { _id, ...dataToUpdate } = editData;

      const res = await fetch(`http://localhost:3000/pets/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToUpdate), // send only editable fields
      });

      if (!res.ok) throw new Error("Failed to update listing");

      toast.success("Listing updated!");
      setListings((prev) =>
        prev.map((item) => (item._id === _id ? editData : item))
      );
      setModalOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-[80vh] px-5 py-8 bg-base-100 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Listings</h2>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No listings found.</p>
      ) : (
        <table className="table w-full border">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>${item.price}</td>
                <td>{item.location}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openEditModal(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Edit Modal */}
      {editData && (
        <Modal
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}
          className="bg-gray-200 p-6 max-w-lg mx-auto mt-20 rounded-lg shadow-lg outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start"
        >
          <h2 className="text-2xl font-bold text-black mb-4">Edit Listing</h2>
          <form onSubmit={handleUpdate} className="space-y-3">
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleEditChange}
              className="input w-full input-bordered"
              required
            />
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleEditChange}
              className="input w-full input-bordered"
              required
              disabled={editData.category === "Pets"}
            />
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleEditChange}
              className="input w-full input-bordered"
              required
            />
            <textarea
              name="description"
              value={editData.description}
              onChange={handleEditChange}
              className="textarea w-full textarea-bordered"
              required
            />
            <input
              type="text"
              name="image"
              value={editData.image}
              onChange={handleEditChange}
              className="input w-full input-bordered"
              required
            />
            <div className="flex justify-end gap-2 mt-3">
              <button
                type="button"
                className="btn btn-outline border-gray-500 text-gray-400"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
