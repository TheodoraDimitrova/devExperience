import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="dashboard-actions mb-4">
      <p className="small text-uppercase text-muted font-weight-bold mb-2 dashboard-actions-label">
        Quick actions
      </p>
      <div className="row mx-n1">
        <div className="col-12 col-sm-6 col-lg-4 px-1 mb-2">
          <Link
            to="/edit-profile"
            className="btn btn-light border shadow-sm dashboard-action-btn w-100 d-flex align-items-center justify-content-center"
          >
            <i className="fas fa-user-circle text-info mr-2" aria-hidden="true" />
            Edit profile
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 px-1 mb-2">
          <Link
            to="/add-experience"
            className="btn btn-light border shadow-sm dashboard-action-btn w-100 d-flex align-items-center justify-content-center"
          >
            <i className="fab fa-black-tie text-info mr-2" aria-hidden="true" />
            Add experience
          </Link>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 px-1 mb-2">
          <Link
            to="/add-education"
            className="btn btn-light border shadow-sm dashboard-action-btn w-100 d-flex align-items-center justify-content-center"
          >
            <i
              className="fas fa-graduation-cap text-info mr-2"
              aria-hidden="true"
            />
            Add education
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileActions;
