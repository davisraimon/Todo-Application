import React from "react";
import PropTypes from "prop-types";
import "../App.css";

const Header = ({ title }) => {
  return (
    <>
      <h3>{title}</h3>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
