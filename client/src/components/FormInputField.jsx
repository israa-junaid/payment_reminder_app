import { useFormContext } from "react-hook-form";

const FormInputField = ({
  name,
  className,
  label,
  labelClass = "text-lg font-semibold",
  ...otherProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      {label && (
        <label className={`inline-block mb-2 ${labelClass} `}>{label}</label>
      )}

      <input
        className={`${className} input-form`}
        min={0}
        {...register(name)}
        {...otherProps}
      />
      <div>
        <p className="text-red-700 mt-2 text-left">{errors[name]?.message}</p>
      </div>
    </div>
  );
};

export default FormInputField;
