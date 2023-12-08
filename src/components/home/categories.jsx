import React from "react";
import { categoriesList } from "../navbar/constants";
import { Link } from "react-router-dom";

export default function Categories() {
  return (
    <div className="flex items-center justify-center py-4 gap-4 shadow my-4">
      {categoriesList.map((category, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-4 p-4"
        >
          <Link to={category.link} className="flex items-center justify-center">
            <img
              className="h-24 w-24 rounded-full shadow"
              src={category.image}
              alt={category.name}
            />
          </Link>
          <p className="text-sm text-primary">{category.name}</p>
        </div>
      ))}
    </div>
  );
}
