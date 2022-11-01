import logo from "../images/hourglass.svg";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen w-full bg-white overflow-auto ">
      <div className="flex flex-col items-center text-center gap-5 justify-start md:mt-36 p-2 mt-8 2xl:mt-40  ">
        <h1 className="text-9xl text-custom-green">404</h1>

        <h1 className="text-3xl font-bold">Page not found</h1>

        <Link
          to={"/login"}
          className=" mt-4 px-4 py-2 bg-black rounded-lg text-white lg:w-48  self-center text-base black-hover"
          href=""
        >
          Go Back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
