import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import "./loader.scss";

export const Loader = () => {
  return (
    <div
      className="loader"
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
      <div className="backdrop"></div>
      <ScaleLoader
        color={"#24bdde"}
        size={"10rem"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
