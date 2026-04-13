import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "../../validation/is-empty";

class ProfileAbout extends Component {
  render() {
    const { profile, loading } = this.props;

    if (loading || !profile) {
      return null;
    }

    const name =
      profile.user && profile.user.name
        ? profile.user.name.trim()
        : profile.handle;
    const firstName = name.split(" ")[0] || name;

    const skills = Array.isArray(profile.skills) ? profile.skills : [];

    return (
      <div className="card border-0 shadow-sm mb-4 profile-section-card">
        <div className="card-body p-3 p-md-4">
          <h2 className="h5 font-weight-bold text-dark mb-3 profile-section-title">
            About {firstName}
          </h2>
          <p className="text-muted mb-0 profile-bio-text">
            {isEmpty(profile.bio) ? (
              <span className="font-italic">
                {firstName} hasn&apos;t added a bio yet.
              </span>
            ) : (
              profile.bio
            )}
          </p>

          <hr className="my-4" />

          <h3 className="small text-uppercase text-muted font-weight-bold mb-3 letter-space">
            Skills
          </h3>
          {skills.length > 0 ? (
            <div className="d-flex flex-wrap">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="badge badge-light border text-dark mr-2 mb-2 d-inline-flex align-items-center font-weight-normal profile-skill-badge"
                >
                  <i className="fas fa-check text-info mr-2" aria-hidden="true" />
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-muted small mb-0">No skills listed.</p>
          )}
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default ProfileAbout;
