import React from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "./logo.svg";
import Button from "./Button";

export default function Header() {
  const history = useHistory();
  function createPoll() {
    history.push("/create");
  }
  return (
    <div className="container sticky inset-x-0 top-0 flex items-center justify-between w-full px-2 py-4 bg-white">
      <Link
        to="/"
        className="flex items-center justify-center text-lg font-semibold text-gray-600 hover:text-gray-800"
      >
        <img className="h-8 mr-4" src={logo} alt="Logo" />
        Savvy
      </Link>
      <div className="flex items-center justify-center">
        <Link
          to="/about"
          className="mr-4 font-semibold text-gray-600 hover:text-gray-800"
        >
          About
        </Link>
        <Button onClick={createPoll} title="New feature" />
      </div>
    </div>
  );
}
