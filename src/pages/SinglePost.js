import React, { useState, useEffect } from "react";
import axios from "axios";

const SinglePost = (props) => {
  const [post, setPost] = useState("");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/post/${props.match.params.slug}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <React.Fragment>
      <div className="container pb-5">
        <br />
        <h2>{post.title}</h2>
        <p className="lead">{post.content}</p>
        <p>
          Author <strong>{post.user}</strong> Published on{" "}
          <strong>{new Date(post.createdAt).toLocaleString()}</strong>
        </p>
      </div>
    </React.Fragment>
  );
};

export default SinglePost;
