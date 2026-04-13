import React, { Component } from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

class CommentFeed extends Component {
  render() {
    const { comments, postId } = this.props;
    const list = Array.isArray(comments) ? comments : [];

    if (list.length === 0) {
      return (
        <div className="card border-0 shadow-sm posts-empty-state">
          <div className="card-body text-center text-muted small">
            No comments yet. Be the first to reply.
          </div>
        </div>
      );
    }

    return list.map(comment => (
      <CommentItem key={comment._id} comment={comment} postId={postId} />
    ));
  }
}

CommentFeed.propTypes = {
  comments: PropTypes.array,
  postId: PropTypes.string.isRequired
};

export default CommentFeed;
