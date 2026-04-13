import React, { Component } from "react";
import isEmpty from "../../validation/is-empty";

class ProfileHeader extends Component {
  render() {
    const { profile, loading } = this.props;
    if (loading || !profile) {
      return null;
    }

    const displayName =
      profile.user && profile.user.name ? profile.user.name : profile.handle;
    const initial = displayName.charAt(0).toUpperCase();
    const hasAvatar = profile.user && profile.user.avatar;

    const social = (href, iconClass, label) =>
      !isEmpty(href) ? (
        <a
          href={href}
          className="profile-social-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          <i className={iconClass} aria-hidden="true" />
        </a>
      ) : null;

    return (
      <div className="profile-header-card card border-0 shadow-sm mb-4 text-white overflow-hidden">
        <div className="card-body p-3 p-sm-4 p-md-5">
          <div className="row align-items-center">
            <div className="col-12 col-md-auto text-center text-md-left mb-3 mb-md-0">
              {hasAvatar ? (
                <img
                  className="profile-detail-avatar rounded-circle mx-auto d-block mx-md-0"
                  src={profile.user.avatar}
                  alt={displayName}
                />
              ) : (
                <div
                  className="profile-detail-avatar profile-detail-avatar-placeholder rounded-circle d-flex align-items-center justify-content-center mx-auto mx-md-0"
                  aria-hidden="true"
                >
                  {initial}
                </div>
              )}
            </div>
            <div className="col-12 col-md text-center text-md-left">
              <h1 className="profile-detail-name font-weight-bold mb-2">{displayName}</h1>
              <p className="mb-2 profile-header-lead">
                <span className="font-weight-normal">{profile.status}</span>
                {!isEmpty(profile.company) && (
                  <span className="font-weight-light">
                    {" "}
                    <span className="opacity-75">·</span> {profile.company}
                  </span>
                )}
              </p>
              {!isEmpty(profile.location) && (
                <p className="mb-3 small profile-header-meta">
                  <i className="fas fa-map-marker-alt mr-2" aria-hidden="true" />
                  {profile.location}
                </p>
              )}
              <div className="profile-social-row d-flex flex-wrap justify-content-center justify-content-md-start">
                {social(profile.website, "fas fa-globe", "Website")}
                {social(
                  profile.social && profile.social.twitter,
                  "fab fa-twitter",
                  "Twitter"
                )}
                {social(
                  profile.social && profile.social.facebook,
                  "fab fa-facebook-f",
                  "Facebook"
                )}
                {social(
                  profile.social && profile.social.linkedin,
                  "fab fa-linkedin-in",
                  "LinkedIn"
                )}
                {social(
                  profile.social && profile.social.youtube,
                  "fab fa-youtube",
                  "YouTube"
                )}
                {social(
                  profile.social && profile.social.instagram,
                  "fab fa-instagram",
                  "Instagram"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
