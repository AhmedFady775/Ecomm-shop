import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { MdDone } from "react-icons/md";
import { Store } from "../redux/Store";
import { Link } from "react-router-dom";

export default function OrderModal(props) {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  const id = props.id;
  const { isLoading, data: order } = useQuery({
    queryKey: ["repoData", { id }],
    queryFn: () =>
      axios
        .get(`https://ecomm12.herokuapp.com/orders/${id}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => res.data),
  });

  return (
    <Dialog
      open={open}
      maxWidth={"lg"}
      onClose={() => {
        handleClose();
        navigate("/");
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div className="flex flex-col lg:w-max-[1100px] lg:w-[1100px] m-4 bg-[#f4f5f6] lg:bg-white">
        {isLoading ? (
          <div className="flex justify-center pt-36">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col p-4 lg:rounded shadow lg:w-[70%] h-fit lg:mr-4 bg-white">
              <p className="py-4 border-b">
                <strong className="text-lg">Order receipt</strong>
              </p>
              <strong className="text-lg py-4 border-b">ID: {props.id}</strong>

              <div className="flex flex-col w-full">
                <div className="placeOrderCont py-4 border-b">
                  <div className="placeOrderHeader">
                    <strong>Shipping</strong>
                  </div>
                  <div>
                    <strong>Name:</strong> {order.shippingAddress.fullName}.{" "}
                    <br />
                    <strong>Address: </strong> {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}.
                  </div>
                </div>

                <div className="placeOrderCont py-4 border-b">
                  <div className="placeOrderHeader">
                    <strong>Payment Method</strong>
                  </div>
                  <div>
                    <strong>Method:</strong> {order.paymentMethod}.
                  </div>
                </div>

                <div className="placeOrderCont py-4 border-b">
                  <div className="placeOrderHeader">
                    <strong>Items</strong>
                  </div>
                  <div className="placeOrderItems text-sm">
                    {order.orderItems.map((order) => (
                      <div className="wholeOrderItem" key={order.id}>
                        <div className="orderItemPart">
                          <Link
                            className="text-blue-400 underline"
                            to={`/${order._id}`}
                          >
                            <div className="p-2">
                              <img
                                className="w-16 h-12 object-cover"
                                src={order.image}
                                alt={order.name}
                              ></img>
                            </div>
                          </Link>
                        </div>
                        <div className="orderItemPart">
                          <Link
                            className="text-blue-400 underline"
                            to={`/${order._id}`}
                          >
                            {order.name}
                          </Link>
                        </div>
                        <div className="orderItemPart" key={order.id}>
                          <div className="orderItemQuan">
                            <span>{order.quantity}</span>
                          </div>
                        </div>
                        <div className="orderItemPart">{order.price} EGP</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="placeOrderCont py-4 border-b">
                  <div className="placeOrderHeader">
                    <strong>Order Summary</strong>
                  </div>
                  <div className="h3Padding">
                    <strong>Items price</strong>
                    <p>{order.itemsPrice.toFixed(2)} EGP</p>
                    <strong>Shipping</strong>
                    <p>{order.shippingPrice.toFixed(2)} EGP</p>
                    <strong>Tax</strong>
                    <p>{order.taxPrice.toFixed(2)} EGP</p>
                  </div>
                </div>
                <div></div>
                <div className="flex flex-col py-4">
                  <strong className="placeOrderHeader"> Order Total</strong>
                  <strong>{order.totalPrice.toFixed(2)} EGP</strong>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col p-4 rounded shadow lg:w-[30%] h-fit items-center text-center text-lg font-semibold">
              <span className="border-4 border-solid border-[#009f29] text-[#009f29] rounded-[50%] w-[56px] h-[56px] flex items-center justify-center mb-4 ">
                <MdDone size={40} />
              </span>
              <div>
                Thank You <br /> your order successfully
                <br />
                been placed.
              </div>
            </div>
          </div>
        )}
      </div>
    </Dialog>
  );
}
