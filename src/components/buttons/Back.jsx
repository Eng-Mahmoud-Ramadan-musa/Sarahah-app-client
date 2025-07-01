/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function BackButton({url}) {

  return (
    <Link to={url} className=" absolute top-2 left-4 text-2xl bg-white rounded-lg" >
      🔙
    </Link>
  );
}
