import React from "react";
import { Link, withRouter } from "react-router-dom";
import { getName, logout } from "../helpers";

const Navbar = ({ history }) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            LOGO HERE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/post">
                  Create
                </Link>
              </li>

              {!getName() && (
                <li className="nav-item ml-auto">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {getName() && (
                <li
                  className="nav-item ml-auto mt-2"
                  onClick={() => logout(() => history.push("/"))}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default withRouter(Navbar);
