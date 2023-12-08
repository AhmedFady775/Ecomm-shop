import React from "react";
import { updateWidthState } from "../../suztand/Store";
import { userInfoStore } from "../../suztand/Store";

function Dashboard() {
  const userInfo = userInfoStore((state) => state.userInfo);
  const noFullWidth = updateWidthState((state) => state.width);

  return (
    <main
      className={`flex flex-col bg-[#f7f6f6] ${
        noFullWidth ? "w-[calc(100%-112px)]" : "w-[calc(100%-288px)]"
      }`}
    >
      <section className="flex flex-col bg-white px-[36px] py-[26px] font-bold text-4xl gap-2">
        Dashboard
        <span className="font-medium text-lg">
          Welcome, {userInfo.firstName}.
        </span>
      </section>
    </main>
  );
}

export default Dashboard;
