import logo from "../images/atompointLogo.png";
import { userSchema } from "../components/Validation/SignupSchema";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import FormImageField from "./../components/FormImageField";

const SignUp = () => {
  //For form
  const methods = useForm({
    resolver: yupResolver(userSchema),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // const history = useHistory();
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const errorDisplay = (error) => {
    if (error) {
      const answer = error.split(",").join("\n");
      return answer;
    }
  };

  const HandleForm = (data) => {
    // const file = data["file"];
    // data["file"] = file[0];
    console.log("data is ",data);

    if (!disabled) {
      setDisabled(true);
      setError();
      const promise = axios({
        url: `${process.env.REACT_APP_BASEURL}/api/v1/users`,
        method: "POST",
        headers: {
          // Add any auth token here
          "Content-Type": "application/json",
          // authorization: "your token comes here",
        },
       
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);
          // setError(res.message);
          navigate('/login')
          //redirecting
        })
        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setError(err.response.data.error);
          // toast.error(err.response.data.error);
          return Promise.reject();
        });
      toast.promise(promise, {
        loading: "Loading",
        success: "User Created",
        error: "An error has occurred",
      });
    }
  };

  return (
    <div className="h-screen w-full bg-white overflow-auto ">
      <div className="flex flex-col items-center text-center gap-5 justify-start md:mt-18 p-2 mt-8 2xl:mt-12 ">
        <img className="h-16 mb-4" src={logo} alt="" />

        <div>
          <h1 className="text-3xl font-bold">Sign Up</h1>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(HandleForm)}
            action=""
            className="w-3/4  lg:w-1/5 flex flex-col justify-center gap-3"
          >
            <h2 className="text-xl font-bold ">Create Account</h2>

            <div>
              <input
                className="border h-12 p-7  w-full border-black bg-neutral-200 focus:bg-white rounded-2xl"
                type="text"
                placeholder="username"
                {...register("username")}
              />
              <p className="text-left text-red-700 mt-2 w-full">
                {errors.name?.message}
              </p>
            </div>
            <div>
              <input
                className="border h-12 p-7  w-full border-black bg-neutral-200 focus:bg-white rounded-2xl"
                type="email"
                placeholder="Email"
                {...register("email")}
              />
              <p className="text-left text-red-700 mt-2 w-full">
                {errors.email?.message}
              </p>
            </div>

            <div>
              <input
                className="border h-12 p-7  w-full border-black bg-neutral-200 focus:bg-white rounded-2xl"
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p className="text-left text-red-700 mt-2 w-full">
                {errors.password?.message}
              </p>
            </div>


            {console.log(errors)}

            <button className=" px-4 py-2 bg-black rounded-lg text-white lg:w-2/5 self-center text-base black-hover">
              Sign Up
            </button>
          </form>
        </FormProvider>

        <div>
          <h3 className="text-base ">Already have an account yet?</h3>
          <Link
            to={"/login"}
            className=" underline text-base text-blue-500"
            href=""
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
