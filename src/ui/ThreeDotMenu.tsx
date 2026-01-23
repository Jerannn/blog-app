import Tippy from "@tippyjs/react";
import { BsThreeDotsVertical } from "react-icons/bs";

type ThreeDotMenu = {
  onEditModalOpen: () => void;
  onDeleteModalOpen: () => void;
};

export default function ThreeDotMenu({
  onEditModalOpen,
  onDeleteModalOpen,
}: ThreeDotMenu) {
  return (
    <Tippy
      content={
        <div className="flex flex-col gap-2 bg-slate-200 rounded-lg p-2 text-slate-700 font-semibold">
          <button
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
            onClick={onEditModalOpen}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 hover:bg-gray-100 cursor-pointer rounded-sm"
            onClick={onDeleteModalOpen}
          >
            Delete
          </button>
        </div>
      }
      interactive={true}
      trigger="click"
      placement="bottom"
    >
      <button className="w-4 h-6 flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-full transition duration-200 ease-in-out">
        <BsThreeDotsVertical size={17} />
      </button>
    </Tippy>
  );
}
