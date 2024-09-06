import React, { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../AuthContext';
import axios from 'axios';

const ConversationPage = () => {
  const [file, setFile] = useState(null); // State for the PDF file
  const [summary, setSummary] = useState(''); // State for the summary
  const [question, setQuestion] = useState(''); // State for user question
  const [conversation, setConversation] = useState([]); // State for storing all questions and answers
  const [error, setError] = useState('');
  const { isLoggedIn } = useContext(AuthContext); // Access isLoggedIn from AuthContext
  const qaBoxRef = useRef(null); // Reference to the Q&A box

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload_pdf', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSummary(response.data.summary);
      setError('');
    } catch (err) {
      console.error('Error uploading PDF:', err);
      setError('Error uploading PDF');
    }
  };

  const handleQuestionSubmit = async () => {
    if (!question.trim()) return; // Prevent submitting empty questions

    try {
      const response = await axios.post(
        'http://localhost:5000/api/ask_question',
        { question },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      // Add the new question and answer to the conversation
      setConversation((prevConversation) => [
        ...prevConversation,
        { question, answer: response.data.answer },
      ]);

      setQuestion(''); // Clear the input field after submission
      setError('');
    } catch (err) {
      console.error('Error asking question:', err);
      setError('Error asking question');
    }
  };

  useEffect(() => {
    if (qaBoxRef.current) {
      // Scroll to the bottom of the Q&A box
      qaBoxRef.current.scrollTop = qaBoxRef.current.scrollHeight;
    }
  }, [conversation]); // Run this effect whenever the conversation changes

  return (
    <div className="conversation-page">
      <h2>Conversation</h2>
      {!isLoggedIn ? (
        <p>Please log in to start a conversation.</p>
      ) : (
        <>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload PDF</button>

          {summary && (
            <div className="summary-box">
              <h3>Summary</h3>
              <p>{summary}</p>
            </div>
          )}

          {conversation.length > 0 && (
            <div className="qa-box" ref={qaBoxRef}>
              <h3>Questions & Answers</h3>
              {conversation.map((item, index) => (
                <div key={index} className="qa-item">
                  <p><strong>Q:</strong> {item.question}</p>
                  <p><strong>A:</strong> {item.answer}</p>
                </div>
              ))}
            </div>
          )}

          <div className="question-input-box">
            <input
              type="text"
              placeholder="Ask a question about the PDF..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button onClick={handleQuestionSubmit}>Submit Question</button>
          </div>

          {error && <p className="error">{error}</p>}
        </>
      )}
    </div>
  );
};

export default ConversationPage;
