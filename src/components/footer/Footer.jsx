import { Link } from "react-router-dom";
import {
  FaRegCopyright,
  FaFacebook,
  FaWhatsapp,
  FaTelegram,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full px-4 sm:px-[5%] py-3 bg-slate-500 text-white z-40">
      <h3 className="flex justify-center items-center text-sm sm:text-base">
        copyright
        <FaRegCopyright className="mx-1" />
        by <b className="text-green-500 text-base sm:text-lg ml-1">mahmoud ramadan</b>
      </h3>
      <div className="flex justify-center items-center gap-4 text-lg sm:text-xl mt-3 sm:mt-0">
        <Link
          to="https://www.facebook.com/profile.php?id=100007283614477"
          className="hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook />
        </Link>
        <Link
          to="https://wa.me/+201016625130"
          className="hover:text-green-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp />
        </Link>
        <Link
          to="https://t.me/MahmoudRamadan11"
          className="hover:text-blue-400"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTelegram />
        </Link>
        <Link
          to="https://www.linkedin.com/in/%D9%85%D8%AD%D9%85%D9%88%D8%AF-%D8%B1%D9%85%D8%B6%D8%A7%D9%86-177102312"
          className="hover:text-blue-700"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </Link>
      </div>
    </div>
  );
}
