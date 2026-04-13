import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  icon,
  type,
  onChange,
  controlSize
}) => {
  const sizeClass =
    controlSize === "sm"
      ? "form-control-sm"
      : controlSize === "lg"
      ? "form-control-lg"
      : "";

  return (
    <div
      className={classnames(
        "input-group",
        controlSize === "sm" ? "input-group-sm mb-2" : "mb-3"
      )}
    >
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control", sizeClass, {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  controlSize: PropTypes.oneOf(["sm", "md", "lg"])
};

InputGroup.defaultProps = {
  type: "text",
  controlSize: "lg"
};

export default InputGroup;
