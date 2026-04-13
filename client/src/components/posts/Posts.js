import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostsBoard from "./PostsBoard";
import { getPosts } from "../../actions/postActions";

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts } = this.props.post;
    let postContent;

    if (posts === null) {
      postContent = (
        <div className="card border-0 shadow-sm posts-empty-state">
          <div className="card-body text-center text-muted">
            No posts yet.
          </div>
        </div>
      );
    } else {
      postContent = <PostsBoard posts={posts} />;
    }

    return (
      <div className="posts-page py-3 py-md-4">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-lg-10 col-xl-8 px-0 px-sm-1">
            <div className="posts-page-header text-center mb-3">
              <h1 className="posts-page-title mb-2">Discussion</h1>
              <p className="text-muted small mb-0">
                Share updates, ask questions, and keep the conversation going.
              </p>
            </div>
            <div className="posts-layout">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
