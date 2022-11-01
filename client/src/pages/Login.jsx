import logo from "../images/atompointLogo.png";
import { userSchema } from "../components/Validation/LoginSchema";
import { useForm } from "react-hook-form";
import axios from "axios";
import eye from "../images/eye.svg";
import eye_slash from "../images/eye-slash.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const HandleForm = (data) => {
    if (!disabled) {
      setDisabled(true);
      setError();
    if(localStorage.getItem("fcmToken") === null){
      // console.log("null fcmToken")
    } else {
      data.token= localStorage.getItem("fcmToken");
    }
      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/auth/login`,
        method: "POST",
        headers: {
          // Add any auth token here
          "Content-Type": "application/json",
          // authorization: "your token comes here",
        },

        // Attaching the form data
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log("api response",res);
          setDisabled(false);
          // setError(res.message);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.user.username)
          localStorage.setItem("id", res.data.user.id);
          // localStorage.setItem("adminProf", res.data.user._id);

          //redirecting
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
            navigate("/payment/my_payments");
          }
          else setError("Invalid Email or Password");
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setError(err.response.data.error);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Signed in ",
        error: "Unable to Sign in",
      });
    }
  };

  return (
    <div className="h-screen w-full bg-white overflow-auto">
      <div className=" flex flex-col items-center text-center gap-5 justify-start md:mt-18 p-2 mt-8 2xl:mt-12 ">
        <img className="h-16 mb-4" src={logo} alt="" />

        <div>
          <h1 className="text-3xl whitespace-nowrap font-bold">Sign In</h1>

        </div>

        <form
          onSubmit={handleSubmit(HandleForm)}
          className="w-3/4  lg:w-1/5 flex flex-col justify-center gap-3"
        >
          <div className="flex flex-col text-left gap-2">
            <input
              className="border h-12 p-7 border-black bg-neutral-200 focus:bg-white rounded-2xl"
              type="email"
              placeholder="Email"
              autoComplete="off"
              {...register("email")}
            />
            <p className="text-red-700">{errors.email?.message}</p>
          </div>
          <div className="flex flex-col text-left gap-2">
            <div className="relative">
              <img
                className="absolute h-6 w-6 cursor-pointer right-6 top-4"
                src={showPass ? eye_slash : eye}
                onClick={() => {
                  setShowPass((prevCheck) => !prevCheck);
                }}
                alt=""
              />
              <input
                className="border h-12 p-7 w-full border-black bg-neutral-200 focus:bg-white rounded-2xl"
                type={showPass ? "text" : "password"}
                autoComplete="off"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <p className="text-red-700">{errors.password?.message}</p>
          </div>

          <p className="text-center text-red-700 mt-2  mb-2 w-full">{error}</p>

          {/* <div className="error-hndl">
            <p className=" mt-4 error-msg">{errors.email?.message}</p>
            <p className=" mt-4 error-msg">{errors.password?.message}</p>
            <p className="error-msg">{error}</p>
          </div> */}
<button className="px-4 py-2 bg-black rounded-lg text-white lg:w-2/5 self-center text-base black-hover">
            Sign In
          </button>


        </form>

        <div>
          <h3 className="text-base ">Don't have an account yet?</h3>
          <Link
            to={"/signup"}
            className="text-blue-500 underline text-base"
            href=""
          >
            Sign Up
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Login;
