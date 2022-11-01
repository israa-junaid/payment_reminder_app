import profile from "../images/table/default_profile.svg";
import React, { useMemo, useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";

const Image = ({ src, ...otherProps }) => {
  function imgErr(e) {
    e.target.src = profile;
    e.target.onerror = "";
    // console.log(e);
    return true;
  }

  {
    /* <img src="test.jpg" alt="test" title="test" onerror="imgErr(this);" /> */
  }

  const [viewImage, setViewImage] = useState(src);

  const handleImageErr = (err) => {
    err.target.src = profile;
  };

  return <img src={src} onError={handleImageErr} {...otherProps} />;
};

export default Image;
