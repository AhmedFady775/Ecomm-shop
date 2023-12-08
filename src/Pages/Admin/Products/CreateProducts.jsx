import React from "react";
import { updateWidthState, userInfoStore } from "../../../suztand/Store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useReducer } from "react";
import { toast } from "react-toastify";

const reducer = (state, action) => {
  switch (action.type) {
    case "SUBMIT_REQUEST":
      return { ...state, loadingSubmit: true };
    case "SUBMIT_SUCCESS":
      return { ...state, loadingSubmit: false };
    case "SUBMIT_FAIL":
      return { ...state, loadingSubmit: false };
    case "UPLOAD_REQUEST":
      return { ...state, loadingUpload: true, errorUpload: "" };
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        loadingUpload: false,
        errorUpload: "",
      };
    case "UPLOAD_FAIL":
      return { ...state, loadingUpload: false, errorUpload: action.payload };
    default:
      return state;
  }
};

function CreateProducts() {
  const noFullWidth = updateWidthState((state) => state.width);
  const userInfo = userInfoStore((state) => state.userInfo);

  const [category, setCategory] = React.useState(" ");
  const [BrandName, setBrandName] = React.useState("");
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [countInStock, setCountInStock] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [images, setImages] = React.useState([]);

  // const [{ loadingUpload }, dispatch] = useReducer(reducer, {
  //   loading: true,
  //   error: "",
  // });

  console.log(image);
  const { data: Categories } = useQuery({
    queryKey: ["Categories"],
    queryFn: () =>
      axios
        .get("https://ecomm12.herokuapp.com/categories/")
        .then((res) => res.data),
  });

  async function fetchCategory() {
    const { data } = await axios.get(
      `https://ecomm12.herokuapp.com/categories/name/${category}`
    );
    return data;
  }

  const { data: categoryfinal } = useQuery({
    queryKey: ["repoData", { category }],
    queryFn: fetchCategory,
    refetchInterval: 10000,
  });

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    try {
      // dispatch({ type: "CREATE_REQUEST" });
      await axios.post(
        "https://ecomm12.herokuapp.com/products/create",
        {
          name,
          slug,
          brand: BrandName,
          category: categoryfinal.name,
          price,
          countInStock,
          description,
          image,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // dispatch({ type: "CREATE_SUCCESS" });
      toast.success("your order successfully been placed.");
    } catch (err) {
      // dispatch({ type: "CREATE_FAIL" });
      console.log(err);
    }
  };

  const uploadFileHandler = async (e, forImages) => {
    const image = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", image);
    try {
      // dispatch({ type: "UPLOAD_REQUEST" });
      const { data } = await axios.post(
        "https://ecomm12.herokuapp.com/uploads",
        bodyFormData,
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // dispatch({ type: "UPLOAD_SUCCESS" });
      if (forImages) {
        setImages([...images, data.secure_url]);
      } else {
        setImage(data.secure_url);
      }
      toast.success("Image uploaded successfully.");
    } catch (err) {
      toast.error(err);
      // dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
    }
  };

  return (
    <main
      className={`flex flex-col bg-[#f7f6f6] ${
        noFullWidth ? "w-[calc(100%-112px)]" : "w-[calc(100%-288px)]"
      }`}
    >
      <section className="flex flex-col bg-white px-[36px] py-[26px] font-bold text-4xl gap-2">
        Create Products
      </section>
      <section className="flex flex-col bg-white mx-[36px] my-[26px] p-[36px] font-bold h-full rounded-lg">
        <form onSubmit={placeOrderHandler} className="flex flex-row gap-8">
          <div className="flex flex-col w-[40%]">
            <p className="text-2xl font-semibold">Product Preview</p>
            <p className="text-lg font-semibold py-3">
              Name: <span className="font-medium ml-2">{name}</span>
            </p>
            <p className="text-lg font-semibold py-3">
              Slug: <span className="font-medium ml-2">{slug}</span>
            </p>
            <p className="text-lg font-semibold py-3">
              Category:
              <span className="font-medium ml-2">{categoryfinal?.name}</span>
            </p>
            <p className="text-lg font-semibold py-3">
              Brand: <span className="font-medium ml-2">{BrandName}</span>
            </p>
            <p className="text-lg font-semibold py-3">
              Price: <span className="font-medium ml-2">{price}</span>
            </p>
            <p className="text-lg font-semibold py-3">
              Stock count:
              <span className="font-medium ml-2">{countInStock}</span>
            </p>
            <p className="flex flex-col text-lg font-semibold py-3">
              Description:
              <div className="font-medium flex flex-col">{description}</div>
            </p>
            <p className="text-lg font-semibold py-3">Image: </p>
          </div>
          <div className="flex flex-col w-[30%]">
            <div className="flex flex-col w-full mb-8">
              <label htmlFor="Name" className="mb-4">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                className="px-4 py-3 rounded"
                type="text"
              />
            </div>
            <div className="flex flex-col w-full mb-8">
              <label htmlFor="Slug" className="mb-4">
                Slug
              </label>
              <input
                onChange={(e) => setSlug(e.target.value)}
                className="px-4 py-3 rounded"
                type="text"
              />
            </div>
            <div className="flex flex-row w-full gap-4">
              <div className="flex flex-col w-1/2 mb-8">
                <label htmlFor="Category" className="mb-4">
                  Category
                </label>
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-3 rounded"
                  name="category"
                >
                  <option value="none" selected disabled>
                    None
                  </option>
                  {Categories?.categories.map((category) => (
                    <option key={category.name} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="Brand" className="mb-4">
                  Brand
                </label>

                <select
                  onChange={(e) => setBrandName(e.target.value)}
                  className="px-4 py-3 rounded"
                  name="category"
                >
                  {category ? (
                    categoryfinal?.brands?.map((brand) => (
                      <option key={brand.name} value={brand.name}>
                        {brand.name}
                      </option>
                    ))
                  ) : (
                    <option value="None">None</option>
                  )}
                </select>
              </div>
            </div>
            <div className="flex flex-col w-full mb-8">
              <label htmlFor="Price" className="mb-4">
                Price
              </label>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="px-4 py-3 rounded"
                type="number"
                min={0}
              />
            </div>
            <div className="flex flex-col w-full mb-8">
              <label htmlFor="Stock count" className="mb-4">
                Stock count
              </label>
              <input
                onChange={(e) => setCountInStock(e.target.value)}
                className="px-4 py-3 rounded"
                type="number"
                min={0}
                max={100}
              />
            </div>
          </div>
          <div className="flex w-[30%]">
            <div className="flex flex-col w-full mb-8">
              <label htmlFor="Name" className="mb-4">
                Description
              </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                className="px-4 py-3 rounded h-28 max-h-48 resize-none"
              />
              <button>Submit</button>
              <div className="flex flex-col w-full mb-8">
                <label htmlFor="Stock count" className="mb-4">
                  Image
                </label>
                <input
                  multiple
                  onChange={(e) => uploadFileHandler(e, false)}
                  className="px-4 py-3 rounded"
                  type="file"
                />
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateProducts;
