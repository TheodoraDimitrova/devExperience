import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteClick(id) {
    this.props.deleteEducation(id);
  }

  render() {
    const list = Array.isArray(this.props.education)
      ? this.props.education
      : [];

    if (list.length === 0) {
      return (
        <section className="dashboard-section mb-4">
          <h2 className="h5 font-weight-bold mb-3 dashboard-section-title">
            Education
          </h2>
          <p className="text-muted small mb-0 dashboard-empty-hint">
            No education added yet. Use &quot;Add education&quot; above.
          </p>
        </section>
      );
    }

    const cards = list.map((edu) => (
      <div
        key={edu._id}
        className="card border-0 shadow-sm mb-3 dashboard-list-card"
      >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
            <div className="pr-sm-3 mb-2 mb-sm-0">
              <h3 className="h6 font-weight-bold text-dark mb-1">
                {edu.school}
              </h3>
              <p className="small mb-0">
                <strong>{edu.degree}</strong>
                {edu.fieldofstudy && (
                  <span className="text-muted"> · {edu.fieldofstudy}</span>
                )}
              </p>
            </div>
            <span className="small text-muted text-nowrap dashboard-list-dates">
              <Moment format="MMM YYYY">{edu.from}</Moment>
              {" — "}
              {edu.to === null ? (
                <span className="badge badge-info">Current</span>
              ) : (
                <Moment format="MMM YYYY">{edu.to}</Moment>
              )}
            </span>
          </div>
          {edu.description && (
            <p className="small text-muted mb-3 dashboard-list-desc">
              {edu.description}
            </p>
          )}
          <button
            type="button"
            onClick={this.onDeleteClick.bind(this, edu._id)}
            className="btn btn-sm btn-outline-danger dashboard-row-delete"
          >
            <i className="fas fa-trash-alt mr-1" aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    ));

    return (
      <section className="dashboard-section mb-4">
        <h2 className="h5 font-weight-bold mb-3 dashboard-section-title">
          Education
        </h2>
        {cards}
      </section>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired,
  education: PropTypes.array,
};

export default connect(null, { deleteEducation })(Education);
