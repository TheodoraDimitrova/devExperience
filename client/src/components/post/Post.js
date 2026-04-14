import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentsBoard from "./CommentsBoard";
import { getPost } from "../../actions/postActions";
import PageLoader from "../common/PageLoader";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { post } = this.props.post;
    let postContent;

    if (post === null || Object.keys(post).length === 0) {
      postContent = <PageLoader message="Loading post…" />;
    } else {
      const comments = Array.isArray(post.comments) ? post.comments : [];
      postContent = (
        <div className="post-detail-thread">
          <PostItem post={post} showActions={false} />
          <h2 className="post-form-title mb-1 mt-4">Discussion</h2>
          <p className="text-muted small mb-3">
            Reply to this post and follow the thread below.
          </p>
          <CommentForm postId={post._id} />
          <CommentsBoard postId={post._id} comments={comments} />
        </div>
      );
    }

    return (
      <div className="posts-page post-detail-page py-3 py-md-4">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-lg-10 col-xl-8 px-0 px-sm-1">
            <Link
              to="/postsBoard"
              className="btn btn-outline-secondary btn-sm mb-3 d-inline-block"
            >
              <i className="fas fa-arrow-left mr-2" aria-hidden="true" />
              Back to discussion
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    );
  }
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPost }
)(Post);
