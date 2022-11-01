import triangle from "../../images/green_triangle.svg";
import CountUp from "react-countup";
import { useNavigate } from "react-router-dom";

const Cards = (props) => {
  const navigate = useNavigate();
  const navigateToLink = () => {
    navigate(props.link);
  };

  return (
    <div
      className={`p-5 bg-white rounded-md max-w-xs drop-shadow-xl hover:bg-custom-dashcard hover:text-white cursor-pointer ${props.className}`}
      onClick={navigateToLink}
    >
      <h2 className="text-2xl font-bold ">{props.label}</h2>
      <div className="flex  flex-row  justify-between items-end mt-2">
        <h1 className="text-4xl font-bold">
          <CountUp end={props.number} duration={2} useEasing={true} />{" "}
        </h1>
        <img className="h-2" src={triangle} alt="" />
      </div>
    </div>
  );
};

export default Cards;
