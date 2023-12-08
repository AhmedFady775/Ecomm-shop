import React from "react";
import { updateWidthState, userInfoStore } from "../../../suztand/Store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useReducer, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress, Pagination } from "@mui/material";

const FormInput = ({ label, type, value, onChange }) => {
  return (
    <div className="flex flex-col mb-4 w-full">
      <label className="mb-2 font-bold text-lg text-gray-700">{label}</label>
      <input
        className="border py-2 px-3 text-gray-700 rounded"
        type={type}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

function EditProducts() {
  const noFullWidth = updateWidthState((state) => state.width);
  const userInfo = userInfoStore((state) => state.userInfo);

  const [page, setPage] = useState(1);
  const handleChange = (_event, value) => {
    setPage(value);
  };
  const [order, setOrder] = useState("featured");
  const [brand, setBrand] = useState("all");

  async function fetchPosts() {
    const { data } = await axios.get(
      `https://ecomm12.herokuapp.com/products?page=${page}&category=all&order=${order}&brand=${brand}`
    );
    return data;
  }

  const { isLoading, data: products } = useQuery({
    queryKey: ["repoData", { page, brand, order }],
    queryFn: fetchPosts,
  });

  // const { data: Categories } = useQuery({
  //   queryKey: ["Categories"],
  //   queryFn: () =>
  //     axios
  //       .get("https://ecomm12.herokuapp.com/categories/")
  //       .then((res) => res.data),
  // });

  // async function fetchCategory() {
  //   const { data } = await axios.get(
  //     `https://ecomm12.herokuapp.com/categories/name/${category}`
  //   );
  //   return data;
  // }

  // const { data: categoryfinal } = useQuery({
  //   queryKey: ["repoData", { category }],
  //   queryFn: fetchCategory,
  //   refetchInterval: 10000,
  // });

  return (
    <main
      className={`flex flex-col bg-[#f7f6f6] ${
        noFullWidth ? "w-[calc(100%-112px)]" : "w-[calc(100%-288px)]"
      }`}
    >
      <section className="flex flex-col bg-white px-[36px] py-[26px] font-bold text-4xl gap-2">
        Edit Products
      </section>
      <section className="flex flex-col justify-between bg-white mx-[36px] my-[26px] p-[36px] font-bold h-full rounded-lg ">
        <div className="flex flex-col">
          <div className="flex mb-4 text-lg">Search Products:</div>
          <section className="flex flex-row gap-4">
            <FormInput label="search by name" type="text" />
            <FormInput label="search by category" type="text" />
            <FormInput label="search by brand" type="text" />
          </section>

          {isLoading ? (
            <div className="flex flex-col  py-10 items-center">
              <CircularProgress />
            </div>
          ) : (
            <section className="flex flex-col gap-4">
              <ul className="lg:flex flex-row justify-between px-6 border-y py-4 font-semibold leading-[1.8rem] items-center hidden">
                <li className="w-[20%]">Product ID</li>
                <li className="w-[10%]">Slug </li>
                <li className="w-[10%]">Price </li>
                <li className="w-[20%]">Image </li>
                <li className="w-[15%]">Count in stock </li>
                <li className="w-[15%]">Category </li>
                <li className="w-[10%]">Brand </li>
              </ul>
              {products?.products?.map((product) => (
                <div>{product.name}</div>
              ))}
            </section>
          )}
        </div>

        <section className="flex justify-center my-4">
          <Pagination
            shape="rounded"
            size="large"
            count={products?.pages}
            page={page}
            onChange={handleChange}
            onClick={() => window.scrollTo(0, 0)}
          />
        </section>
      </section>
    </main>
  );
}

export default EditProducts;
