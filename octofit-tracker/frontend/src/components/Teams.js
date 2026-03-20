import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Teams data received:', data);
        
        // Handle both paginated and plain array responses
        const teamsData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed teams:', teamsData);
        
        setTeams(teamsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading teams...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Teams</h5>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">👥 Teams</h2>
        <span className="badge bg-primary">{teams.length} teams</span>
      </div>

      {teams.length > 0 ? (
        <div className="row g-4">
          {teams.map(team => (
            <div key={team.id} className="col-md-6 col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">{team.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{team.description || 'No description available'}</p>
                  <dl className="row mb-0">
                    <dt className="col-sm-6 fw-bold">Members:</dt>
                    <dd className="col-sm-6">
                      <span className="badge bg-info">{team.members_count || 0}</span>
                    </dd>
                    <dt className="col-sm-6 fw-bold">Created:</dt>
                    <dd className="col-sm-6 small">{team.created_date || 'N/A'}</dd>
                  </dl>
                </div>
                <div className="card-footer bg-light">
                  <button className="btn btn-sm btn-outline-primary w-100">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          <h5>No Teams Found</h5>
          <p className="mb-0">Create a team to get started with competitive fitness tracking!</p>
        </div>
      )}
    </div>
  );
}

export default Teams;
