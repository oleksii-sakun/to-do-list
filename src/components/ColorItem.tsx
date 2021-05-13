import React from "react";

export const ColorItem: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: 20,
      height: 20,
      background: color,
      border: "0.5px solid #ddd",
    }}
  ></div>
);
