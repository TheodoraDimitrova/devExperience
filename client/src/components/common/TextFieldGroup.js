import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled,
  autoComplete,
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
      {label ? (
        <label
          htmlFor={name}
          className={classnames("d-block mb-1 font-weight-bold text-secondary", {
            small: controlSize === "sm"
          })}
        >
          {label}
        </label>
      ) : null}
      <input
        id={name}
        type={type}
        className={classnames("form-control", sizeClass, {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
      />
      {info && <small className="form-text text-muted d-block mt-1">{info}</small>}
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  autoComplete: PropTypes.string,
  /** sm = compact (auth), lg = large (profile forms), md = default Bootstrap height */
  controlSize: PropTypes.oneOf(["sm", "md", "lg"])
};

TextFieldGroup.defaultProps = {
  type: "text",
  controlSize: "lg"
};

export default TextFieldGroup;