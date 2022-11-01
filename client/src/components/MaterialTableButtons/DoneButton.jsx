import { MdOutlineDone } from "react-icons/md";

const DoneButton = () => {
  return (
    <MdOutlineDone
      disableRipple
      size={31}
      className="arrow-icon p-1 rounded cursor-pointer"
    />
  );
};

export default DoneButton;
