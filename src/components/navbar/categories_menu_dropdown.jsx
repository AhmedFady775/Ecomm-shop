import React from "react";
import { Link } from "react-router-dom";
import { categoriesList } from "./constants";
import DropDownList from "../ui/DropDownList";

export default function CategoriesMenuDropdown({ categoriesMenu }) {
  return (
    <DropDownList open={categoriesMenu}>
      <ul className="flex flex-col">
        {categoriesList.map((category, i) => (
          <Link
            to={category.link}
            className={`hover:bg-[#f4f5f6] transition ${
              categoriesList.length - 1 === i ? "rounded-b-lg" : " "
            }`}
          >
            <li
              className={`flex items-center ${
                categoriesList.length - 1 === i ? "" : "border-b"
              } w-full p-3`}
            >
              <div className="flex w-8 h-8 mr-4">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                />
              </div>
              {category.name}
            </li>
          </Link>
        ))}
      </ul>
    </DropDownList>
  );
}
