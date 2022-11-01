import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { userSchema } from "../components/Validation/ResetPsSchema";
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetPassword = () => {
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

  const params = useParams();

  const HandleForm = (data) => {
    console.log(data);

    if (!disabled) {
      setDisabled(true);
      setError();

      delete data["passwordConfirmation"];

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/auth/resetPassword/${params.id}`,
        method: "PUT",
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
          console.log(res);
          setDisabled(false);
          // setError(res.message);

          //redirecting
          navigate("/login");
        })

        // Catch errors if any
        .catch((err) => {
          setDisabled(false);
          setError(err.response.data.error);
          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Password Reset ",
        error: "An error has occurred",
      });
    }
  };

  return (
    <div className="h-screen w-full bg-white overflow-auto ">
      <div className="flex flex-col items-center text-center gap-5 justify-start md:mt-20 2xl:mt-72 p-8">
        <div>
          <h1 className="text-3xl font-bold">Reset Your Password</h1>
          <h3 className="text-base mt-2">Enter your new password</h3>
        </div>

        <form
          onSubmit={handleSubmit(HandleForm)}
          className="w-3/4  lg:w-1/5 flex flex-col justify-center gap-3"
        >
          <input
            className="border h-12 p-7 border-black bg-neutral-200 focus:bg-white rounded-2xl"
            type="password"
            placeholder="Enter Your New Password"
            {...register("password")}
          />

          <input
            className="border h-12 p-7 border-black bg-neutral-200 focus:bg-white rounded-2xl"
            type="password"
            placeholder="Confirm  Your New Password"
            {...register("passwordConfirmation")}
          />

          <div className="mt-3">
            <p className="text-red-700 text-center w-full">
              {errors.password?.message}
            </p>
            <p className="text-red-700 text-center w-full">
              {errors.passwordConfirmation?.message}
            </p>
            <p className="text-red-700 text-center w-full">{error}</p>
          </div>

          <button className="mt-4 px-6 py-4 bg-black rounded-lg text-white lg:w-2/5 self-center text-base black-hover">
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
