import { useNavigate } from "react-router-dom";
import { CartItemsStore, userInfoStore } from "../suztand/Store";
import CartItem from "../components/cart/cart_item";
import DesktopCheckout from "../components/cart/desktop_checkout";
import MobileCheckout from "../components/cart/mobile_checkout";
import EmptyCart from "../components/cart/empty_cart";
import UI from "../components/cart/ui";

function CartItemsCounter({ totalQuantity }) {
  return (
    <p className="flex flex-row py-5 px-4 border-b">
      Cart
      <span className="ml-2 flex text-sm rounded-full items-center py-1 px-3 bg-slate-100">
        {totalQuantity}
      </span>
    </p>
  );
}

function Cart() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateItemQuantity,
    getTotalItemsQuantity,
  } = CartItemsStore();

  const { userInfo } = userInfoStore();
  const totalQuantity = getTotalItemsQuantity();

  const removeItemHandler = (item) => {
    removeFromCart(item);
  };

  const checkoutHandler = () => {
    userInfo ? navigate("/checkout") : navigate("/login?redirect=/checkout");
  };

  return (
    <div className="flex flex-col min-h-screen lg:w-max-[1184px] lg:w-[1184px] bg-[#f4f5f6] lg:bg-white lg:m-auto pt-[60px] lg:py-4">
      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="bg-white mb-4 shadow lg:w-[70%] lg:h-fit">
            <CartItemsCounter totalQuantity={totalQuantity} />
            <div className="flex flex-col lg:text-xl items-center">
              {cartItems.map((item) => (
                <CartItem
                  item={item}
                  removeItemHandler={removeItemHandler}
                  updateItemQuantity={updateItemQuantity}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col lg:w-[30%] lg:ml-6">
            <DesktopCheckout
              cartItems={cartItems}
              checkoutHandler={checkoutHandler}
            />
            <MobileCheckout
              cartItems={cartItems}
              checkoutHandler={checkoutHandler}
            />
            <UI />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
