import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileDetails extends Component {
  render() {
    const { experience, education } = this.props;
    const expList = Array.isArray(experience) ? experience : [];
    const eduList = Array.isArray(education) ? education : [];

    const expItems = expList.map((exp) => (
      <div key={exp._id} className="profile-timeline-card card border-0 shadow-sm mb-3">
        <div className="card-body p-3 p-md-4">
          <div className="profile-timeline-card-head mb-2">
            <h3 className="h6 font-weight-bold text-dark mb-0">{exp.title}</h3>
            <span className="small text-muted profile-timeline-dates">
              <Moment format="MMM YYYY">{exp.from}</Moment>
              {" — "}
              {exp.to === null ? (
                <span className="badge badge-info">Current</span>
              ) : (
                <Moment format="MMM YYYY">{exp.to}</Moment>
              )}
            </span>
          </div>
          <p className="text-info small font-weight-bold mb-2">{exp.company}</p>
          {exp.location && (
            <p className="small text-muted mb-2">
              <i className="fas fa-map-marker-alt mr-1" aria-hidden="true" />
              {exp.location}
            </p>
          )}
          {exp.description && (
            <p className="small text-muted mb-0 profile-exp-desc">{exp.description}</p>
          )}
        </div>
      </div>
    ));

    const eduItems = eduList.map((edu) => (
      <div key={edu._id} className="profile-timeline-card card border-0 shadow-sm mb-3">
        <div className="card-body p-3 p-md-4">
          <div className="profile-timeline-card-head mb-2">
            <h3 className="h6 font-weight-bold text-dark mb-0">{edu.school}</h3>
            <span className="small text-muted profile-timeline-dates">
              <Moment format="MMM YYYY">{edu.from}</Moment>
              {" — "}
              {edu.to === null ? (
                <span className="badge badge-info">Current</span>
              ) : (
                <Moment format="MMM YYYY">{edu.to}</Moment>
              )}
            </span>
          </div>
          <p className="small mb-1">
            <strong>{edu.degree}</strong>
            {edu.fieldofstudy && (
              <span className="text-muted"> · {edu.fieldofstudy}</span>
            )}
          </p>
          {edu.description && (
            <p className="small text-muted mb-0 mt-2">{edu.description}</p>
          )}
        </div>
      </div>
    ));

    const emptyBlock = (message) => (
      <div className="profile-empty-block text-center text-muted py-4 px-3">
        <i className="fas fa-minus-circle mb-2 d-block opacity-50" aria-hidden="true" />
        <span className="small">{message}</span>
      </div>
    );

    return (
      <div className="row">
        <div className="col-md-6 mb-4 mb-md-0">
          <h2 className="h5 font-weight-bold text-dark mb-3 profile-section-heading">
            Experience
          </h2>
          {expItems.length > 0 ? expItems : emptyBlock("No experience added yet.")}
        </div>
        <div className="col-md-6">
          <h2 className="h5 font-weight-bold text-dark mb-3 profile-section-heading">
            Education
          </h2>
          {eduItems.length > 0 ? eduItems : emptyBlock("No education added yet.")}
        </div>
      </div>
    );
  }
}

ProfileDetails.propTypes = {
  experience: PropTypes.array,
  education: PropTypes.array,
  loading: PropTypes.bool,
};

export default ProfileDetails;
