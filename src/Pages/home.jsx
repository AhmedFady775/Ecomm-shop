import React from "react";
import Slider from "../components/slider/Slider";
import Categories from "../components/home/categories";
import Brands from "../components/home/brands";
import Recommended from "../components/home/recommended";

export default function Home() {
  return (
    <div className="flex flex-col min-w-[1024px] max-w-[1184px] mx-auto my-4 ">
      <Slider />
      <Categories />
      <Recommended />
      <Brands />
    </div>
  );
}
