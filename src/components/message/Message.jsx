/* eslint-disable react/prop-types */
import { FaUserSecret } from "react-icons/fa";
import { GrUserFemale } from "react-icons/gr";
import FormController from "../formController/FormController";
import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getFirstTwoInitials } from "../../utils/helpers";

export default function Message({ msg ,index}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const showData = useSelector((state) => state.message.showData);
  const user = useSelector((state) => state.auth.currentUser);

  const formattedDate = (date) => {
    return `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()} ${date.getHours()}:${date
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  } 

  const toggleContent = () => {
    setIsExpanded(!isExpanded);

  };
    return (
      <div className=" w-full flex items-center bg-gray-300  mb-4 rounded-lg shadow-md p-2">
        <div className="mr-4 mt-2 w-12">
        {
  (msg.hidden) && (user._id !== msg.sender._id ) &&( msg.sender.gender === "male") ? (
    <FaUserSecret className="text-5xl text-gray-600 bg-white p-1 rounded-full" />
  ) : (msg.hidden) && (user._id !== msg.sender._id ) &&( msg.sender.gender === "female") ? (
    <GrUserFemale className="text-5xl bg-gray-600 text-white p-1 rounded-full" />
  ) : (!msg.hidden) && (!msg.sender.image) ? (
    <h2 className="bg-white text-2xl p-1 sm:text-lg flex justify-center items-center font-bold rounded-full w-12 h-12">
      {getFirstTwoInitials(msg.sender.userName)}
    </h2>
    ) :(
    <img
    src={user.image.secure_url}
    alt={msg.sender.userName ? `User image ${msg.sender.userName}` : "User image"}
    className="w-12 h-12 rounded-full hover:scale-110 duration-200"
    />
  )
}

        </div>
        <div className=" w-5/6 flex flex-col justify-between items-start h-full">
          <div className="flex justify-between items-center w-full h-8">
            <h2 className="text-lg font-semibold hover:scale-110 duration-200 text-blue-600 text-nowrap overflow-hidden text-ellipsis">
              {
              (msg.hidden) && (user._id !== msg.sender._id ) ? "Unknown User" : msg.sender.userName}
            </h2>
            <FormController msg={msg} index={index} />
          </div>
          <div className="flex items-center justify-between pr-[5%]">
            <p className={`text-gray-800 leading-relaxed ${isExpanded ? "" : "line-clamp-1"}`}>
              {msg.content }
            </p>
            {msg.content.length > 60 && (
              <button
                onClick={toggleContent}
                className="ml-4 text-blue-500 font-bold text-2xl hover:bg-slate-400 hover:text-white hover:scale-110 hover:border-white border rounded-full border-black"
              >
                {isExpanded ? <MdExpandMore className="rotate-180" /> : <MdExpandMore />}
              </button>
            )}
          </div>
        {
            showData === 'archive'
            ? <h3 className="text-sm text-gray-500 mt-4">
                  <small className="text-sm font-bold">DeletedAt: </small>{formattedDate(new Date(msg.deletedAt))}
              </h3>
            : <h3 className="text-sm text-gray-500 mt-4">
                <small className="text-sm font-bold">CreatedAt: </small>{formattedDate(new Date(msg.createdAt))}
              </h3>
        }

        </div>
      </div>
    );
  }
  