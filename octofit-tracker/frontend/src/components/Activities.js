import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data received:', data);
        
        // Handle both paginated and plain array responses
        const activitiesData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed activities:', activitiesData);
        
        setActivities(activitiesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading activities...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Activities</h5>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">📊 Activities</h2>
        <span className="badge bg-primary">{activities.length} total</span>
      </div>

      {activities.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Activity Name</th>
                <th scope="col">Description</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <strong>{activity.name}</strong>
                  </td>
                  <td>{activity.description || <em className="text-muted">No description</em>}</td>
                  <td>
                    <span className="badge bg-info">{activity.duration || 0}</span>
                  </td>
                  <td>{activity.date || <em className="text-muted">Not set</em>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          <h5>No Activities Found</h5>
          <p className="mb-0">Start by creating your first activity!</p>
        </div>
      )}
    </div>
  );
}

export default Activities;
