import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileDetails from "./ProfileDetails";
import ProfileGit from "./ProfileGit";

import { getProfileByHandle } from "../../actions/profileActions";
import PageLoader from "../common/PageLoader";

class Profile extends Component {
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }

  componentDidUpdate(prevProps) {
    const h = this.props.match.params.handle;
    if (h && h !== prevProps.match.params.handle) {
      this.props.getProfileByHandle(h);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile } = this.props.profile;
    let profileContent;

    if (profile === null) {
      profileContent = <PageLoader message="Loading profile…" />;
    } else {
      profileContent = (
        <div className="profile-detail-inner">
          <div className="mb-4">
            <Link
              to="/profiles"
              className="btn btn-sm btn-outline-secondary"
            >
              <i className="fas fa-arrow-left mr-2" aria-hidden="true" />
              All profiles
            </Link>
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileDetails
            profile={profile}
            education={profile.education}
            experience={profile.experience}
          />
          {profile.githubusername ? (
            <ProfileGit username={profile.githubusername} />
          ) : null}
        </div>
      );
    }

    return (
      <div className="profile-detail-page py-3 py-md-4">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-lg-10 px-0 px-sm-1">{profileContent}</div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getProfileByHandle: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
