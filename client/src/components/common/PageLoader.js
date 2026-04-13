import React from "react";
import PropTypes from "prop-types";

/**
 * Shared full-width loading state (spinner + message).
 * Use while async data is in flight.
 */
const PageLoader = ({ message, className }) => (
  <div
    className={`page-loader text-center py-5${className ? ` ${className}` : ""}`}
    role="status"
    aria-live="polite"
    aria-busy="true"
  >
    <i
      className="fas fa-spinner fa-spin fa-2x text-info mb-3 d-inline-block"
      aria-hidden="true"
    />
    <p className="text-muted mb-0">{message}</p>
  </div>
);

PageLoader.defaultProps = {
  message: "Loading…",
  className: ""
};

PageLoader.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string
};

export default PageLoader;
