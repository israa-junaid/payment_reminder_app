import { MdDeleteOutline } from "react-icons/md";

const DeleteButton = () => {
  return (
    <MdDeleteOutline
      disableRipple
      size={31}
      className="delete-icon p-1 rounded cursor-pointer"
    />
  );
};

export default DeleteButton;
