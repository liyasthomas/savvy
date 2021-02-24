import React from "react";

export default function Button({
  onClick,
  title,
  backgroundColor = "#6dd345",
  disabled,
}) {
  return (
    <button
      onClick={disabled ? null : onClick}
      style={buttonStyle(backgroundColor, disabled)}
      className="transition-all duration-150 transform hover:scale-105"
    >
      {title}
    </button>
  );
}

const buttonStyle = (backgroundColor, disabled) => ({
  background: backgroundColor,
  borderRadius: 8,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  outline: "none",
  border: "none",
  fontWeight: "600",
  opacity: disabled ? 0.5 : 1,
  padding: "8px 16px",
  margin: "4px 8px",
  textShadow: "0 1px 2px rgb(0 0 0 / 20%)",
});
