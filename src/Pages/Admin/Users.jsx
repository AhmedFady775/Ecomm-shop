import React from "react";
import { updateWidthState } from "../../suztand/Store";
import Modal from "../../components/ui/Modal";

function Users() {
  const noFullWidth = updateWidthState((state) => state.width);

  const [open, setopen] = React.useState(false);

  return (
    <main
      className={`flex flex-col bg-[#f7f6f6] ${
        noFullWidth ? "w-[calc(100%-112px)]" : "w-[calc(100%-288px)]"
      }`}
    >
      <section className="flex flex-col bg-white px-[36px] py-[26px] font-bold text-4xl gap-2">
        Users
      </section>
      <div>
        <button onClick={() => setopen(!open)}> open the modal</button>
        <Modal onClose={() => setopen(false)} open={open}>
          hello
        </Modal>
      </div>
    </main>
  );
}

export default Users;
