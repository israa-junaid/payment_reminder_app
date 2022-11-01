import { MdArrowRightAlt } from "react-icons/md";

const ArrowButton = () => {
  return (
    <MdArrowRightAlt
      disableRipple
      size={31}
      className="arrow-icon p-1 rounded cursor-pointer"
    />
  );
};

export default ArrowButton;
