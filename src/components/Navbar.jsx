import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const Navbars = () => {
  var showModal = useRef();
  let Navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    Navigate("/signup");
  };
  const dead = () => {
    showModal.current.click();
  };
  return (
    <>
      <div className="wrapper">
        <div className="multi_color_border"></div>
        <div className="top_nav">
          <div className="left">
            <div className="logo">
              <p>
                My <span>Gallery</span>
              </p>
            </div>
            <div className="search_bar">
              <input type="text" placeholder="Search your Photos" />
            </div>
          </div>
          <div className="right">
            <ul>
              <li>
                <span>{localStorage.getItem("name")&& "Hello , "+localStorage.getItem("name").toUpperCase()}</span>
              </li>

              {localStorage.getItem("token") ? (
                <>
                  <li>
                    <button className="btn" onClick={dead}>
                      <i
                        className="bi bi-cloud-plus-fill"
                        style={{ color: "#13a365", fontSize: 24 + "px" }}
                      ></i>{" "}
                      Upload
                    </button>
                  </li>
                  <li>
                    <button className="btn" onClick={logout}>
                      <i
                        className="bi bi-box-arrow-right"
                        style={{ color: "#13a365", fontSize: 24 + "px" }}
                      ></i>{" "}
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/signup">LogIn</Link>
                  </li>
                  <li>
                    <Link to="/signup">SignUp</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="bottom_nav">
          <ul>
            <li className="nav-item">
              <Link to="/">
                <i
                  className="bi bi-house-fill"
                  style={{ color: "#13a365", fontSize: "24px" }}
                ></i>{" "}
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <i
                  className="bi bi-star-fill"
                  style={{ color: "#13a365", fontSize: "24px" }}
                ></i>{" "}
                Favorites
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/">
                <i
                  className="bi bi-file-image-fill"
                  style={{ color: "#13a365", fontSize: "24px" }}
                ></i>{" "}
                albums
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="banner">
                <img src="https://i.imgur.com/iFaKR9k.png" alt="banner_img"/>
            </div> */}
      </div>
      <Modal ref={showModal} />
    </>
  );
};
export default Navbars;
