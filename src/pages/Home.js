import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getToken, getName } from "../helpers";
import renderHtml from "react-render-html";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = () => {
    axios
      .get(`${process.env.REACT_APP_API}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => console.log("Error fetching posts", error));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deleteConfirm = (slug) => {
    let answer = window.confirm("Are you sure want to delete this post ?");
    if (answer) {
      deletePost(slug);
    }
  };

  const deletePost = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/post/${slug}`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((response) => {
        alert(response.data.message);
        fetchPosts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <div className="container pb-5 mt-5">
        {posts.map((post, i) => (
          <div key={i}>
            <div className="row">
              <div className="col-md-10">
                <Link to={`/post/${post.slug}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p className="lead">
                  {renderHtml(post.content.substring(0, 100))}
                </p>
                <p>
                  Auther <strong>{post.user}</strong> Published on{" "}
                  <strong>{new Date(post.createdAt).toLocaleString()}</strong>
                </p>
                <hr />
              </div>
              {getName() && (
                <div className="col-md-2">
                  <Link
                    to={`/post/update/${post.slug}`}
                    className="btn btn-sm btn-outline-warning"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteConfirm(post.slug)}
                    className="btn btn-sm btn-outline-danger"
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Home;
