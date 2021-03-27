import React, { useState, useEffect } from "react";
import axios from "axios";
import renderHtml from "react-render-html";

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
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <br />
            <h2>{post.title}</h2>
            <p className="lead">{renderHtml(post && post.content)}</p>
            <p>
              Author <strong>{post.user}</strong> Published on{" "}
              <strong>{new Date(post.createdAt).toLocaleString()}</strong>
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SinglePost;
