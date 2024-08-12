import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const Dashboard = () => {
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState(0);
  const [link, setLink] = useState('');
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/banner')
      .then(response => {
        const data = response.data;
        setDescription(data.description);
        setTimer(data.timer);
        setLink(data.link);
        setVisible(data.visible);
      })
      .catch(error => console.error(error));
  }, []);

  const handleUpdate = () => {
    setLoading(true);  // Start loading
    setMessage('');    // Clear any previous messages

    axios.post('http://localhost:5000/api/banner', {
      description,
      timer,
      link,
      visible
    })
    .then(response => {
      setLoading(false);  // Stop loading
      setMessage('Banner updated successfully!');
    })
    .catch(error => {
      setLoading(false);  // Stop loading
      setMessage('Failed to update banner. Please try again.');
    });
  };

  return (
    <div className="dashboard">
      <h2><i className="fas fa-cogs"></i> Dashboard</h2>
      <label>
        <i className="fas fa-pencil-alt"></i> Banner Description:
        <input type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <label>
        <i className="fas fa-hourglass-half"></i> Timer (seconds):
        <input type="number" value={timer} onChange={e => setTimer(e.target.value)} />
      </label>
      <label>
        <i className="fas fa-link"></i> Banner Link:
        <input type="text" value={link} onChange={e => setLink(e.target.value)} />
      </label>
      <label>
        <i className="fas fa-eye"></i> Visible:
        <input type="checkbox" checked={visible} onChange={e => setVisible(e.target.checked)} />
      </label>
      
      {/* Conditional Rendering of Spinner or Button */}
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? <div className="spinner"></div> : <><i className="fas fa-save"></i> Update Banner</>}
      </button>

      {/* Message Display */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Dashboard;
