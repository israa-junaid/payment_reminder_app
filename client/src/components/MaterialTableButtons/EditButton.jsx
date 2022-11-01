import { MdEdit } from "react-icons/md";

const EditButton = () => {
  return (
    <MdEdit
      disableRipple
      size={31}
      className="edit-icon p-1 rounded cursor-pointer"
    />
  );
};

export default EditButton;
