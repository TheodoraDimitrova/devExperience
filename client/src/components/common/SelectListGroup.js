import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  onChange,
  options,
  controlSize
}) => {
  const sizeClass =
    controlSize === "sm"
      ? "form-control-sm"
      : controlSize === "lg"
      ? "form-control-lg"
      : "";

  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div
      className={classnames("form-group", controlSize === "sm" ? "mb-2" : "mb-3")}
    >
      <select
        className={classnames("form-control", sizeClass, {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted d-block mt-1">{info}</small>}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  controlSize: PropTypes.oneOf(["sm", "md", "lg"])
};

SelectListGroup.defaultProps = {
  controlSize: "lg"
};

export default SelectListGroup;
