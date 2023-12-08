import { BsPersonGear } from "react-icons/bs";
import { BsBoxSeam } from "react-icons/bs";
import { GoCreditCard } from "react-icons/go";
import { FiRefreshCw } from "react-icons/fi";

export const categoriesList = [
  {
    link: "/category/camera",
    name: "Cameras",
    image:
      "https://i1.adis.ws/i/canon/Dome-camera_960x1080-b06d4418-8d22-11eb-ad11-b083fe5731f9?w=720&qlt=90&fmt=jpg&fmt.options=interlaced&bg=rgb(255,255,255)",
  },
  {
    link: "/category/wire",
    name: "Wires",
    image:
      "https://5.imimg.com/data5/FC/BP/MY-18879959/flexible-wire-500x500.jpg",
  },
  {
    link: "/category/device",
    name: "Devices",
    image:
      "https://www.dseinternational.com/images/librariesprovider8/counter-surveillance-tscm-equipment/vosker.jpg",
  },
];

export const userList = [
  {
    link: "/customer/account",
    name: "Account",
    icon: <BsPersonGear size={25} />,
  },
  {
    link: "/customer/myorders",
    name: "Orders",
    icon: <BsBoxSeam size={22} />,
  },
  {
    link: "/customer/payments",
    name: "Payments",
    icon: <GoCreditCard size={22} />,
  },
  {
    link: "/customer/returns",
    name: "Returns",
    icon: <FiRefreshCw size={22} />,
  },
];
