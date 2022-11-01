import { useState } from "react";
import { MdOutlineRestartAlt } from "react-icons/md";

import eye from "../images/eye.svg";
import eye_slash from "../images/eye-slash.svg";
import toast from "react-hot-toast";
import axios from "axios";
import ErrorDisplay from "./ErrorDisplay";

const ResetPsComponent = ({ id }) => {
  const [password, setPassword] = useState();
  const [editPassword, setEditPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const handlePsReset = () => {
    if (!disabled) {
      setDisabled(true);

      setError();

      let data = { password: password };
      console.log(data);

      const promise = axios({
        // Endpoint to send files
        url: `${process.env.REACT_APP_BASEURL}/api/v1/users/${id}`,
        method: "PUT",
        headers: {
          // Add any auth token here
          // "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

        // Attaching the form data
        data: data,
      })
        // Handle the response from backend here
        .then((res) => {
          console.log(res);
          setDisabled(false);
          setEditPassword(false);
        })

        // Catch errors if any
        .catch((err) => {
          setError(err.response.data.error);
          setDisabled(false);

          return Promise.reject();
        });

      toast.promise(promise, {
        loading: "Loading",
        success: "Password Updated",
        error: "An error has occurred",
      });
    }
  };

  const generateRandom = () => {
    var length = 8;
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    setPassword(result);
    // let r = (Math.random() + 1).toString(36).substring(12);
    // setPassword(r);
  };

  return (
    <>
      <input
        type="button"
        onClick={(e) => setEditPassword(true)}
        value="Change Password"
        className={
          editPassword
            ? "hidden"
            : "green p-3 md:w-2/4 rounded-lg text-white cursor-pointer"
        }
      />

      <div
        className={
          editPassword ? "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" : "hidden"
        }
      >
        <div className="relative">
          <img
            className="absolute h-5 w-5 hover:opacity-60 cursor-pointer right-4 top-3"
            src={showPass ? eye_slash : eye}
            onClick={() => {
              setShowPass((prevCheck) => !prevCheck);
            }}
            alt=""
          />
          <MdOutlineRestartAlt
            onClick={generateRandom}
            className="absolute h-5 w-5 text-gray-500 hover:opacity-60 cursor-pointer right-10 top-3"
          />
          <input
            name="password"
            value={password}
            disabled={!editPassword}
            type={showPass ? "text" : "password"}
            autoComplete="off"
            onChange={(event) => setPassword(event.target.value)}
            className=" !pr-20 input-form"
          />
        </div>
        <input
          type="button"
          onClick={handlePsReset}
          value="Confirm"
          className="green p-3 md:w-2/4 rounded-lg text-white cursor-pointer"
        />
      </div>
      <ErrorDisplay>{error}</ErrorDisplay>
    </>
  );
};

export default ResetPsComponent;
