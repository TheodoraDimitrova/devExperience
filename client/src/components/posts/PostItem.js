import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions';

class PostItem extends Component {
  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onUnlikeClick(id) {
    this.props.removeLike(id);
  }

  findUserLike(likes) {
    const { auth } = this.props;
    const list = likes || [];
    const uid = auth.user.id;
    //checking if user is in the array of likes
    if (
      list.filter(like => String(like.user) === String(uid)).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;
    const likeCount = (post.likes && post.likes.length) || 0;
    const commentCount = (post.comments && post.comments.length) || 0;

    return (
      <div className="card border-0 shadow-sm post-card mb-3">
        <div className="card-body p-3">
          <div className="row align-items-start">
            <div className="col-12 col-md-2 mb-3 mb-md-0 text-center">
              <img
                className="rounded-circle post-card-avatar"
                src={post.avatar}
                alt={post.name}
              />
              <p className="post-card-author mb-0 mt-2">{post.name}</p>
            </div>

            <div className="col-12 col-md-10">
              <p className="post-card-text mb-3">{post.text}</p>
              {showActions ? (
                <div className="d-flex flex-wrap align-items-center">
                  <button
                    onClick={this.onLikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light btn-sm mr-2 mb-2"
                  >
                    <i
                      className={classnames("fas fa-thumbs-up", {
                        "text-info": this.findUserLike(post.likes)
                      })}
                    />
                    <span className="badge badge-light ml-1">{likeCount}</span>
                  </button>

                  <button
                    onClick={this.onUnlikeClick.bind(this, post._id)}
                    type="button"
                    className="btn btn-light btn-sm mr-2 mb-2"
                  >
                    <i className="text-secondary fas fa-thumbs-down" />
                  </button>

                  <Link
                    to={`/post/${post._id}`}
                    className="btn btn-outline-info btn-sm mr-2 mb-2 post-thread-btn d-inline-flex align-items-center"
                    title="Open post and read replies"
                    aria-label={
                      commentCount === 0
                        ? "Open discussion, no replies yet"
                        : `Open discussion, ${commentCount} ${
                            commentCount === 1 ? "reply" : "replies"
                          }`
                    }
                  >
                    <i className="fas fa-comments mr-1" aria-hidden="true" />
                    <span>Thread</span>
                    {commentCount > 0 ? (
                      <span className="badge badge-light border ml-1">
                        {commentCount}
                      </span>
                    ) : null}
                  </Link>
                  {String(post.user) === String(auth.user.id) ? (
                    <button
                      onClick={this.onDeleteClick.bind(this, post._id)}
                      type="button"
                      className="btn btn-danger btn-sm mb-2"
                    >
                      <i className="fas fa-times" />
                    </button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(
  PostItem
);
