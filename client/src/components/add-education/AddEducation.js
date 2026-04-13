import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      current: false,
      description: '',
      errors: {},
      disabled: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(eduData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onCheck(e) {
    this.setState({
      disabled: !this.state.disabled,
      current: !this.state.current
    });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="profile-form-page py-3 py-md-4 add-education">
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-lg-10 col-xl-8 px-0 px-sm-1">
            <div className="card border-0 shadow-sm profile-form-card">
              <div className="card-body p-3 p-md-4">
                <Link
                  to="/dashboard"
                  className="btn btn-outline-secondary btn-sm mb-3"
                >
                  ← Back to dashboard
                </Link>
                <h1 className="profile-form-title text-center mb-2">
                  Add education
                </h1>
                <p className="text-muted text-center small mb-3">
                  Add a school, university, or course you have attended. Fields
                  marked * are required.
                </p>
                <form noValidate onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* School"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    error={errors.school}
                    controlSize="sm"
                  />
                  <TextFieldGroup
                    placeholder="* Degree or Certification"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                    controlSize="sm"
                  />
                  <TextFieldGroup
                    placeholder="* Field of Study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
                    onChange={this.onChange}
                    error={errors.fieldofstudy}
                    controlSize="sm"
                  />
                  <span className="small font-weight-bold text-secondary d-block mb-1">
                    From date
                  </span>
                  <TextFieldGroup
                    name="from"
                    type="date"
                    value={this.state.from}
                    onChange={this.onChange}
                    error={errors.from}
                    controlSize="sm"
                  />
                  <span className="small font-weight-bold text-secondary d-block mb-1">
                    To date
                  </span>
                  <TextFieldGroup
                    name="to"
                    type="date"
                    value={this.state.to}
                    onChange={this.onChange}
                    error={errors.to}
                    disabled={this.state.disabled}
                    controlSize="sm"
                  />
                  <div className="form-check mb-3">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name="current"
                      value={this.state.current}
                      checked={this.state.current}
                      onChange={this.onCheck}
                      id="edu-current"
                    />
                    <label htmlFor="edu-current" className="form-check-label small">
                      Currently studying here
                    </label>
                  </div>
                  <TextAreaFieldGroup
                    placeholder="Program Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about the program you were in"
                    controlSize="sm"
                  />
                  <button
                    type="submit"
                    className="btn btn-info btn-block profile-form-submit mt-3"
                  >
                    Add education
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
