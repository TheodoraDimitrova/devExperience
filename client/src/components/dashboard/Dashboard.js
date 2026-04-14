import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
import PageLoader from "../common/PageLoader";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick() {
    if (
      window.confirm(
        "This will permanently delete your account and profile. Continue?"
      )
    ) {
      this.props.deleteAccount();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    const accountEmail =
      profile && profile.user && profile.user.email ? profile.user.email : "";

    const hasProfile =
      profile &&
      typeof profile === "object" &&
      Object.keys(profile).length > 0;

    let dashboardContent;

    if (profile === null) {
      dashboardContent = (
        <PageLoader message="Loading your dashboard…" />
      );
    } else if (hasProfile) {
      dashboardContent = (
        <div className="dashboard-main">
          <div className="card border-0 shadow-sm mb-4 dashboard-welcome-card">
            <div className="card-body p-3 p-md-4">
              <p className="lead text-muted mb-0 dashboard-welcome-text">
                Welcome,{" "}
                <Link
                  to={`/profile/${profile.handle}`}
                  className="font-weight-bold text-info"
                >
                  {user.name}
                </Link>
              </p>
              {accountEmail ? (
                <p className="small text-muted mb-0 mt-1">
                  Signed in with{" "}
                  <span className="font-weight-medium">{accountEmail}</span>
                </p>
              ) : null}
            </div>
          </div>
          <ProfileActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="dashboard-danger-zone mt-4 pt-3 border-top">
            <button
              type="button"
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-outline-danger dashboard-delete-btn"
            >
              <i className="fas fa-trash-alt mr-2" aria-hidden="true" />
              Delete my account
            </button>
          </div>
        </div>
      );
    } else {
      dashboardContent = (
        <div className="card border-0 shadow-sm dashboard-empty-card">
          <div className="card-body p-4 p-md-5 text-center">
            <i
              className="fas fa-id-card fa-3x text-muted mb-3 d-block"
              aria-hidden="true"
            />
            <p className="lead text-muted mb-2">Welcome, {user.name}</p>
            <p className="text-muted mb-4">
              You haven&apos;t created a profile yet. Add a few details to get
              started.
            </p>
            <Link
              to="/create-profile"
              className="btn btn-info btn-lg dashboard-cta-btn"
            >
              Create profile
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard-page py-3 py-md-4">
        <div className="row mx-0">
          <div className="col-12 px-0 px-sm-1">
            <h1 className="dashboard-page-title mb-3 mb-md-4">Dashboard</h1>
            {dashboardContent}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
