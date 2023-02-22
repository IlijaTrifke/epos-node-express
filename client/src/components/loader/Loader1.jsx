import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./loader1.scss";

export const Loader1 = () => {
  return (
    <div
      className="loader1"
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        zIndex: "2000",
      }}
    >
      <div className="backdrop1"></div>
      <ScaleLoader
        color={"#24bdde"}
        size={"10rem"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader1;
