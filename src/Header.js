import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import Button from "./Button";

export default function Header() {
  const history = useHistory();
  let { pathname } = useLocation();
  function createPoll() {
    history.push("/create");
  }
  console.log("pathName:", pathname);
  return (
    <div className="w-full px-4 py-8 lg:w-main md:py-16 md:px-8 lg:px-0">
      <div className="flex flex-col md:flex-row">
        <div className="flex">
          <Link to="/">
            <img className="h-12 md:h-16" src={logo} alt="Logo" />
          </Link>
          <Link to="/">
            <h1
              style={headerStyle}
              className="ml-4 text-4xl font-bold font-main md:text-5xl"
            >
              <span style={{ color: "#0090ff" }}>This</span> or{" "}
              <span style={{ color: "#ff00e4" }}>That</span>
            </h1>
          </Link>
        </div>
        {pathname !== "/create" && (
          <div className="flex flex-1 w-full pt-4 md:pt-0 md:justify-end sm:w-auto">
            <Button onClick={createPoll} title="Create New Poll" emoji="🌈" />
          </div>
        )}
      </div>
    </div>
  );
}

const headerStyle = {
  textShadow: "rgba(0, 0, 0, 0.25) 0px 0.1rem 0.1rem",
};
