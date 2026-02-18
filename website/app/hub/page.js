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
  const [selectedWorkspace, setSelectedWorkspace] = useState('default');
  const [showWorkspaceDropdown, setShowWorkspaceDropdown] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceMessages, setWorkspaceMessages] = useState({});
  const [workspaceNewMessage, setWorkspaceNewMessage] = useState('');

  useEffect(() => {
    console.log('Hub page mounted, calling checkAuth');
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const hubToken = localStorage.getItem('hub_token');
    const hubUser = localStorage.getItem('hub_user');
    console.log('checkAuth called, hubToken exists:', !!hubToken);

    if (!hubToken) {
      router.push('/hub/login');
      return;
    }

    try {
      setUser(JSON.parse(hubUser));
      console.log('About to call loadWorkspaces');
      await loadWorkspaces();
      await loadResources();
      await loadProjects();
      console.log('All data loaded successfully');
    } catch (error) {
      console.error('Auth check failed:', error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const loadWorkspaces = async () => {
    try {
      const token = localStorage.getItem('hub_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      console.log('Loading workspaces from:', `${apiUrl}/hub/workspaces`);
      const response = await fetch(`${apiUrl}/hub/workspaces`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      console.log('Workspace response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Workspaces loaded:', data.workspaces);
        setWorkspaces(data.workspaces || []);
        // Initialize workspace messages
        const wsMessages = {};
        data.workspaces.forEach(ws => {
          wsMessages[ws.id] = [];
        });
        setWorkspaceMessages(wsMessages);
      } else {
        console.error('Failed to load workspaces, status:', response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(`Failed to load workspaces: ${response.status}`);
      }
    } catch (error) {
      console.error('Error loading workspaces:', error);
      // Fall back to default workspaces
      const defaultWs = [
        { id: 'default', name: 'Default Workspace', icon: '🏢' },
        { id: 'research_lab', name: 'Research Lab', icon: '🔬' },
        { id: 'innovation_hub', name: 'Innovation Hub', icon: '💡' },
        { id: 'production', name: 'Production', icon: '⚙️' },
      ];
      setWorkspaces(defaultWs);
      const wsMessages = {};
      defaultWs.forEach(ws => {
        wsMessages[ws.id] = [];
      });
      setWorkspaceMessages(wsMessages);
    }
  };

  const loadResources = async () => {
    try {
      const token = localStorage.getItem('hub_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/hub/resources`, {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/hub/projects`, {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/hub/projects`, {
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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/hub/chat`, {
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

  const sendWorkspaceMessage = async (e) => {
    e.preventDefault();
    if (!workspaceNewMessage.trim()) return;

    const userMessage = { role: 'user', content: workspaceNewMessage, timestamp: new Date() };
    const currentWsMessages = workspaceMessages[selectedWorkspace] || [];
    setWorkspaceMessages({
      ...workspaceMessages,
      [selectedWorkspace]: [...currentWsMessages, userMessage]
    });
    setWorkspaceNewMessage('');

    try {
      const token = localStorage.getItem('hub_token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/hub/workspace-chat?workspace_id=${selectedWorkspace}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ message: workspaceNewMessage }),
      });

      if (response.ok) {
        const data = await response.json();
        const assistantMessage = { role: 'assistant', content: data.response, timestamp: new Date() };
        setWorkspaceMessages(prev => ({
          ...prev,
          [selectedWorkspace]: [...(prev[selectedWorkspace] || []), assistantMessage]
        }));
      }
    } catch (error) {
      console.error('Error sending workspace message:', error);
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
    <div style={{
      background: 'var(--bg-primary)',
      minHeight: '100vh',
      padding: 'var(--spacing-lg)',
      color: 'var(--text-primary)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background effects */}
      <div style={{
        position: 'fixed',
        top: '-50%',
        right: '-20%',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>
      <div style={{
        position: 'fixed',
        bottom: '-40%',
        left: '-10%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 153, 221, 0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0,
      }}></div>

      {/* Content wrapper */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--spacing-3xl)',
          paddingBottom: 'var(--spacing-xl)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{
              fontSize: 'var(--font-size-3xl)',
              fontFamily: 'var(--font-serif)',
              marginBottom: 'var(--spacing-sm)',
              color: 'var(--text-primary)',
            }}>Cloud Hub Portal</h1>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 'var(--font-size-sm)',
              margin: 0,
            }}>Welcome back, {user?.email || 'Guest'}!</p>
          </div>

          {/* Workspace Selector */}
          <div style={{
            position: 'relative',
            marginRight: 'var(--spacing-lg)',
          }}>
            <button
              onClick={() => setShowWorkspaceDropdown(!showWorkspaceDropdown)}
              style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                color: 'var(--text-primary)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-base)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {workspaces.find(w => w.id === selectedWorkspace)?.icon || '🏢'} {workspaces.find(w => w.id === selectedWorkspace)?.name || 'Select Workspace'} ▼
            </button>

            {showWorkspaceDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: 'var(--spacing-sm)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                borderRadius: 'var(--radius-md)',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
                minWidth: '220px',
                overflow: 'hidden',
              }}>
                {workspaces.map((workspace) => (
                  <button
                    key={workspace.id}
                    onClick={() => {
                      setSelectedWorkspace(workspace.id);
                      setShowWorkspaceDropdown(false);
                    }}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      background: selectedWorkspace === workspace.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                      border: 'none',
                      borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
                      color: selectedWorkspace === workspace.id ? 'var(--accent)' : 'var(--text-primary)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: selectedWorkspace === workspace.id ? '700' : '500',
                      cursor: 'pointer',
                      transition: 'all var(--transition-base)',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-md)',
                    }}
                    onMouseEnter={(e) => {
                      if (selectedWorkspace !== workspace.id) {
                        e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedWorkspace !== workspace.id) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span style={{ fontSize: '16px' }}>{workspace.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>{workspace.name}</div>
                    </div>
                    {selectedWorkspace === workspace.id && <span style={{ fontSize: '14px' }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: 'var(--spacing-md) var(--spacing-lg)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--accent)',
              background: 'transparent',
              color: 'var(--accent)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(0, 229, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
            }}
          >
            Disconnect
          </button>
        </div>

        {/* Quantum Safe Indicator */}
        <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
          <QuantumSafeIndicator />
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: 'var(--spacing-sm)',
          marginBottom: 'var(--spacing-2xl)',
          borderBottom: '1px solid rgba(0, 229, 255, 0.1)',
          overflowX: 'auto',
          paddingBottom: 'var(--spacing-md)',
        }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'resources', label: 'Resources', icon: '📚' },
            { id: 'projects', label: 'Projects', icon: '📋' },
            { id: 'chat', label: 'Chat', icon: '💬' },
            { id: 'workspace-chat', label: 'Workspace Chat', icon: '🗂️' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                background: activeTab === tab.id ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                border: 'none',
                color: activeTab === tab.id ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: activeTab === tab.id ? '600' : '400',
                transition: 'all var(--transition-base)',
                borderBottom: activeTab === tab.id ? '2px solid var(--accent)' : 'none',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
              }}
            >
              {tab.icon} {tab.label}
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
          <div>
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-2xl)', fontFamily: 'var(--font-serif)', margin: '0 0 var(--spacing-xs) 0', color: 'var(--text-primary)' }}>Knowledge Resources</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Access comprehensive documentation, guides, and reference materials for the {workspaces.find(w => w.id === selectedWorkspace)?.name}</p>
              </div>
            </div>

            {resources.length > 0 ? (
              <div style={{ display: 'grid', gap: 'var(--spacing-lg)', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
                {resources.map((resource, idx) => (
                  <div key={idx} style={{
                    padding: 'var(--spacing-xl)',
                    border: '1px solid rgba(0, 229, 255, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 229, 255, 0.2), inset 1px 1px 0 rgba(0, 229, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)', gap: 'var(--spacing-md)' }}>
                      <div style={{ fontSize: '28px' }}>
                        {resource.type === 'documentation' ? '📖' : 
                         resource.type === 'guide' ? '📘' :
                         resource.type === 'reference' ? '📑' :
                         resource.type === 'tutorial' ? '🎓' : '📚'}
                      </div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-lg)' }}>{resource.name}</h4>
                        <span style={{
                          display: 'inline-block',
                          padding: 'var(--spacing-xs) var(--spacing-sm)',
                          background: 'rgba(0, 229, 255, 0.1)',
                          border: '1px solid rgba(0, 229, 255, 0.3)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: 'var(--font-size-xs)',
                          color: 'var(--accent)',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.3px',
                        }}>
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: 'var(--spacing-md) 0', fontSize: 'var(--font-size-sm)', lineHeight: '1.6' }}>
                      {resource.description}
                    </p>
                    <div style={{ paddingTop: 'var(--spacing-md)', borderTop: '1px solid rgba(0, 229, 255, 0.1)', marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <small style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-xs)' }}>
                        📦 {resource.size}
                      </small>
                      <a href="#" style={{
                        color: 'var(--accent)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: '600',
                        textDecoration: 'none',
                        transition: 'all var(--transition-base)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                      >
                        View →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-3xl)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
              }}>
                <p style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-md)' }}>📚</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>No resources available</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>Resources will be available soon. Check back later or contact support for assistance.</p>
              </div>
            )}
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
              <div>
                <h2 style={{ fontSize: 'var(--font-size-2xl)', fontFamily: 'var(--font-serif)', margin: '0 0 var(--spacing-xs) 0', color: 'var(--text-primary)' }}>Idea Projects</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Create and manage collaborative innovation initiatives</p>
              </div>
              <button
                onClick={() => setShowNewProject(!showNewProject)}
                style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)`,
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--bg-primary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'all var(--transition-base)',
                  boxShadow: '0 4px 16px rgba(0, 229, 255, 0.2)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 8px 24px rgba(0, 229, 255, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 16px rgba(0, 229, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                + New Project
              </button>
            </div>

            {showNewProject && (
              <form onSubmit={createProject} style={{
                padding: 'var(--spacing-xl)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                border: '1px solid rgba(0, 229, 255, 0.2)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: 'var(--spacing-2xl)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 1px 1px 0 rgba(0, 229, 255, 0.1)',
              }}>
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label style={{
                    display: 'block',
                    marginBottom: 'var(--spacing-sm)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>Project Name</label>
                  <input
                    type="text"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="e.g., QueryAnalyzer Enhancement"
                    required
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(0, 229, 255, 0.2)',
                      background: 'rgba(10, 13, 26, 0.5)',
                      color: 'var(--text-primary)',
                      fontSize: 'var(--font-size-sm)',
                      transition: 'all var(--transition-base)',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'var(--accent)';
                      e.target.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                  <button type="submit" style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--bg-primary)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-base)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 4px 12px rgba(0, 229, 255, 0.3)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}
                  >Create</button>
                  <button
                    type="button"
                    onClick={() => setShowNewProject(false)}
                    style={{
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      background: 'transparent',
                      border: '1px solid rgba(0, 229, 255, 0.3)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: 'var(--font-size-sm)',
                      transition: 'all var(--transition-base)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = 'var(--accent)';
                      e.target.style.background = 'rgba(0, 229, 255, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = 'rgba(0, 229, 255, 0.3)';
                      e.target.style.background = 'transparent';
                    }}
                  >Cancel</button>
                </div>
              </form>
            )}

            {projects.length > 0 ? (
              <div style={{ display: 'grid', gap: 'var(--spacing-lg)', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
                {projects.map((project) => (
                  <div key={project.id} style={{
                    padding: 'var(--spacing-xl)',
                    border: '1px solid rgba(0, 229, 255, 0.15)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-base)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 229, 255, 0.2), inset 1px 1px 0 rgba(0, 229, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(0, 229, 255, 0.15)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 'var(--spacing-md)', gap: 'var(--spacing-md)' }}>
                      <div style={{ fontSize: '28px' }}>📋</div>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: '0 0 var(--spacing-xs) 0', color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontSize: 'var(--font-size-lg)' }}>{project.name}</h4>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: 'var(--spacing-md) 0', fontSize: 'var(--font-size-sm)', lineHeight: '1.5' }}>
                      {project.description || 'A collaborative innovation initiative to drive progress and deliver impact.'}
                    </p>
                    <div style={{ paddingTop: 'var(--spacing-md)', borderTop: '1px solid rgba(0, 229, 255, 0.1)', marginTop: 'var(--spacing-md)' }}>
                      <small style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-xs)' }}>
                        📅 Created {new Date(project.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: 'var(--spacing-3xl)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(0, 229, 255, 0.1)',
              }}>
                <p style={{ fontSize: 'var(--font-size-2xl)', marginBottom: 'var(--spacing-md)' }}>🚀</p>
                <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: 'var(--spacing-xs)' }}>No projects yet</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>Create your first project to unlock collaborative innovation.</p>
              </div>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100vh - 380px)',
            minHeight: '600px',
            background: 'transparent',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid rgba(0, 229, 255, 0.15)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 1px 1px 0 rgba(0, 229, 255, 0.1)',
          }}>
            {/* Chat Header */}
            <div style={{
              padding: 'var(--spacing-lg) var(--spacing-xl)',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
              borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-md)',
            }}>
              <span style={{ fontSize: '24px' }}>💬</span>
              <div>
                <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Cloud Hub Chat</h3>
                <p style={{ margin: '4px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>Intelligent assistant for hub navigation and tasks</p>
              </div>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: 'var(--spacing-xl)',
              background: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--spacing-lg)',
            }}>
              {messages.length === 0 ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  textAlign: 'center',
                  gap: 'var(--spacing-md)',
                }}>
                  <div style={{ fontSize: '48px', opacity: 0.6 }}>💬</div>
                  <h4 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>Start a Conversation</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', maxWidth: '280px', margin: 0 }}>
                    Ask questions about projects, resources, or get assistance navigating the Cloud Hub ecosystem.
                  </p>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}>
                    <div style={{
                      maxWidth: '70%',
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      background: msg.role === 'user' 
                        ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)' 
                        : 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                      color: msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-lg)',
                      wordWrap: 'break-word',
                      border: msg.role === 'user' ? 'none' : '1px solid rgba(0, 229, 255, 0.2)',
                      boxShadow: msg.role === 'user' 
                        ? '0 4px 12px rgba(0, 229, 255, 0.2)' 
                        : '0 4px 12px rgba(0, 0, 0, 0.3)',
                      fontSize: 'var(--font-size-sm)',
                      lineHeight: '1.5',
                    }}>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} style={{
              padding: 'var(--spacing-lg) var(--spacing-xl)',
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
              borderTop: '1px solid rgba(0, 229, 255, 0.2)',
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
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(10, 13, 26, 0.5)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'all var(--transition-base)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button type="submit" style={{
                padding: 'var(--spacing-md) var(--spacing-xl)',
                background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                color: 'var(--bg-primary)',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                transition: 'all var(--transition-base)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 16px rgba(0, 229, 255, 0.2)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0 8px 24px rgba(0, 229, 255, 0.4)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0 4px 16px rgba(0, 229, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Workspace Chat Tab */}
        {activeTab === 'workspace-chat' && (
          <div>
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
              <h2 style={{ fontSize: 'var(--font-size-2xl)', fontFamily: 'var(--font-serif)', margin: '0 0 var(--spacing-xs) 0', color: 'var(--text-primary)' }}>Workspace-Specific Chat</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)' }}>Chat within your selected workspace context</p>
            </div>

            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-xl)' }}>
              <div style={{ flex: 1 }}>
                <label style={{
                  display: 'block',
                  marginBottom: 'var(--spacing-sm)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}>Select Workspace</label>
                <select
                  value={selectedWorkspace}
                  onChange={(e) => setSelectedWorkspace(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    background: 'rgba(10, 13, 26, 0.5)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-base)',
                    cursor: 'pointer',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)';
                    e.target.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  {workspaces.map((ws) => (
                    <option key={ws.id} value={ws.id}>
                      {ws.icon} {ws.name} ({ws.members || 0} members)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100vh - 480px)',
              minHeight: '600px',
              background: 'transparent',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              border: '1px solid rgba(0, 229, 255, 0.15)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 1px 1px 0 rgba(0, 229, 255, 0.1)',
            }}>
              {/* Workspace Chat Header */}
              <div style={{
                padding: 'var(--spacing-lg) var(--spacing-xl)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderBottom: '1px solid rgba(0, 229, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-md)',
              }}>
                <span style={{ fontSize: '24px' }}>🗂️</span>
                <div>
                  <h3 style={{ margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                    {workspaces.find(w => w.id === selectedWorkspace)?.icon} {workspaces.find(w => w.id === selectedWorkspace)?.name}
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>
                    Context-aware assistance for this workspace
                  </p>
                </div>
              </div>

              {/* Workspace Messages Area */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--spacing-xl)',
                background: 'var(--bg-primary)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)',
              }}>
                {(workspaceMessages[selectedWorkspace] || []).length === 0 ? (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    textAlign: 'center',
                    gap: 'var(--spacing-md)',
                  }}>
                    <div style={{ fontSize: '48px', opacity: 0.6 }}>🗂️</div>
                    <h4 style={{ margin: '0 0 var(--spacing-sm) 0', color: 'var(--text-primary)', fontFamily: 'var(--font-serif)' }}>
                      Start Workspace Chat
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--font-size-sm)', maxWidth: '280px', margin: 0 }}>
                      Ask questions specific to the {workspaces.find(w => w.id === selectedWorkspace)?.name}. Each workspace has dedicated expertise and context.
                    </p>
                  </div>
                ) : (
                  (workspaceMessages[selectedWorkspace] || []).map((msg, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                    }}>
                      <div style={{
                        maxWidth: '70%',
                        padding: 'var(--spacing-md) var(--spacing-lg)',
                        background: msg.role === 'user' 
                          ? 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)' 
                          : 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                        color: msg.role === 'user' ? 'var(--bg-primary)' : 'var(--text-primary)',
                        borderRadius: 'var(--radius-lg)',
                        wordWrap: 'break-word',
                        border: msg.role === 'user' ? 'none' : '1px solid rgba(0, 229, 255, 0.2)',
                        boxShadow: msg.role === 'user' 
                          ? '0 4px 12px rgba(0, 229, 255, 0.2)' 
                          : '0 4px 12px rgba(0, 0, 0, 0.3)',
                        fontSize: 'var(--font-size-sm)',
                        lineHeight: '1.5',
                      }}>
                        {msg.content}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Workspace Chat Input */}
              <form onSubmit={sendWorkspaceMessage} style={{
                padding: 'var(--spacing-lg) var(--spacing-xl)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
                borderTop: '1px solid rgba(0, 229, 255, 0.2)',
                display: 'flex',
                gap: 'var(--spacing-md)',
              }}>
                <input
                  type="text"
                  value={workspaceNewMessage}
                  onChange={(e) => setWorkspaceNewMessage(e.target.value)}
                  placeholder={`Ask ${workspaces.find(w => w.id === selectedWorkspace)?.name}...`}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(10, 13, 26, 0.5)',
                    color: 'var(--text-primary)',
                    fontSize: 'var(--font-size-sm)',
                    transition: 'all var(--transition-base)',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--accent)';
                    e.target.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button type="submit" style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--bg-primary)',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'all var(--transition-base)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  boxShadow: '0 4px 16px rgba(0, 229, 255, 0.2)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = '0 8px 24px rgba(0, 229, 255, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = '0 4px 16px rgba(0, 229, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
