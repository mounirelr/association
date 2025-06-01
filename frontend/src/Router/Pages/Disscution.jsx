import React, { useState } from 'react';
import "../../Styles/disscution.css";
import CreateDisscutionCard from '../../Components/CreateDisscutionCard';

const initialMessages = [
  {
    id: 1,
    author: "Amine Sabri",
    content: "Let's discuss the project timeline",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    author: "Team Member",
    content: "I think we should extend the deadline by one week",
    timestamp: "1 hour ago"
  },
  {
    id: 3,
    author: "Another Member",
    content: "Here are my design mockups for review",
    timestamp: "30 minutes ago"
  }
];

const memberName = "Amine Sabri";
const discussionTitle = "Project Timeline Discussion";
const discussionDescription = "Planning the milestones for our upcoming project";

export default function Disscution() {
  const [showMessages, setShowMessages] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editedMessage, setEditedMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const handleShowMessages = () => setShowMessages(!showMessages);

  const handleEdit = (messageId, currentContent) => {
    if (isEditing === messageId) {
      // Save the edited message
      setIsEditing(null);
    } else {
      setEditedMessage(currentContent);
      setIsEditing(messageId);
    }
  };

  const handleDeleteMessage = (messageId) => {
    console.log("Delete message:", messageId);
  };

  const handleDeleteDiscussion = () => {
    console.log("Delete discussion");
  };

  const handleAddMessage = () => {
    if (newMessage.trim()) {
      console.log("Add message:", newMessage);
      setNewMessage('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="disscussion-container">
      {/* Add Discussion Section */}
      <CreateDisscutionCard />

      {/* Discussion Card */}
      <div className="disscussion-card">
        <div className="disscussion-header">
          <div className="disscussion-member-info">
            <span className="disscussion-member-avatar">
              {memberName.split(' ').map(n => n[0]).join('')}
            </span>
            <h4 className="disscussion-member">{memberName}</h4>
          </div>
        </div>

        <div className="disscussion-card-header">
          <div className="disscussion-card-info">
            <h3 className="disscussion-card-title">{discussionTitle}</h3>
            <p className="disscussion-card-description">
              {discussionDescription}
            </p>
          </div>
          <div className="disscussion-card-actions">
            <button
              className="disscussion-btn disscussion-show-btn"
              onClick={handleShowMessages}
            >
              {showMessages ? 'Hide Messages' : 'Show Messages'}
            </button>
            <button
              className="disscussion-btn disscussion-delete-btn"
              onClick={handleDeleteDiscussion}
            >
              Delete Discussion
            </button>
          </div>
        </div>

        {showMessages && (
          <>
            <div className="disscussion-add-message-btn-container">
              <button
                className="disscussion-btn disscussion-add-btn"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                {showAddForm ? 'Cancel' : 'Add Message'}
              </button>
            </div>

            {showAddForm && (
              <div className="disscussion-add-form">
                <textarea
                  className="disscussion-edit-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your message..."
                />
                <div className="disscussion-actions">
                  <button
                    className="disscussion-btn disscussion-save-btn"
                    onClick={handleAddMessage}
                  >
                    Post Message
                  </button>
                </div>
              </div>
            )}

            <div className="disscussion-messages-list">
              {initialMessages.map((msg) => (
                <div key={msg.id} className="disscussion-message-container">
                  <div className="disscussion-message-header">
                    <span className="disscussion-message-author">
                      {msg.author}
                    </span>
                    <span className="disscussion-message-time">
                      {msg.timestamp}
                    </span>
                  </div>
                  
                  {isEditing === msg.id ? (
                    <textarea
                      className="disscussion-edit-input"
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                    />
                  ) : (
                    <p className="disscussion-message">{msg.content}</p>
                  )}
                  
                  <div className="disscussion-actions">
                    <button
                      className="disscussion-btn disscussion-edit-btn"
                      onClick={() => handleEdit(msg.id, msg.content)}
                    >
                      {isEditing === msg.id ? 'Save' : 'Edit'}
                    </button>
                    <button
                      className="disscussion-btn disscussion-delete-btn"
                      onClick={() => handleDeleteMessage(msg.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}