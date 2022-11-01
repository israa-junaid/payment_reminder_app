import { Controller, useFormContext } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { useState } from "react";
import axios from "axios";

const FormReactSelect = ({
  name,
  className,
  label,
  searchCriteria,
  apiUrl,
  labelClass = "text-lg font-semibold",
  ...otherProps
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const [value, setValue] = useState();

  //fetching data
  const fetchingData = (inputText, callback) => {
    const promise = axios({
      // Endpoint to send files
      url: `${apiUrl}${
        inputText.length === 0 ? "&" : `&${searchCriteria}=${inputText}`
      }`,
      method: "GET",
      headers: {
        // Add any auth token here
        // "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      // Handle the response from backend here
      .then((res) => {
        console.log(res.data.data);

        const result = res.data.data;
        callback(
          result.map((result) => ({
            label: result[`${searchCriteria}`],
            value: result._id,
          }))
        );
      })

      // Catch errors if any
      .catch((err) => {
        return Promise.reject();
      });
  };

  const handleSelectOnChange = (value) => {
    setValue(value);
  };

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      padding: "0.2rem 0.2rem",
      border: "1px solid #00000054",
    }),
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        cursor: isDisabled ? "not-allowed" : "pointer",

        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      };
    },
  };

  return (
    <div className="flex flex-col">
      {label && (
        <label className={`inline-block mb-2 ${labelClass} `}>{label}</label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <AsyncSelect
            defaultOptions
            menuPortalTarget={document.body}
            styles={colourStyles}
            cacheOptions
            value={value}
            className={className}
            placeholder="Search by name"
            loadOptions={fetchingData}
            onChange={(val) => {
              console.log(val);
              onChange(val.value);
              handleSelectOnChange(val);
            }}
            {...otherProps}
          />
        )}
      />
      <div>
        <p className="text-red-700 mt-2 text-left">{errors[name]?.message}</p>
      </div>
    </div>
  );
};

export default FormReactSelect;
