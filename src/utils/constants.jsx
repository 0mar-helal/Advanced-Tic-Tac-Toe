import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineCircle } from "react-icons/md";

export const depth = {
  easy: 2,
  medium: 4,
  hard: 5,
};
export const players = {
  X: (
    <IoCloseSharp className="w-[130px] h-[130px] animate-[show_0.25s_forwards]" />
  ),
  O: (
    <MdOutlineCircle className="w-[100px] h-[100px] animate-[show_0.25s_forwards]" />
  ),
};

export const hoverPlayers = {
  X: <IoCloseSharp className="w-[130px] h-[130px] opacity-40" />,
  O: <MdOutlineCircle className="w-[100px] h-[100px] opacity-40" />,
};
