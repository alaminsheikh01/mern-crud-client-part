import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../helpers";
import ReactQuill from "react-quill";
import "../../node_modules/react-quill/dist/quill.bubble.css";
import { withRouter } from "react-router-dom";

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: "",
    slug: "",
    user: "",
  });

  const [content, setContent] = useState("");

  const handleContent = (e) => {
    setContent(e);
  };

  const { title, slug, user } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, slug, user });
        setContent(content);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (name) => (e) => {
    setState({ ...state, [name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `${process.env.REACT_APP_API}/post/${slug}`,
        {
          title,
          content,
          user,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, content, slug, user });
        props.history.push(`/post/${slug}`);
        alert(`Post title ${response.data.title} is Updated`);
      })
      .catch((err) => console.log(err.response));
  };

  const showForm = () => {
    return (
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
    );
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <h1 className="text-center">UPDATE POST</h1>
        <div className="col-md-6 offset-md-3">{showForm()}</div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UpdatePost);
