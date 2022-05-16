import "./signIn.css";
import { BiDoorOpenFill, BiEyeFill, BiEyeSlashFill } from "assets/icons/Icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "context";
import { useDocumentTitle } from "hooks";

function SignIn() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(true);

  const { error, setError, signInHandler } = useAuth();

  useDocumentTitle("SignIn");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setError({ msg: "", state: false });
    }, 3000);
    return () => clearTimeout(timeOut);
  }, [setError, error.state]);

  const formHandler = (event, { email, password }) => {
    event.preventDefault();
    if (!email && !password) {
      setError({ msg: "Please fill all the fields", state: true });
    } else {
      signInHandler(loginDetails);
    }
  };

  return (
    <form className="form d-flex align-center flex-column">
      <h1 className="fs-l text-align-center">Login</h1>
      <p className="danger-text fs-s">{error.state && error.msg}</p>
      <input
        type="email"
        id="email"
        placeholder="Enter Email"
        className={`form-input ${error.state ? "error-border" : ""}`}
        autoComplete="Off"
        onChange={(e) =>
          setLoginDetails({ ...loginDetails, email: e.target.value })
        }
      />{" "}
      <div className="password-input">
        <input
          type={`${showPassword ? "password" : "text"}`}
          id="password"
          placeholder="Enter Password"
          autoComplete="Off"
          className={`form-input ${error.state ? "error-border" : ""}`}
          onChange={(e) =>
            setLoginDetails({ ...loginDetails, password: e.target.value })
          }
        />
        <span className="visibility-icon fs-s">
          {showPassword ? (
            <BiEyeFill onClick={() => setShowPassword(false)} />
          ) : (
            <BiEyeSlashFill onClick={() => setShowPassword(true)} />
          )}
        </span>
      </div>
      <button
        type="button"
        className="btn btn-secondary-outline fs-s"
        onClick={() => {
          signInHandler({ email: "johndoe@gmail.com", password: "johnDoe123" });
        }}
      >
        <BiDoorOpenFill />
        LOGIN WITH TEST CREDENTIALS
      </button>
      <button
        className="btn btn-secondary fs-s"
        onClick={(e) => formHandler(e, loginDetails)}
      >
        <BiDoorOpenFill />
        LOGIN
      </button>
      <Link to="/signup" className="fs-s">
        Not a Member yet? <span className="underline">Sign up now</span>
      </Link>
    </form>
  );
}

export { SignIn };
