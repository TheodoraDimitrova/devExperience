import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      showPassword: false,
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  togglePasswordVisibility() {
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  }

  render() {
    const { errors, showPassword } = this.state;
    return (
      <div className="auth-page py-3 py-md-5">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-md-10 col-lg-7 col-xl-6 px-0 px-sm-1">
            <div className="card border-0 shadow-sm auth-card">
              <div className="card-body p-3 p-md-4">
                <h1 className="auth-page-title text-center mb-2">Log in</h1>
                <p className="text-muted text-center small mb-3">
                  Sign in to your DevExperience account.
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    label="Email"
                    placeholder="you@example.com"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    autoComplete="email"
                    controlSize="sm"
                  />
                  <div className="form-group mb-2">
                    <label
                      htmlFor="password"
                      className="d-block mb-1 font-weight-bold text-secondary small"
                    >
                      Password
                    </label>
                    <div className="input-group input-group-sm">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        autoComplete="current-password"
                      />
                      <div className="input-group-append">
                        <button
                          type="button"
                          className="btn btn-outline-secondary auth-password-toggle"
                          onClick={this.togglePasswordVisibility}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          title={showPassword ? "Hide password" : "Show password"}
                        >
                          <i
                            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                      {errors.password && (
                        <div className="invalid-feedback d-block">{errors.password}</div>
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-info btn-block mt-2 auth-submit-btn"
                  >
                    Sign in
                  </button>
                </form>
                <p className="text-center text-muted small mb-0 mt-4">
                  No account yet?{" "}
                  <Link to="/register" className="font-weight-medium text-info">
                    Create one
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
