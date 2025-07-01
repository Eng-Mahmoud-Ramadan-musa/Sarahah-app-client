/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {  MdAutoDelete, MdOutlineRestorePage  } from "react-icons/md";
import { deleteMessage } from "../../features/message";
import { RiDeleteBinLine } from "react-icons/ri";
export default function RemoveOrRestore({msg , index}) {
    const dispatch = useDispatch();
    const showData = useSelector((state) => state.message.showData);
    const token = useSelector((state) => state.auth.token);


    const archiveOrRestore = async () => {    
        try {
          
           await axios.patch(`${import.meta.env.VITE_BASE_URL}/message/archive-or-restore/${msg._id}`,{}, {
            headers: {
              authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
              "Content-Type": "application/json",
            },
        });
        dispatch(deleteMessage(index))
        } catch (error) {
          console.error(error.message);
        }
      };
      const deleteMessages = async () => {    
        try {
    
           await axios.delete(`${import.meta.env.VITE_BASE_URL}/message/${msg._id}`, {
            headers: {
              authorization: `${import.meta.env.VITE_BEARER_KEY} ${token}`,
              "Content-Type": "application/json",
            },
        });
        dispatch(deleteMessage(index))
        } catch (error) {
          console.error(error.message);
        }
      };


    return (
        <div >

 {
    showData === 'archive'
    
    ? <div className="h-full flex justify-center items-center text-2xl">
        <button onClick={archiveOrRestore} className=" hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"><MdOutlineRestorePage className=" bg-green-500 text-white  rounded-sm border-2 border-white" /></button>
        <button onClick={deleteMessages} className=" hover:scale-110 duration-200 hover:bg-slate-400 p-1 rounded-lg"><RiDeleteBinLine  className=" bg-red-500 text-white  rounded-sm border-2  border-white" /></button>
    </div>
    : <button onClick={archiveOrRestore} className=" hover:scale-110 duration-200 bg-red-500 text-white hover:bg-slate-400 p-1 rounded-lg"><MdAutoDelete  /></button>
    }

        </div>
    );
}
