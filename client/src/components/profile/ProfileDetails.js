import React, { Component } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

class ProfileDetails extends Component {
  render() {
    const { experience, education, loading } = this.props;

    // Защити срещу липсващи пропсове
    if (loading || !experience || !education) {
      return <h1>Loading profile details...</h1>;
    }

    const expItems = experience.map((exp) => (
      <li key={exp._id} className="list-group-item">
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </p>
        <p>
          <strong>Position:</strong> {exp.title}
        </p>
        {exp.location && (
          <p>
            <strong>Location:</strong> {exp.location}
          </p>
        )}
        {exp.description && (
          <p>
            <strong>Description:</strong> {exp.description}
          </p>
        )}
      </li>
    ));

    const eduItems = education.map((edu) => (
      <li key={edu._id} className="list-group-item">
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.to === null ? (
            "Now"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </p>
        <p>
          <strong>Degree:</strong> {edu.degree}
        </p>
        <p>
          <strong>Field Of Study:</strong> {edu.fieldofstudy}
        </p>
        {edu.description && (
          <p>
            <strong>Description:</strong> {edu.description}
          </p>
        )}
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {expItems.length > 0 ? (
            <ul className="list-group">{expItems}</ul>
          ) : (
            <p className="text-center">No Experience</p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {eduItems.length > 0 ? (
            <ul className="list-group">{eduItems}</ul>
          ) : (
            <p className="text-center">No Education</p>
          )}
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
