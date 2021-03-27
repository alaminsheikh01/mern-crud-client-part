import React, { useEffect, useState } from "react";
import axios from "axios";
import { authenticate, getName, getToken, logout } from "../helpers";
import { withRouter } from "react-router-dom";

const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    password: "",
  });
  const { name, password } = state;

  useEffect(() => {
    getName() && props.history.push("/");
  }, []);

  const handleChange = (name) => (e) => {
    //console.log(e.target.value);
    setState({ ...state, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { name, password })
      .then((response) => {
        console.log(response);
        // response will contain token and name
        authenticate(response, () => {
          return props.history.push("/post");
        });
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };
  return (
    <React.Fragment>
      <div className="container mt-5">
        <h1 className="text-center">LOGIN</h1>
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <div className="form-gorup">
                <label className="lead">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter name"
                  required
                  onChange={handleChange("name")}
                  value={name}
                />
              </div>

              <div className="form-gorup">
                <label className="lead">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="enter password"
                  required
                  onChange={handleChange("password")}
                  value={password}
                />
              </div>
              <button
                className="btn btn-sm btn-outline-primary mt-3"
                type="submit"
              >
                LOGIN
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);
