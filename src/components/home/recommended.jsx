import React from "react";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useQuery } from "@tanstack/react-query";

export default function Recommended() {
  const { isLoading, data: products } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      fetch(`https://ecomm12.herokuapp.com/products?page=${1}`).then((res) =>
        res.json()
      ),
  });

  return isLoading ? (
    <div>
      <CircularProgress color="inherit" />
    </div>
  ) : (
    <div className="flex flex-col gap-4 shadow p-4">
      <p className="text-lg font-bold">Recommended for you</p>
      <div className="grid grid-cols-4 ">
        {products.products.map((product) => (
          <Link
            className="flex flex-col px-6 py-5 bg-white lg:hover:shadow-2xl transition-all"
            to={`/products/${product._id}`}
          >
            <div className="mb-10 mx-auto">
              <div className="lg:h-[168px] lg:w-[168px] h-[120px] w-[120px]">
                {product.image ? (
                  <img
                    className="h-full w-full object-contain"
                    src={product.image}
                    alt={product.title}
                  />
                ) : (
                  <CircularProgress />
                )}
              </div>
            </div>
            <p className="flex mb-2 h-24 lg:h-16">{product.slug} </p>
            <div className="flex flex-row items-end">
              <p className="leading-4 text-xl font-semibold">
                {" "}
                {product.price}
              </p>
              <p className="text-xs ml-1 leading-3">EGP</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
