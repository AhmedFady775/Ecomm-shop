import React from "react";
import { Store } from "../../redux/Store";
import { useContext, useState, useReducer } from "react";
import CustomerNav from "./CustomerNav";
import { toast } from "react-toastify";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

function Account() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [firstName, setFirstName] = useState(userInfo.firstName);
  const [lastName, setLastName] = useState(userInfo.lastName);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");

  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });

  async function editData(e) {
    e.preventDefault();
    try {
      dispatch({
        type: "UPDATE_REQUEST",
      });
      const { data } = await axios.put(
        "https://ecomm12.herokuapp.com/users/edit",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: "UPDATE_SUCCESS",
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User updated successfully");
    } catch {
      dispatch({
        type: "UPDATE_FAIL",
      });
      toast.error("Error updating user");
    }
  }

  return (
    <div className="flex flex-col lg:flex-row lg:w-max-[1184px] lg:w-[1184px] lg:m-auto pt-[60px] lg:py-4 lg:px-0 bg-[#f4f5f6] lg:bg-white">
      <CustomerNav />
      <div className="flex flex-col lg:w-[70%] gap-4">
        <p className="text-[2.5rem] font-semibold leading-[3rem] tracking-[-2px] p-6 shadow lg:rounded bg-white h-fit">
          Good morning, {userInfo.firstName}.
        </p>

        {loadingUpdate ? (
          <div className="flex flex-col px-4 py-6 items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {" "}
            <div className="flex flex-col lg:rounded bg-white h-fit border">
              <div className="flex flex-col gap-4 p-6">
                <p className="text-lg font-semibold leading-6 tracking-[-.020625rem]">
                  Your first name
                </p>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="lg:w-[300px] pl-[10px] py-[4px] border rounded"
                />
              </div>
              <div className="flex flex-row items-center justify-end h-[57px] gap-4 px-[24px] py-[12px] border-t font-medium ">
                <button
                  onClick={editData}
                  className="flex items-center justify-center py-[6px] px-[12px] text-white bg-[#0e001a] rounded-lg w-[80px] h-[32px] border-2 border-[#0e001a] hover:bg-transparent hover:text-[#0e001a] transition"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:rounded bg-white h-fit border">
              <div className="flex flex-col gap-4 p-6">
                <p className="text-lg font-semibold leading-6 tracking-[-.020625rem]">
                  Your last name
                </p>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="lg:w-[300px] pl-[10px] py-[4px] border rounded"
                />
              </div>
              <div className="flex flex-row items-center justify-end h-[57px] gap-4 px-[24px] py-[12px] border-t font-medium ">
                <button className="flex items-center justify-center py-[6px] px-[12px] text-white bg-[#0e001a] rounded-lg w-[80px] h-[32px] border-2 border-[#0e001a] hover:bg-transparent hover:text-[#0e001a] transition">
                  Save
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:rounded bg-white h-fit border">
              <div className="flex flex-col gap-4 p-6">
                <p className="text-lg font-semibold leading-6 tracking-[-.020625rem]">
                  Your E-mail
                </p>
                <input
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="lg:w-[300px] pl-[10px] py-[4px] border rounded"
                />
              </div>
              <div className="flex flex-row items-center justify-end h-[57px] gap-4 px-[24px] py-[12px] border-t font-medium ">
                <button className="flex items-center justify-center py-[6px] px-[12px] text-white bg-[#0e001a] rounded-lg w-[80px] h-[32px] border-2 border-[#0e001a] hover:bg-transparent hover:text-[#0e001a] transition">
                  Save
                </button>
              </div>
            </div>
            <div className="flex flex-col lg:rounded bg-white h-fit border">
              <div className="flex flex-col gap-4 p-6">
                <p className="text-lg font-semibold leading-6 tracking-[-.020625rem]">
                  Your passowrd
                </p>
                <input
                  type="password"
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="lg:w-[300px] pl-[10px] py-[4px] border rounded"
                />
              </div>
              <div className="flex flex-row items-center justify-end h-[57px] gap-4 px-[24px] py-[12px] border-t font-medium ">
                <button className="flex items-center justify-center py-[6px] px-[12px] text-white bg-[#0e001a] rounded-lg w-[80px] h-[32px] border-2 border-[#0e001a] hover:bg-transparent hover:text-[#0e001a] transition">
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Account;
