import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Skeleton from "@mui/material/Skeleton";

import { BsShieldCheck } from "react-icons/bs";
import { TfiWallet } from "react-icons/tfi";
import { FiRefreshCw } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CartItemsStore } from "../../suztand/Store";

function ProductScreen() {
  const { id } = useParams();
  const { addToCart, cartItems } = CartItemsStore();

  const { isLoading, data } = useQuery({
    queryKey: ["repoData", { id }],
    queryFn: () =>
      axios
        .get(`https://ecomm12.herokuapp.com/products/${id}`)
        .then((res) => res.data),
  });

  const breadcrumbs = [
    <Link key="1" color="inherit" to="/">
      Home
    </Link>,
    <strong key="2" color="text.primary">
      Cameras
    </strong>,
  ];

  const ICONS = [
    {
      icon: <BsShieldCheck />,
      headline: "2-year warranty",
      text: "Full coverage",
    },
    { icon: <TfiWallet />, headline: "Cash on Delivery", text: "Cash or card" },
    {
      icon: <FiRefreshCw />,
      headline: "Return for free",
      text: "Up to 30 days",
    },
  ];

  return (
    <div className="flex flex-col lg:w-max-[1184px] lg:w-[1184px] lg:m-auto min-h-screen bg-[#f4f5f6] lg:bg-white">
      <Breadcrumbs
        py={1}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        fontSize="small"
        className="p-2 lg:p-0 "
      >
        {breadcrumbs}
      </Breadcrumbs>
      <div className="flex flex-col lg:flex-row bg-white mt-[72px] lg:shadow lg:rounded lg:mt-3 lg:p-4">
        {isLoading ? (
          <>
            <div className="flex flex-col lg:items-center lg:w-[50%]">
              <div className="flex lg:hidden flex-col p-4">
                <Skeleton animation="wave" />
              </div>
              <div className="px-4 lg:-0 flex lg:hidden">
                <Skeleton animation="wave" width={"358px"} height={"358px"} />
              </div>
              <div className="hidden lg:flex">
                <Skeleton animation="wave" width={"468px"} height={"468px"} />
              </div>
            </div>
            <div className="flex flex-col lg:w-[50%]">
              <div className="flex flex-col p-4">
                <Skeleton animation="wave" />
              </div>
              <p className=" text-[2rem] font-bold leading-10 tracking-[-2px] text-[#0e001a] p-4">
                <Skeleton animation="wave" />
              </p>
              <div className="flex text-[4rem] flex-col p-4">
                <Skeleton animation="wave" />
              </div>
              <div className="flex flex-col p-4">
                <Skeleton animation="wave" />
              </div>
              <div className="flex flex-col p-4">
                <Skeleton animation="wave" />
              </div>
            </div>{" "}
          </>
        ) : (
          <>
            <div className="flex flex-col lg:items-center lg:w-[50%]">
              <p className="flex lg:hidden text-lg font-normal leading-6 tracking-[-0.8px] p-4">
                {data.name}
              </p>
              <div className="flex flex-col">
                <div className="flex w-[358] h-[358] lg:w-[468px] lg:h-[468px] p-4 lg:p-0 ">
                  <img
                    className="flex w-full h-full object-contain"
                    src={data.image}
                    alt={data.id}
                  />
                </div>
                <div className="hidden lg:flex p-4">
                  {ICONS.map((icon, i) => (
                    <div
                      className={
                        ICONS.length - 1 === i
                          ? "flex flex-col items-center w-1/3 px-3"
                          : "flex flex-col items-center w-1/3 px-3 border-r"
                      }
                    >
                      <div className="text-2xl text-[#009f29] mb-2">
                        {icon.icon}
                      </div>
                      <p className=" text-sm font-normal leading-4 tracking-[0] text-center w-16 h-10">
                        {icon.headline}
                      </p>
                      <p className=" text-xs font-normal leading-4 tracking-[0] text-[#7f8286]">
                        {icon.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="lg:hidden text-[2rem] font-bold leading-10 tracking-[-2px] text-[#0e001a] p-4">
                {data.price}
                <span className="text-sm font-semibold leading-5 tracking-[0] text-[#0e001a] pl-1">
                  EGP
                </span>
              </p>
              <div className="flex lg:hidden p-4 lg:p-0">
                {ICONS.map((icon, i) => (
                  <div
                    className={
                      ICONS.length - 1 === i
                        ? "flex flex-col items-center w-1/3 px-3"
                        : "flex flex-col items-center w-1/3 px-3 border-r"
                    }
                  >
                    <div className="text-2xl text-[#009f29] mb-2">
                      {icon.icon}
                    </div>
                    <p className=" text-sm font-normal leading-4 tracking-[0] text-center w-16 h-10">
                      {icon.headline}
                    </p>
                    <p className=" text-xs font-normal leading-4 tracking-[0] text-[#7f8286]">
                      {icon.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:w-[50%]">
              <p className="hidden lg:flex text-lg font-normal leading-6 tracking-[-0.8px] px-4 py-1">
                {data.brand}
              </p>
              <p className="hidden lg:flex text-lg font-normal leading-6 tracking-[-0.8px] px-4 py-1">
                {data.name}
              </p>
              <p className="hidden lg:block text-[2rem] font-bold leading-10 tracking-[-2px] text-[#0e001a] p-4">
                {data.price}
                <span className="text-sm font-semibold leading-5 tracking-[0] text-[#0e001a] pl-1">
                  EGP
                </span>
              </p>
              <div className="flex flex-col p-4">
                {cartItems.some((item) => item.id === data.id) ? (
                  <button
                    className="rounded-lg w-full bg-gray-300 px-8 py-3 text-white transition cursor-not-allowed shadow-md"
                    disabled
                  >
                    Added to cart
                  </button>
                ) : (
                  <button
                    className="rounded-lg w-full bg-primary px-8 py-3 text-white transition lg:hover:bg-primary/80 shadow-md"
                    onClick={() => {
                      addToCart(data);
                      toast.success("Added to cart");
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </div>

              <p className="py-2 px-4 text-sm font-semibold leading-5 tracking-[0]">
                Delivery to: <span className="text-[#0066be]">Cairo.</span>
              </p>
              <p className="py-2 px-4 text-sm font-semibold leading-5 tracking-[0]">
                Sold by: <span className="text-[#0066be]">V2S.</span>
              </p>

              {/* <div className="hidden lg:flex flex-col p-4 my-2 cursor-pointer bg-white">
                <div className="flex flex-row justify-between w-full text-lg font-semibold leading-6 tracking-[-1px] items-center">
                  Product overview
                  {openCategory ? (
                    <RemoveIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <AddIcon sx={{ fontSize: 20 }} />
                  )}
                  <div>
                    <MdKeyboardArrowDown size={30} />
                  </div>
                </div>
                {openCategory ? CATEGORY() : null}
              </div> */}
            </div>
          </>
        )}
      </div>
      <div className="flex flex-col p-4 my-2 cursor-pointer bg-white">
        <div className="flex flex-row justify-between w-full text-lg font-semibold leading-6 tracking-[-1px] items-center">
          Product overview
          {/* {openCategory ? (
                    <RemoveIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <AddIcon sx={{ fontSize: 20 }} />
                  )} */}
          <div>
            <MdKeyboardArrowDown size={30} />
          </div>
        </div>
        {/* {openCategory ? CATEGORY() : null} */}
      </div>
    </div>
  );
}
export default ProductScreen;
