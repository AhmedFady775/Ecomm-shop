import { useState } from "react";
import ProductsCardFlex from "../components/Product/ProductCardFlex";
import ProductsCardGrid from "../components/Product/ProductCardGrid";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Skeleton from "@mui/material/Skeleton";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Drawer } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { CiSliderHorizontal } from "react-icons/ci";
import { BsSortAlphaDown } from "react-icons/bs";
import { RxDashboard } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";

const Shop = () => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [open1, setOpen1] = useState(false);
  const toggleDrawer1 = (newOpen) => () => {
    setOpen1(newOpen);
  };

  const [sortPrice, setSortPrice] = useState("");
  const [order, setOrder] = useState("featured");
  const [brand, setBrand] = useState("all");
  const [category, setCategory] = useState("all");

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  };

  async function fetchPosts() {
    const { data } = await axios.get(
      `https://ecomm12.herokuapp.com/products?page=${page}&category=${category}&order=${order}&brand=${brand}`
    );
    return data;
  }

  const { isLoading, data: products } = useQuery({
    queryKey: ["repoData", { page, sortPrice, brand, category, order }],
    queryFn: fetchPosts,
  });

  const { data: brands } = useQuery({
    queryKey: ["brands"],
    queryFn: () =>
      axios
        .get("https://ecomm12.herokuapp.com/products/brands")
        .then((res) => res.data),
  });

  const breadcrumbs = [
    <strong key="1" color="text.primary">
      Home
    </strong>,
  ];

  const [openbrand, setOpenbrand] = useState(true);
  const handleopenbrand = () => {
    setOpenbrand(!openbrand);
  };

  const [openPrice, setOpenPrice] = useState(true);
  const handlopenPrice = () => {
    setOpenPrice(!openPrice);
  };

  const [grid, setgrid] = useState(true);
  const handleGrid = () => {
    setgrid(!grid);
  };

  const SKELETON = (
    <div className="flex flex-col px-6 py-5 gap-2">
      <Skeleton height={150} variant="rectangle" />
      <Skeleton
        height={10}
        width={100}
        sx={{ borderRadius: "4px" }}
        variant="rectangle"
      />
      <Skeleton
        height={10}
        width={50}
        sx={{ borderRadius: "4px" }}
        variant="rectangle"
      />
    </div>
  );

  const CATEGORIES = () => (
    <FormGroup className="my-4">
      <p
        className="text-[#0066be] cursor-pointer font-medium"
        onClick={() => setBrand(" ")}
      >
        clear
      </p>
      <RadioGroup value={brand} onChange={handleBrandChange}>
        {brands?.map((brand) => (
          <FormControlLabel value={brand} control={<Radio />} label={brand} />
        ))}
      </RadioGroup>
    </FormGroup>
  );

  const PRICE = () => (
    <FormGroup className="my-4">
      <FormControlLabel control={<Checkbox />} label="Label" />
      <FormControlLabel control={<Checkbox />} label="Label" />
    </FormGroup>
  );

  const filterMenu = () => (
    <FormGroup onClick={toggleDrawer(false)} className="m-4">
      <p
        className="text-[#0066be] cursor-pointer font-medium"
        onClick={() => setBrand(" ")}
      >
        clear
      </p>
      <RadioGroup value={brand} onChange={handleBrandChange}>
        {brands?.map((brand) => (
          <FormControlLabel value={brand} control={<Radio />} label={brand} />
        ))}
      </RadioGroup>
    </FormGroup>
  );

  const sortMenu = () => (
    <p
      onClick={toggleDrawer(false)}
      className="flex flex-col py-[26px] px-[24px] border-b text-sm font-semibold leading-5 tracking-[0] border-gray-200 gap-4"
    >
      Sort by:
      <button
        className="border w-fit p-2 rounded-full "
        onClick={() => {
          setOrder("lowest");
          setPage(1);
        }}
      >
        Price: low to high
      </button>
      <button
        className="border w-fit p-2 rounded-full  "
        onClick={() => {
          setOrder("highest");
          setPage(1);
        }}
      >
        Price: high to low
      </button>
      <button
        className="border w-fit p-2 rounded-full "
        onClick={() => {
          setOrder("newest");
          setPage(1);
        }}
      >
        Latest realease
      </button>
    </p>
  );

  const filtermob = () => (
    <ul className="flex text-xs h-10 items-center font-semibold flex-row border-b border-gray-200">
      <li
        key={0}
        onClick={toggleDrawer1(true)}
        className="flex h-full justify-center items-center w-[40%] border-r border-gray-200"
      >
        <CiSliderHorizontal size={15} className="mr-2" /> Filter by
      </li>
      <Drawer open={open1} anchor="bottom" onClose={toggleDrawer1(false)}>
        {filterMenu()}
      </Drawer>
      <li
        key={1}
        onClick={toggleDrawer(true)}
        className="flex h-full justify-center items-center w-[40%] border-r border-gray-200"
      >
        <BsSortAlphaDown size={15} className="mr-2" />
        Sort
      </li>
      <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
        {sortMenu()}
      </Drawer>
      <li
        key={2}
        onClick={handleGrid}
        className="flex h-full justify-center items-center w-[20%]"
      >
        {grid ? <RxHamburgerMenu size={15} /> : <RxDashboard size={15} />}
      </li>
    </ul>
  );

  const filter = () => (
    <ul className="flex flex-col text-black mr-6">
      <li key={0} className="flex flex-col py-4 cursor-pointer">
        <div
          onClick={handleopenbrand}
          className="flex flex-row justify-between w-full text-base font-semibold leading-6 tracking-[0]"
        >
          Brand
          {openbrand ? (
            <RemoveIcon sx={{ fontSize: 20 }} />
          ) : (
            <AddIcon sx={{ fontSize: 20 }} />
          )}
        </div>

        {openbrand ? CATEGORIES() : null}
      </li>

      {/* <li className="flex flex-col py-4 cursor-pointer">
        <div
          onClick={handlopenPrice}
          className="flex flex-row justify-between w-full text-base font-semibold leading-6 tracking-[0]"
          key={1}
        >
          Price
          {openPrice ? (
            <RemoveIcon sx={{ fontSize: 20 }} />
          ) : (
            <AddIcon sx={{ fontSize: 20 }} />
          )}
        </div>
        {openPrice ? PRICE() : null}
      </li> */}
    </ul>
  );

  return (
    <div className="flex flex-col  lg:py-0 lg:px-0 lg:w-max-[1184px] lg:w-[1184px] lg:m-auto min-h-screen">
      <Breadcrumbs
        py={1}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        fontSize="small"
        className="p-2 lg:p-0 bg-gray-100 lg:bg-white"
      >
        {breadcrumbs}
      </Breadcrumbs>
      {/* <section className="border-b-2 border-gray-100 py-4">
          <button
            onClick={toggleDrawer(true)}
            className="flex flex-row px-4 py-2 text-white bg-teal-500 rounded"
          >
            Filters <TuneIcon className="ml-2" />
          </button>
          <Drawer open={open} anchor="bottom" onClose={toggleDrawer(false)}>
            {filter()}
          </Drawer>
        </section> */}
      <section className="flex flex-col lg:flex-row lg:px-0">
        <section className="hidden lg:flex flex-col lg:w-1/4">
          {filter()}
        </section>
        <div className="flex flex-col lg:w-3/4">
          <div className="flex flex-col shadow">
            <section className="flex flex-col  rounded">
              <div className="flex items-center py-[26px] px-[24px] border-b text-[1.15rem] font-semibold leading-6 tracking-[-1px] border-gray-200">
                All Products
                <span className="ml-2 flex text-sm rounded-full items-center py-1 px-3 bg-slate-100">
                  {products?.countProducts}
                </span>
              </div>
              <section className="lg:hidden flex flex-col">
                {filtermob()}
              </section>
              <p className="hidden lg:flex flex-row items-center py-[26px] px-[24px] border-b text-sm font-semibold leading-5 tracking-[0] border-gray-200">
                Sort by:
                <button
                  className="border mx-4 w-fit p-2 rounded-full hover:bg-[#f4f5f6] transition"
                  onClick={() => setOrder("lowest")}
                >
                  Price: low to high
                </button>
                <button
                  className="border w-fit p-2 rounded-full  hover:bg-[#f4f5f6] transition"
                  onClick={() => setOrder("highest")}
                >
                  Price: high to low
                </button>
                <button
                  className="border ml-4 w-fit p-2 rounded-full  hover:bg-[#f4f5f6] transition"
                  onClick={() => setOrder("newest")}
                >
                  Latest realease
                </button>
              </p>
            </section>
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                {Array.from({ length: 9 }, () => SKELETON)}
              </div>
            ) : grid ? (
              <>
                <section className="grid grid-cols-2 lg:grid-cols-3 bg-gray-200 gap-[1px]">
                  {products.products.map((data) => (
                    <ProductsCardGrid product={data} key={data.id} />
                  ))}
                </section>
              </>
            ) : (
              <>
                <section className="flex flex-col bg-gray-200 gap-[1px]">
                  {products.products.map((data) => (
                    <ProductsCardFlex product={data} key={data.id} />
                  ))}
                </section>
              </>
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
        </div>
      </section>
    </div>
  );
};

export default Shop;
