import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "./logo.svg";
import Button from "./Button";

export default function Header() {
  const history = useHistory();
  let { pathname } = useLocation();
  function createPoll() {
    history.push("/create");
  }
  console.log("pathName:", pathname);
  return (
    <div className="container sticky inset-x-0 top-0 flex items-center justify-between w-full px-6 py-4 bg-white">
      <div className="flex items-center justify-center">
        <Link to="/">
          <img className="h-10" src={logo} alt="Logo" />
        </Link>
        <Link to="/">
          <h1 className="ml-4 text-lg font-semibold text-gray-600">Savvy</h1>
        </Link>
      </div>
      {pathname !== "/create" && (
        <Button onClick={createPoll} title="New feature" />
      )}
    </div>
  );
}
