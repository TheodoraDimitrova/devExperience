import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center px-2">
                <h1 className="landing-title mb-3 mb-md-4">
                  Developers Experience
                </h1>
                <p className="landing-lead text-light mb-4">
                  Create your profile/portfolio, share posts and get help from
                  other developers
                </p>
                <hr className="mb-4" />
                <div className="landing-cta-row d-flex flex-column flex-sm-row justify-content-center align-items-center">
                  <Link
                    to="/register"
                    className="btn btn-lg btn-info mb-2 mb-sm-0 mr-sm-2"
                  >
                    Sign Up
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStatesToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStatesToProps)(Landing);
