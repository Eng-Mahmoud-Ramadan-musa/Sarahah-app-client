import { TbSend2 } from "react-icons/tb";
import {  useDispatch } from "react-redux";
import { toggleInputMessage } from "../../features/message";

export default function ShowInput() {
  const dispatch = useDispatch();

  return (
    <button 
      onClick={() => dispatch(toggleInputMessage())} 
      className="hover:scale-110 duration-200 hover:bg-slate-400 bg-slate-600 text-2xl p-1 rounded-lg"
    >
      <TbSend2 />
    </button>
  );
}