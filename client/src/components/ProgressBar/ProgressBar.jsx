import { useState } from "react";

const ProgressBar = (props) => {
  const [percentage, setPercentage] = useState(
    props.votes != 0
      ? (props.votes * 100) / props.totalVotes + "%"
      : props.votes + "%"
  );

  return (
    <div class="w-full progress-bar-border overflow-clip">
      <div
        class="text-base font-medium text-left p-3 leading-none progress-bar whitespace-nowrap"
        style={{ width: percentage }}
      >
        {" "}
        <div className="flex flex-row justify-start items-center ml-2 gap-4 ">
          <span>◯</span>
          <h2 className="w-full text-black">
            {props.title} {parseInt(percentage) + "%"}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
