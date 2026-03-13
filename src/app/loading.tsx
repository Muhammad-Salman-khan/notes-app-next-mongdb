import { Oval, ThreeDots } from "react-loader-spinner";

const loading = () => {
  return (
    <div className="flex justify-center align-middle items-center h-screen ">
      <ThreeDots
        height={80}
        width={80}
        color="#4fa94d"
        visible={true}
        ariaLabel="oval-loading"
      />
    </div>
  );
};

export default loading;
