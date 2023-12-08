import { HiOutlineCreditCard } from "react-icons/hi";
import { TbTruckReturn } from "react-icons/tb";
import { AiOutlineQuestionCircle } from "react-icons/ai";

export default function UI() {
  return (
    <ul className="flex flex-col bg-white p-4 mb-4 shadow lg:mt-6">
      <li className="flex flex-row">
        <HiOutlineCreditCard className="mr-3" size={30} />
        <div className="flex flex-col w-full">
          <p className="text-sm font-semibold pb-2">Pay on delivery</p>
          <p className="text-sm font-normal pb-3">For all orders</p>
          <hr className="h-[1px] mb-3" />
        </div>
      </li>
      <li className="flex flex-row">
        <TbTruckReturn className="mr-3" size={30} />
        <div className="flex flex-col  w-full">
          <p className="text-sm font-semibold pb-2">Return policy</p>
          <p className="text-sm font-normal pb-3">
            Most items can be returned within 30 days of delivery
          </p>
          <hr className="h-[1px] mb-3" />
        </div>
      </li>
      <li className="flex flex-row">
        <AiOutlineQuestionCircle className="mr-3" size={30} />
        <div className="flex flex-col  w-full">
          <p className="text-sm font-semibold pb-2">Have a question?</p>
          <p className="text-sm font-normal pb-3">*****</p>
        </div>
      </li>
    </ul>
  );
}
