const ErrorDisplay = ({ children }) => {
  if (children)
    return (
      <div>
        <p className="text-red-700 mt-2 text-left">{children}</p>
      </div>
    );
  else return null;
};

export default ErrorDisplay;
