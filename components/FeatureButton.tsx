"use client";

import React, { useState } from "react";

export default function FeatureButton() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="relative">
      {/* Feature Button */}
      <button
        onClick={togglePopup}
        className="text-white bg-purple-700 rounded-xl shadow-lg px-4 py-2 cursor-pointer"
      >
        Features
      </button>

      {/* Popup */}
      {isPopupVisible && (
        <div className="absolute top-14 left-0 bg-white shadow-lg border rounded-lg p-4 w-64 z-20">
          {/* Close Button */}
          <button
            onClick={togglePopup}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
          {/* Popup Content */}
          <div className="text-gray-800">
            <h3 className="text-lg font-bold mb-2">Features</h3>
            <p>
              This is a placeholder for the features description. Add detailed
              information about the features here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
