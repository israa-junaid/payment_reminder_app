import { useFormContext } from "react-hook-form";
import profile from "../images/table/default_profile.svg";
import { useEffect, useState } from "react";
import Image from "./Image";

const FormImageField = ({
  name,
  className,
  edit,
  value,
  prefix,
  ...otherProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  //image preview logic
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
  };

  const chooseEditImagePreview = () => {
    if (edit) {
      if (selectedFile) return preview;
      else return profile;
    } else {
      if (value === "no-image.jpg" || value === "no-photo.jpg") {
        return profile;
      } else return `${prefix}/${value}`;
    }
  };

  if (edit == null) {
    return (
      <div className="flex flex-col items-center">
        <img
          className="h-28 w-28 mx-auto rounded-full"
          src={selectedFile ? preview : profile}
          alt=""
        />
        <div className="mt-5">
          <label className="py-2 px-4 cursor-pointer bg-zinc-400 text-white text-sm rounded-md hover:opacity-80">
            Choose Picture
            <input
              className={`${className} hidden`}
              type="file"
              id="file-upload"
              {...register("file")}
              {...otherProps}
              onEmptied={() => setPreview(null)}
              onInput={onSelectFile}
            />
          </label>
        </div>
        <div>
          <p className="text-red-700 mt-2 text-left">{errors[name]?.message}</p>
        </div>
      </div>
    );
  } else
    return (
      <div className="flex flex-col items-center">
        {console.log("Image value " + value)}
        <Image
          className="h-28 w-28 mx-auto rounded-full"
          src={chooseEditImagePreview()}
          alt=""
        />
        <div className="mt-5">
          <label
            className={
              edit
                ? `py-2 px-4 cursor-pointer bg-zinc-400 text-white text-sm rounded-md hover:opacity-80`
                : `hidden`
            }
          >
            {edit ? `Choose Picture` : null}
            <input
              className={`${className} hidden`}
              type="file"
              id="file-upload"
              {...register("file")}
              {...otherProps}
              onEmptied={() => setPreview(null)}
              onInput={onSelectFile}
            />
          </label>
        </div>
        <div>
          <p className="text-red-700 mt-2 text-left">{errors[name]?.message}</p>
        </div>
      </div>
    );

  // return (
  //   <div className="flex flex-col items-center">
  //     <img
  //       className="h-28 w-28 mx-auto rounded-full"
  //       src={selectedFile ? preview : profile}
  //       alt=""
  //     />
  //     <div className="mt-5">
  //       <label className="py-2 px-4 cursor-pointer bg-zinc-400 text-white text-sm rounded-md hover:opacity-80">
  //         Choose Picture
  //         <input
  //           className={`${className} hidden`}
  //           type="file"
  //           id="file-upload"
  //           {...register("file")}
  //           {...otherProps}
  //           onEmptied={() => setPreview(null)}
  //           onInput={onSelectFile}
  //         />
  //       </label>
  //     </div>
  //     <div>
  //       <p className="text-red-700 mt-2 text-left">{errors[name]?.message}</p>
  //     </div>
  //   </div>
  // );
};

export default FormImageField;
