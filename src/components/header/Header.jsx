import { Link } from "react-router-dom";
import { RiLogoutBoxRLine } from "react-icons/ri";
import InputSearch from "../search/InputSearch.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../features/auth.js";

export default function Header() {
   const dispatch= useDispatch();
   const user = useSelector((state) => state.auth.currentUser)
   const getFirstTwoInitials = useSelector((state) => state.auth.getFirstTwoInitials)

  return (
<nav className="w-full px-4 sm:px-6 lg:px-8 fixed top-0 left-0 py-2 bg-slate-800 flex justify-between items-center h-12 z-50">
  <span className="text-xl sm:text-2xl font-bold text-green-300">
    <Link to="/messages" className="hover:text-green-500 text-nowrap">
      Sarahah App
    </Link>
  </span>
  <span className="sm:w-1/2 lg:w-1/3">
      <InputSearch />
  </span>
  <span className="flex items-center gap-2 text-lg sm:text-2xl">

    <div className="btn btn-ghost btn-circle avatar">
      <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden">
      <Link to="/profile">
    {user?.image ? (
      <img
      src={user?.image.secure_url}
        alt={user?.userName}
        className="w-full h-full object-cover"
      />
    ) : (
      <h2 className="bg-white text-sm sm:text-lg w-full h-full flex justify-center items-center font-bold rounded-full">
        {user?.userName ? getFirstTwoInitials(user?.userName) : null}
      </h2>
    )}
</Link>

          </div>
          </div>
              <RiLogoutBoxRLine
              onClick={() => dispatch(logout())}
              className="text-white cursor-pointer hover:text-red-500"
            />
  </span>
</nav>
  )
}
