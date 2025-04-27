import React, { useState } from 'react';
import "../../Styles/discussion.css"
export default function Evenement() {
  const Message = ({ content }) => (
    <div className="message border-bottom pb-2">{content}</div>
  );

  const Discussion = ({ discussion }) => {
    const [showMessages, setShowMessages] = useState(false);
    const [messages, setMessages] = useState(discussion.messages);
    const [newMessage, setNewMessage] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const toggleMessages = () => {
      setShowMessages(!showMessages);
    };

    const toggleAddForm = () => {
      setShowAddForm(!showAddForm);
    };

    const handleAddMessage = () => {
      if (newMessage.trim() !== '') {
        setMessages([...messages, newMessage]);
        setNewMessage('');
        setShowAddForm(false);
      }
    };

    return (
      <div className="discussion-card card mb-3">
        <div className="card-body">
          <h5 className="card-title">{discussion.title}</h5>
          <p className="card-text">
            <strong>Messages:</strong> {messages.length}
          </p>

          <button className="btn btn-primary btn-sm me-2" onClick={toggleMessages}>
            {showMessages ? 'Hide Messages' : 'Show Messages'}
          </button>
          <button className="btn btn-success btn-sm" onClick={toggleAddForm}>
            Add Message
          </button>

          {showMessages && (
            <div className="messages-section mt-3">
              {messages.map((msg, index) => (
                <Message key={index} content={msg} />
              ))}
            </div>
          )}

          {showAddForm && (
            <div className="add-message-form mt-3">
              <textarea
                className="form-control mb-2"
                rows="2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="btn btn-sm btn-outline-primary" onClick={handleAddMessage}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Example discussion data
  const discussionData = {
    title: 'Upcoming Event Discussion',
    messages: ['Are we meeting at 10AM?', 'Don’t forget the banner!']
  };

  return ( <>
    <div className="container mt-4">
      <h2>Event Discussions</h2>
      <Discussion discussion={discussionData} />
    </div>
    <div className="container mt-4">
    <h2>Event Discussions</h2>
    <Discussion discussion={discussionData} />
  </div>
  <div className="container mt-4">
    <h2>Event Discussions</h2>
    <Discussion discussion={discussionData} />
  </div>

  <div className="container mt-4">
    <h2>Event Discussions</h2>
    <Discussion discussion={discussionData} />
  </div>

  <div className="container mt-4">
    <h2>Event Discussions</h2>
    <Discussion discussion={discussionData} />
  </div>
  </>
  );
}
