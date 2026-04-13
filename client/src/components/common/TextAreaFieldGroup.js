import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldGroup = ({
  name,
  placeholder,
  value,
  error,
  info,
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
      className={classnames("form-group", controlSize === "sm" ? "mb-2" : "mb-3")}
    >
      <textarea
        className={classnames("form-control", sizeClass, {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted d-block mt-1">{info}</small>}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  controlSize: PropTypes.oneOf(["sm", "md", "lg"])
};

TextAreaFieldGroup.defaultProps = {
  controlSize: "lg"
};

export default TextAreaFieldGroup;
