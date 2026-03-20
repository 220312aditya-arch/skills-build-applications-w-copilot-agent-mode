import React, { useState, useEffect } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Leaderboard data received:', data);
        
        // Handle both paginated and plain array responses
        const leaderboardData = data.results ? data.results : (Array.isArray(data) ? data : []);
        console.log('Processed leaderboard:', leaderboardData);
        
        setLeaderboard(leaderboardData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="alert alert-info d-flex align-items-center" role="alert">
        <div className="spinner-border me-2" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h5 className="alert-heading">Error Loading Leaderboard</h5>
        <p className="mb-0">{error}</p>
      </div>
    );
  }

  const getMedalEmoji = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `${rank + 1}️⃣`;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="m-0">🏆 Leaderboard</h2>
        <span className="badge bg-success">{leaderboard.length} competitors</span>
      </div>

      {leaderboard.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Score</th>
                <th scope="col">Activities</th>
                <th scope="col">Team</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.id || index} className={index < 3 ? 'table-success' : ''}>
                  <td>
                    <strong className="fs-5">{getMedalEmoji(index)}</strong>
                  </td>
                  <td>
                    <strong>{entry.user_name || entry.name || 'Unknown'}</strong>
                  </td>
                  <td>
                    <span className="badge bg-primary">{entry.score || 0}</span>
                  </td>
                  <td>
                    <span className="badge bg-info">{entry.activities_count || 0}</span>
                  </td>
                  <td>
                    {entry.team_name ? (
                      <span className="badge bg-warning text-dark">{entry.team_name}</span>
                    ) : (
                      <em className="text-muted">No team</em>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="alert alert-warning text-center" role="alert">
          <h5>No Leaderboard Data Available</h5>
          <p className="mb-0">Start completing activities to appear on the leaderboard!</p>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
