import React from "react";
import Navbar from "./components/Navbar";
import PropTypes from "prop-types";
import Footer from "./components/Footer";
import { ShowPhoto } from "./components/ShowPhoto";
import { useTitle } from "./services";

const App = (props) => {
  useTitle(props.defaultTitle);

  return (
    <>
      <Navbar />
      <hr className="border-0" />
      <ShowPhoto />
      <hr />
      <Footer />
    </>
  );
};

App.defaultProps = {
  defaultTitle: "My Gallery - Home",
};
App.propTypes = {
  defaultTitle: PropTypes.string,
};

export default App;
