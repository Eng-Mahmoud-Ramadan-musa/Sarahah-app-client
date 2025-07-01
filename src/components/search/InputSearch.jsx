import { useState } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { searchMessages } from '../../features/message.js';
import { searchUsers } from '../../features/auth.js';

export default function InputSearch() {
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const showData = useSelector((state) => state.message.showData);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value); // تحديث النص المدخل
    if (showData === "user") {
      dispatch(searchUsers({ title: value, search: value.length > 0, mangeState: "user" }));  // تحديث البحث
    } else {
    dispatch(searchMessages({ title: value, search: value.length > 0, mangeState: "search" })); // تحديث البحث
    }
  };

  return (
    <div className="relative px-2 w-full sm:w-3/4 text-center overflow-hidden">
      <input
        className="w-full rounded-lg px-3 py-px border border-gray-300 focus:outline-none focus:ring focus:ring-blue-200"
        value={query}
        onChange={handleInputChange}
        placeholder="Search tasks..."
      />
      <IoMdSearch className="absolute top-1 right-3 text-2xl text-gray-500" />
    </div>
  );
} 