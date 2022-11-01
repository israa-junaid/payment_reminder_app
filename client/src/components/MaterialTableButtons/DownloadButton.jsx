import { MdDownload } from "react-icons/md";

const DownloadButton = ({ onClick }) => {
  return (
    <MdDownload
      disableRipple
      onClick={onClick}
      size={31}
      className="arrow-icon p-1 rounded cursor-pointer"
    />
  );
};

export default DownloadButton;
