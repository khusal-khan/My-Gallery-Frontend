import React from "react";
import PropTypes from "prop-types";

const Snackbar = (props) => {
  const { data } = props;
  const ShowToast = () => {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };
  return (
    <>
      <button ref={data} className="d-none"onClick={ShowToast}>
        Show Snackbar
      </button>
      <div id="snackbar">
        <div className="icon">
          <img
            src=""
            width={28}
            height={28}
            alt=""
          />
        </div>
        {props.defaultMsg}
      </div>
    </>
  );
};

// Snackbar.defaultProps = {
//   defaultImg: {
//     "done.gif": "/assets/icon/done.gif",
//     "add.gif": "assets/icon/add.gif",
//     "ok.gif": "assets/icon/ok.gif",
//     "verified.gif": "assets/icon/verified.gif",
//     "spiiner.gif": "assets/icon/spiiner.gif",
//     "spiiner1.gif": "assets/icon/spiiner1.gif",
//     "add.png": "assets/icon/add.png",
//     "previous.png": "assets/icon/previous.png",
//     "next.png": "assets/icon/next.png",
//     "ok.png": "assets/icon/ok.png",
//     "verified.png": "assets/icon/verified.png",
//     "add.png": "assets/icon/add.png",
//     "add1.png": "assets/icon/add1.png",
//     "done.png": "assets/icon/done.png",
//   },
//   showIcon: "done.png",
//   defaultMsg: "Add a description of the image here",
// };
// Snackbar.propTypes = {
//   defaultMsg: PropTypes.string,
//   defaultImg: PropTypes.string,
//   showIcon: PropTypes.string,
// };

export default Snackbar;
