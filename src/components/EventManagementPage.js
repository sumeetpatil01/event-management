import React, { useState, useEffect } from 'react';
import axios from '../axiosConfig';

const EventManagementPage = ({taskDetail}) => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    location: '',
    date: ''
  });
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios.get('/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  };

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEvent) {
      axios.put(`/events/${editingEvent._id}`, newEvent)
        .then(() => {
          fetchEvents();
          setNewEvent({ name: '', description: '', location: '', date: '' });
          setEditingEvent(null);
        })
        .catch(error => console.error('Error updating event:', error));
    } else {
      axios.post('/events', newEvent)
        .then(response => {
          setEvents([...events, response.data]);
          setNewEvent({ name: '', description: '', location: '', date: '' });
        })
        .catch(error => console.error('Error creating event:', error));
    }
  };

  const handleEdit = (event) => {
    setNewEvent(event);
    setEditingEvent(event);
  };

  const handleDelete = (id) => {
    axios.delete(`/events/${id}`)
      .then(() => {
        setEvents(events.filter(event => event._id !== id));
      })
      .catch(error => console.error('Error deleting event:', error));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div class="event-container">
    <h1 class="title">Event Management</h1>
    <form class="event-form" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Event Name"
        value={newEvent.name}
        onChange={handleChange}
        required
        class="input-field"
      />
      <input
        type="text"
        name="description"
        placeholder="Event Description"
        value={newEvent.description}
        onChange={handleChange}
        required
        class="input-field"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={newEvent.location}
        onChange={handleChange}
        required
        class="input-field"
      />
      <input
        type="date"
        name="date"
        value={newEvent.date}
        onChange={handleChange}
        required
        class="input-field"
      />
      <button type="submit" class="submit-btn">
        {editingEvent ? 'Update Event' : 'Create Event'}
      </button>
    </form>
    <ul class="event-list">
      {events.map(event => (
        <li key={event._id} class="event-item">
          <div class="event-details">
            <span class="event-name">{event.name}</span>
            <span class="event-description">{event.description}</span>
            <span class="event-location">{event.location}</span>
            <span class="event-date">{formatDate(event.date)}</span>
          </div>
          <div class="event-actions">
            <button onClick={() => handleEdit(event)} class="action-btn edit-btn">
              ✏️ Edit
            </button>
            <button onClick={() => handleDelete(event._id)} class="action-btn delete-btn">
              🗑️ Delete
            </button>
            <button onClick={() => taskDetail(event._id)} class="action-btn view-btn">
              👁️ View
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
  
  );
};

export default EventManagementPage;