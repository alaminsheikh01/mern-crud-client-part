import React, { useState } from "react";
import axios from "axios";
import { getToken, getName } from "../helpers";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.bubble.css";

const Create = () => {
  const [state, setState] = useState({
    title: "",
    user: getName(),
  });

  const [content, setContent] = useState("");

  const handleContent = (e) => {
    console.log(e);
    setContent(e);
  };

  const { title, user } = state;

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.table({ title, content, user });
    axios
      .post(
        `${process.env.REACT_APP_API}/post`,
        { title, content, user },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setState({ ...state, title: "", user: "" });
        setContent("");
        alert(`Post title ${response.data.title} is created`);
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error);
      });
  };

  return (
    <React.Fragment>
      <div className="container p-5">
        <h2 className="text-center">CREATE POST</h2>

        <br />
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="text-muted">Title</label>
                <input
                  value={title}
                  onChange={handleChange("title")}
                  type="text"
                  placeholder="Post title"
                  className="form-control"
                  required
                />
              </div>
              <br />
              <div className="form-group">
                <label className="text-muted">Content</label>
                <ReactQuill
                  theme="bubble"
                  value={content}
                  onChange={handleContent}
                  placeholder="Write something"
                  className="pb-5 mb-3"
                  style={{ border: "2px solid #666" }}
                />
              </div>
              <br />
              <div className="form-group">
                <label className="text-muted">User</label>
                <input
                  value={user}
                  onChange={handleChange("user")}
                  type="text"
                  placeholder="Your name.."
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create;
