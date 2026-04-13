import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;
    const isOwn = String(comment.user) === String(auth.user.id);

    return (
      <div className="card border-0 shadow-sm post-card comment-card mb-3">
        <div className="card-body p-3">
          <div className="row align-items-start">
            <div className="col-12 col-md-2 mb-3 mb-md-0 text-center">
              <img
                className="rounded-circle post-card-avatar"
                src={comment.avatar}
                alt={comment.name || ""}
              />
              <p className="post-card-author mb-0 mt-2">{comment.name}</p>
            </div>
            <div className="col-12 col-md-10">
              <div className="comment-card-content d-flex justify-content-between align-items-start">
                <p className="post-card-text mb-0 flex-grow-1 pr-2 pr-md-3">
                  {comment.text}
                </p>
                {isOwn ? (
                  <button
                    onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                    type="button"
                    className="btn btn-link btn-sm text-muted comment-delete-btn p-0 flex-shrink-0"
                    title="Delete comment"
                    aria-label="Delete comment"
                  >
                    <i className="fas fa-trash-alt" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
