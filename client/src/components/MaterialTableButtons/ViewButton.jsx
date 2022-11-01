import { MdRemoveRedEye } from "react-icons/md";

const ViewButton = ({ onClick }) => {
  return (
    <MdRemoveRedEye
      disableRipple
      onClick={onClick}
      size={31}
      className="arrow-icon p-1 rounded cursor-pointer"
    />
  );
};

export default ViewButton;
