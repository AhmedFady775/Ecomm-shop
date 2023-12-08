import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { MdDone } from "react-icons/md";
import { Link } from "react-router-dom";
import { userInfoStore } from "../suztand/Store";

export default function OrderModal(props) {
  const navigate = useNavigate();
  const userInfo = userInfoStore((state) => state.userInfo);

  const [open, setOpen] = React.useState(props.open);
  const renderButton = props.render;

  const handleClose = props.closeFnc;
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
    <>
      {renderButton && (
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="bg-[#0e001a] hover:bg-[#0e001ac5] rounded text-white text-sm font-semibold py-2 px-3 transition"
        >
          Details
        </button>
      )}
      <Dialog
        open={open}
        maxWidth={"lg"}
        onClose={() => {
          handleClose(setOpen);
          navigate(props.nav);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="flex flex-col lg:w-max-[728px] lg:w-[728px] m-4">
          {}
        </div>
      </Dialog>
    </>
  );
}
