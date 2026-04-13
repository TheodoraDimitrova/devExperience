import React, { Component } from "react";

import PropTypes from "prop-types";

class ProfileGit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 5,
      repos: [],
    };
  }

  componentDidMount() {
    const { username } = this.props;
    const { count } = this.state;

    const url = `https://api.github.com/users/${encodeURIComponent(
      username
    )}/repos?per_page=${count}&sort=created&direction=asc`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          repos: Array.isArray(data) ? data : [],
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { repos } = this.state;

    const repoItems = repos.map((repo) => (
      <div
        key={repo.id}
        className="profile-repo-card card border-0 shadow-sm mb-2"
      >
        <div className="card-body p-3">
          <h3 className="h6 mb-1">
            <a
              href={repo.html_url}
              className="text-info font-weight-bold"
              target="_blank"
              rel="noopener noreferrer"
            >
              {repo.name}
              <i className="fas fa-external-link-alt ml-2 small" aria-hidden="true" />
            </a>
          </h3>
          {repo.description ? (
            <p className="small text-muted mb-0">{repo.description}</p>
          ) : (
            <p className="small text-muted font-italic mb-0">No description</p>
          )}
        </div>
      </div>
    ));

    return (
      <section className="profile-git-section mt-4 pt-2">
        <h2 className="h5 font-weight-bold text-dark mb-3 profile-section-heading">
          <i className="fab fa-github mr-2" aria-hidden="true" />
          Latest GitHub repos
        </h2>
        {repoItems.length > 0 ? (
          repoItems
        ) : (
          <p className="text-muted small mb-0">
            No public repositories to show (or GitHub rate limit / username).
          </p>
        )}
      </section>
    );
  }
}

ProfileGit.propTypes = {
  username: PropTypes.string.isRequired,
};

export default ProfileGit;
