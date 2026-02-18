'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import '../../styles/globals.css';
import QuantumSafeIndicator from '../../components/QuantumSafeIndicator.jsx';

export default function HubPortal() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [resources, setResources] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [showNewProject, setShowNewProject] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const hubToken = localStorage.getItem('hub_token');
    const hubUser = localStorage.getItem('hub_user');

    if (!hubToken) {
      router.push('/hub/login');
      return;
    }

    try {
      setUser(JSON.parse(hubUser));
      await loadResources();
      await loadProjects();
    } catch (error) {
      console.error('Auth check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const loadResources = async () => {
    try {
      const token = localStorage.getItem('hub_token');
      const response = await fetch('/api/hub/resources', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setResources(data.resources || []);
      }
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const token = localStorage.getItem('hub_token');
      const response = await fetch('/api/hub/projects', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      const token = localStorage.getItem('hub_token');
      const response = await fetch('/api/hub/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newProjectName, description: '' }),
      });

      if (response.ok) {
        setNewProjectName('');
        setShowNewProject(false);
        await loadProjects();
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = { role: 'user', content: newMessage, timestamp: new Date() };
    setMessages([...messages, userMessage]);
    setNewMessage('');

    try {
      const token = localStorage.getItem('hub_token');
      const response = await fetch('/api/hub/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: newMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.response, timestamp: new Date() }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('hub_token');
    localStorage.removeItem('hub_user');
    router.push('/hub/login');
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>Loading Hub Portal...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="container">
      <div className="admin-container">
        <div className="admin-header">
          <div>
            <h1>Cloud Hub Portal</h1>
            <p style={{ color: 'var(--gray)', marginBottom: 0 }}>Welcome, <strong>{user.email}</strong></p>
          </div>
          <button onClick={handleLogout} className="btn btn-secondary">
            Disconnect
          </button>
        </div>

        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <QuantumSafeIndicator label="Hub Connected & Secured" />
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-md)',
          borderBottom: '1px solid var(--border)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          {['dashboard', 'resources', 'projects', 'chat'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                border: 'none',
                background: activeTab === tab ? 'var(--primary)' : 'transparent',
                color: activeTab === tab ? 'white' : 'var(--text-primary)',
                cursor: 'pointer',
                borderRadius: '6px 6px 0 0',
                fontWeight: activeTab === tab ? '600' : '400',
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="admin-content">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{resources.length}</div>
                <div className="stat-label">Knowledge Resources</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{projects.length}</div>
                <div className="stat-label">Active Projects</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">∞</div>
                <div className="stat-label">Chat Sessions</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">✓</div>
                <div className="stat-label">Workspace Sync</div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', background: 'var(--light)', borderRadius: '8px' }}>
              <h3>Hub Overview</h3>
              <p>You are now connected to the IMA Systems Cloud Hub. You have access to:</p>
              <ul>
                <li>📚 All knowledge resources and documentation</li>
                <li>🚀 Create and manage idea projects</li>
                <li>💬 Chat interface to interact with hub systems</li>
                <li>🔄 Real-time synchronization across workspaces</li>
                <li>🎯 Unified project management</li>
              </ul>
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="admin-content">
            <h3>Knowledge Resources</h3>
            {resources.length > 0 ? (
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {resources.map((resource, idx) => (
                  <div key={idx} style={{
                    padding: 'var(--spacing-lg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'white',
                  }}>
                    <h4>{resource.name}</h4>
                    <p style={{ color: 'var(--gray)', marginBottom: 'var(--spacing-sm)' }}>
                      {resource.description}
                    </p>
                    <small style={{ color: 'var(--text-tertiary)' }}>
                      Type: {resource.type} • Size: {resource.size}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--gray)' }}>No resources available yet.</p>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="admin-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <h3>Idea Projects</h3>
              <button
                onClick={() => setShowNewProject(!showNewProject)}
                className="btn btn-primary"
              >
                + New Project
              </button>
            </div>

            {showNewProject && (
              <form onSubmit={createProject} style={{
                padding: 'var(--spacing-lg)',
                background: 'var(--light)',
                borderRadius: '8px',
                marginBottom: 'var(--spacing-lg)',
              }}>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g., QueryAnalyzer Enhancement"
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  <button type="submit" className="btn btn-primary">Create</button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowNewProject(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {projects.length > 0 ? (
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {projects.map((project) => (
                  <div key={project.id} style={{
                    padding: 'var(--spacing-lg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <h4>{project.name}</h4>
                    <p style={{ color: 'var(--gray)', margin: '8px 0' }}>
                      {project.description || 'No description'}
                    </p>
                    <small style={{ color: 'var(--text-tertiary)' }}>
                      Created: {new Date(project.created_at).toLocaleDateString()}
                    </small>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--gray)' }}>No projects yet. Create one to get started!</p>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div className="admin-content" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '600px',
            background: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--spacing-lg)',
              borderBottom: '1px solid var(--border)',
              background: 'var(--light)',
            }}>
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--gray)', paddingTop: '40px' }}>
                  <p>💬 Start a conversation with the Cloud Hub</p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} style={{
                    marginBottom: 'var(--spacing-md)',
                    padding: 'var(--spacing-md)',
                    background: msg.role === 'user' ? 'var(--primary)' : 'white',
                    color: msg.role === 'user' ? 'white' : 'var(--text-primary)',
                    borderRadius: '8px',
                    maxWidth: '80%',
                    marginLeft: msg.role === 'user' ? 'auto' : '0',
                  }}>
                    {msg.content}
                  </div>
                ))
              )}
            </div>

            <form onSubmit={sendMessage} style={{
              padding: 'var(--spacing-lg)',
              display: 'flex',
              gap: 'var(--spacing-md)',
            }}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Ask something..."
                style={{
                  flex: 1,
                  padding: 'var(--spacing-md)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                }}
              />
              <button type="submit" className="btn btn-primary">
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
