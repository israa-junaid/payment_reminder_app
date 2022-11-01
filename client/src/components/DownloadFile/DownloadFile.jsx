import { saveAs } from "file-saver";
import toast from "react-hot-toast";

//ICONS
import { MdDownload, MdInsertDriveFile } from "react-icons/md";
import DownloadButton from "../MaterialTableButtons/DownloadButton";
import ViewButton from "../MaterialTableButtons/ViewButton";

const DownloadFile = ({ url }) => {
  const downloadImage = (url) => {
    saveAs(`${process.env.REACT_APP_IMAGE_DOCUMENT}/${url}`, url); // Download
  };

  const viewImage = (url) => {
    window.open(`${process.env.REACT_APP_IMAGE_DOCUMENT}/${url}`, "_blank"); // View in a new page
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex flex-row items-center gap-3 w-4/5">
        <MdInsertDriveFile size={"25"} className="shrink-0" />

        <h2 className="truncate ">{url}</h2>
      </div>
      <div className="flex flex-row gap-3">
        <ViewButton onClick={(e) => viewImage(url)} />
        <DownloadButton onClick={(e) => downloadImage(url)} />
      </div>
    </div>
  );
};

export default DownloadFile;
