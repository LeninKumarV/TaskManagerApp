import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FIrebase";
import { ref, set } from "firebase/database";

const SingnUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password, userName)
      .then((userCredential) => {
        const user = userCredential.user;

        set(ref(db, "users/" + user.uid), {
          username: userName,
          email: email,
          id:user.uid
        });
        window.alert("Welcome to the Family!");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        window.alert(errorMessage);
      });
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "90vh" }}
    >
      <form style={{border:"1px solid grey",borderRadius:"10%"}} className="px-5 py-4">
        <div className="mb-3">
          <label htmlFor="exampleInputUserName" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputUserName"
            aria-describedby="emailHelp"
            onChange={(e) => setUserName(e.target.value)}
          />

          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </button>
        <div className="my-3">
          <span>
            Existing User ?
            <Link to="/login" className="my-3">
              Please Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SingnUp;
