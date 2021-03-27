import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../helpers";

const UpdatePost = (props) => {
  const [state, setState] = useState({
    title: "",
    content: "",
    slug: "",
    user: "",
  });

  const { title, content, slug, user } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, slug, user } = response.data;
        setState({ ...state, title, content, slug, user });
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
          <textarea
            value={content}
            onChange={handleChange("content")}
            type="text"
            placeholder="Write something"
            className="form-control"
            required
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

export default UpdatePost;
