import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItem from './ProfileItem';
import PageLoader from '../common/PageLoader';
import { getProfiles } from '../../actions/profileActions';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles } = this.props.profile;
    let profileItems;
    

    if (profiles === null) {
      profileItems = <PageLoader message="Loading profiles…" />;
    } else if (profiles.length > 0) {
      profileItems = profiles.map((profile) => (
        <ProfileItem key={profile._id} profile={profile} />
      ));
    } else {
      profileItems = (
        <div className="profiles-empty text-center py-5">
          <i className="fas fa-users fa-3x text-muted mb-3" aria-hidden="true" />
          <h2 className="h4 text-muted">No profiles yet</h2>
          <p className="text-muted small mb-0">
            Be the first to create a developer profile.
          </p>
        </div>
      );
    }

    return (
      <div className="profiles-page py-3 py-md-4">
        <header className="text-center mb-3 mb-md-5 px-1">
          <h1 className="profiles-page-title">Developer profiles</h1>
          <p className="text-muted mb-0 profiles-page-sub">
            Browse developers in the community
          </p>
          {profiles && profiles.length > 0 && (
            <p className="small text-muted mt-2 mb-0">
              {profiles.length} {profiles.length === 1 ? "profile" : "profiles"}
            </p>
          )}
        </header>
        <div className="row justify-content-center mx-0">
          <div className="col-12 col-lg-10 px-0 px-sm-1">{profileItems}</div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
