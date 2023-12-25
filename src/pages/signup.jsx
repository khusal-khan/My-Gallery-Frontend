import React, { useContext, useEffect, useRef, useState } from "react";
import Navbars from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Snackbar from "../components/Snackbar";
import { login,createuser ,useTitle} from "../services";

const Signup = () => {
  let Navigate = useNavigate();
  
  let Showtoast = useRef();
  let signClick = useRef();
  useTitle("My Gallery - Sign In");

  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });
  }, []);
  
  // Login Form
  const [credentials, setCredentials] = useState({ email:"", password:"" });

  const SignInhandleSubmit = async (e) => {
    e.preventDefault();
    const json = await login(credentials.username,credentials.password);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("name",json.name)
      Navigate("/");
    } else {
      alert("Invalid credentials", "danger");
      Showtoast.current.click();
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Sign Up Form
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const SignUphandleSubmit = async (e) => {
    e.preventDefault();
    const json = await createuser(formData.username,formData.username,formData.email,formData.password)
    if (json.authtoken) {
      // Save the auth token and redirect
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      signClick.current.click();
    }
    if (json.error) {
      alert("Invalid credentials");
      Showtoast.current.click();
    }
  };

  const onChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <Navbars />
        <div className="containers" id="container">
          <div className="form-container sign-up">
            <form>
              <h1>Create Account</h1>
              <div className="social-icons">
                <a href="#" className="icons">
                  <i
                    className="bi bi-google"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
                <a href="#" className="icons">
                  <i
                    className="bi bi-facebook"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
                <a href="#" className="icons">
                  <i
                    className="bi bi-github"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
                <a href="#" className="icons">
                  <i
                    className="bi bi-linkedin"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
              </div>
              <span>or use your email to registration</span>
              <input
                type="text"
                onChange={onChanges}
                value={formData.username}
                name="username"
                placeholder="Name"
              />
              <input
                type="email"
                onChange={onChanges}
                value={formData.email}
                name="email"
                placeholder="Email"
              />
              <input
                type="password"
                onChange={onChanges}
                value={formData.password}
                name="password"
                placeholder="Password"
              />
              <button onClick={SignUphandleSubmit}>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in">
            <form>
              <h1>Sign In</h1>
              <div className="social-icons">
                <a href="#" className="icons">
                  <i
                    className="bi bi-google"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
                <a href="#" className="icons">
                  <i
                    className="bi bi-facebook"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
                <a href="#" className="icons">
                  <i
                    className="bi bi-github"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
                <a href="#" className="icons">
                  <i
                    className="bi bi-linkedin"
                    style={{ color: "#13a365", fontSize: "20px" }}
                  ></i>
                </a>
              </div>
              <span>or use your username/password</span>
              <input
                onChange={onChange}
                name="username"
                value={credentials.username}
                type="text"
                placeholder="Username"
              />
              <input
                onChange={onChange}
                name="password"
                value={credentials.password}
                type="password"
                placeholder="Password"
              />
              <a href="#">Forget your Password?</a>
              <button onClick={SignInhandleSubmit}>Sign In</button>
            </form>
          </div>
          <div className="toggle-container">
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>Welcome Back!</h1>
                <p>Enter your Personal details to use all of site features</p>
                <button className="hidden" ref={signClick} id="login">
                  Sign In
                </button>
              </div>
              <div className="toggle-panel toggle-right">
                <h1>Hello, Friend!</h1>
                <p>
                  Register with your Personal details to use all of site
                  features
                </p>
                <button className="hidden" id="register">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
        <Snackbar data={Showtoast} />
      </div>
    </>
  );
};
export default Signup;
