import React from "react";
import toast from "react-hot-toast";

const AddressInput = ({ userInfo, setUserInfo }) => {
  const handleChange = (e) => {
    setUserInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProfileUpdate = async () => {
    const updatePromise = fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userInfo }),
    }).then((response) => {
      if (!response.ok) throw new Error("Profile update failed");
    });

    await toast.promise(updatePromise, {
      loading: "Saving...",
      success: "Profile updated successfully!",
      error: "Failed to update profile.",
    });
  };

  return (
    <div className="space-y-3">
      <label>Phone No.</label>
      <input
        type="tel"
        name="phone"
        value={userInfo.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label>Street Address</label>
      <input
        type="text"
        name="streetAddress"
        value={userInfo.streetAddress}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={userInfo.zipCode}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            name="city"
            value={userInfo.city}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <label>Country</label>
      <input
        type="text"
        name="country"
        value={userInfo.country}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="button"
        onClick={handleProfileUpdate}
        className="w-full bg-primary text-white p-2 rounded-lg"
      >
        Save Info
      </button>
    </div>
  );
};

export default AddressInput;
