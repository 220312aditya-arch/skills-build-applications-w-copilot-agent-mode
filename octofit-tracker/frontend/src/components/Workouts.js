import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Workouts data received:', data);
        
        // Handle both paginated and plain array responses
        const workoutsData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed workouts:', workoutsData);
        
        setWorkouts(workoutsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getDifficultyBadgeColor = (difficulty) => {
    const level = String(difficulty).toLowerCase();
    if (level === 'easy') return 'success';
    if (level === 'medium') return 'warning';
    if (level === 'hard') return 'danger';
    return 'secondary';
  };

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading workouts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Workouts</h5>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">💪 Workouts</h2>
        <span className="badge bg-primary">{workouts.length} workouts</span>
      </div>

      {workouts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Workout Name</th>
                <th scope="col">Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, index) => (
                <tr key={workout.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <strong>{workout.name}</strong>
                  </td>
                  <td>
                    <span className="badge bg-info">{workout.type || 'General'}</span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">{workout.duration || 0} min</span>
                  </td>
                  <td>
                    <span className={`badge bg-${getDifficultyBadgeColor(workout.difficulty)}`}>
                      {workout.difficulty || 'Unknown'}
                    </span>
                  </td>
                  <td>{workout.description || <em className="text-muted">No description</em>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          <h5>No Workouts Found</h5>
          <p className="mb-0">Add your first workout to get started!</p>
        </div>
      )}
    </div>
  );
}

export default Workouts;
