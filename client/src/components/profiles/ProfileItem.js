import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import isEmpty from "../../validation/is-empty";

class ProfileItem extends Component {
  render() {
    const { profile } = this.props;
    const displayName =
      profile.user && profile.user.name ? profile.user.name : profile.handle;
    const skills = Array.isArray(profile.skills) ? profile.skills : [];
    const topSkills = skills.slice(0, 5);
    const initial = displayName.charAt(0).toUpperCase();

    return (
      <div className="profile-item-card card border-0 shadow-sm mb-3">
        <div className="card-body p-3 p-md-4">
          <div className="row align-items-start align-items-md-center">
            <div className="col-12 col-md-auto text-center text-md-left mb-3 mb-md-0">
              {profile.user && profile.user.avatar ? (
                <img
                  src={profile.user.avatar}
                  alt=""
                  className="profile-item-avatar rounded-circle"
                />
              ) : (
                <div
                  className="profile-item-avatar profile-item-avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mx-md-0"
                  aria-hidden="true"
                >
                  {initial}
                </div>
              )}
            </div>

            <div className="col-12 col-md profile-item-main text-center text-md-left">
              <h3 className="h5 mb-1 text-dark font-weight-bold">{displayName}</h3>
              <p className="text-muted small mb-2 mb-md-1">
                <span className="text-dark">{profile.status}</span>
                {!isEmpty(profile.company) && (
                  <span>
                    {" "}
                    <span className="text-muted">·</span> {profile.company}
                  </span>
                )}
              </p>
              {!isEmpty(profile.location) && (
                <p className="small text-muted mb-2 mb-md-3">
                  <i className="fas fa-map-marker-alt mr-1" aria-hidden="true" />
                  {profile.location}
                </p>
              )}
              <Link
                to={`/profile/${profile.handle}`}
                className="btn btn-outline-info font-weight-medium profile-item-cta"
              >
                View profile
              </Link>
            </div>

            <div className="col-12 col-md-4 mt-3 mt-md-0 pt-3 pt-md-0 profile-item-skills-wrap">
              <p className="small text-uppercase text-muted font-weight-bold mb-2 letter-space">
                Skills
              </p>
              {topSkills.length > 0 ? (
                <div className="profile-item-skills">
                  {topSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="badge badge-light border text-dark mr-1 mb-1 d-inline-block font-weight-normal"
                    >
                      <i className="fas fa-check text-info mr-1" aria-hidden="true" />
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="text-muted small">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
