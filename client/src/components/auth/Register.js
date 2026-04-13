import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
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
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="auth-page py-3 py-md-5">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-md-10 col-lg-7 col-xl-6 px-0 px-sm-1">
            <div className="card border-0 shadow-sm auth-card">
              <div className="card-body p-3 p-md-4">
                <h1 className="auth-page-title text-center mb-2">Create account</h1>
                <p className="text-muted text-center small mb-3">
                  Join DevExperience — profile, posts, and community.
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    label="Name"
                    placeholder="Your name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                    autoComplete="name"
                    controlSize="sm"
                  />
                  <TextFieldGroup
                    label="Email"
                    placeholder="you@example.com"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    info="Gravatar is used for your avatar if your email has one."
                    autoComplete="email"
                    controlSize="sm"
                  />
                  <TextFieldGroup
                    label="Password"
                    placeholder="Min. 6 characters"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
                    autoComplete="new-password"
                    controlSize="sm"
                  />
                  <TextFieldGroup
                    label="Confirm password"
                    placeholder="Same as above"
                    name="password2"
                    type="password"
                    value={this.state.password2}
                    onChange={this.onChange}
                    error={errors.password2}
                    autoComplete="new-password"
                    controlSize="sm"
                  />
                  <button
                    type="submit"
                    className="btn btn-info btn-block mt-2 auth-submit-btn"
                  >
                    Sign up
                  </button>
                </form>
                <p className="text-center text-muted small mb-0 mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="font-weight-medium text-info">
                    Log in
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
