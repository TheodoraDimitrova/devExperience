import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const list = Array.isArray(this.props.experience)
      ? this.props.experience
      : [];

    if (list.length === 0) {
      return (
        <section className="dashboard-section mb-4">
          <h2 className="h5 font-weight-bold mb-3 dashboard-section-title">
            Experience
          </h2>
          <p className="text-muted small mb-0 dashboard-empty-hint">
            No experience added yet. Use &quot;Add experience&quot; above.
          </p>
        </section>
      );
    }

    const cards = list.map((exp) => (
      <div
        key={exp._id}
        className="card border-0 shadow-sm mb-3 dashboard-list-card"
      >
        <div className="card-body p-3 p-md-4">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start mb-2">
            <div className="pr-sm-3 mb-2 mb-sm-0">
              <h3 className="h6 font-weight-bold text-dark mb-1">
                {exp.title}
              </h3>
              <p className="text-info small font-weight-bold mb-0">
                {exp.company}
              </p>
            </div>
            <span className="small text-muted text-nowrap dashboard-list-dates">
              <Moment format="MMM YYYY">{exp.from}</Moment>
              {" — "}
              {exp.to === null ? (
                <span className="badge badge-info">Current</span>
              ) : (
                <Moment format="MMM YYYY">{exp.to}</Moment>
              )}
            </span>
          </div>
          {exp.location && (
            <p className="small text-muted mb-2">
              <i className="fas fa-map-marker-alt mr-1" aria-hidden="true" />
              {exp.location}
            </p>
          )}
          {exp.description && (
            <p className="small text-muted mb-3 dashboard-list-desc">
              {exp.description}
            </p>
          )}
          <button
            type="button"
            onClick={this.onDeleteClick.bind(this, exp._id)}
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
          Experience
        </h2>
        {cards}
      </section>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired,
  experience: PropTypes.array,
};

export default connect(null, { deleteExperience })(Experience);
