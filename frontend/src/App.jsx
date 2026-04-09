import { useState } from 'react'
import './index.css'
import { api } from './services/api'
import StudentPortal from './components/StudentPortal'
import AdminDashboard from './components/AdminDashboard'
import Auth from './components/Auth'
import Profile from './components/Profile'
import AnimatedBackground from './components/AnimatedBackground'

function App() {
  const [user, setUser] = useState(null)
  const [view, setView] = useState('auth')
  const [activeTab, setActiveTab] = useState('home') // 'home' or 'profile'
  const [errMsg, setErrMsg] = useState('')

  const handleAuth = async (mode, formData) => {
    try {
      setErrMsg('')
      let data;
      if (mode === 'login') {
        data = await api.auth('login', formData)
      } else {
        data = await api.auth('register', formData)
      }
      setUser(data)
      setView('app')
      setActiveTab('home')
    } catch (err) {
      let msg = 'Invalid Authentication'

      if (err.message === 'Server Unreachable') {
        msg = 'Connection Error: Is the Spring Boot backend running on port 8081?'
        console.warn('Backend server is not reachable. Falling back to offline mode for demo purposes.')

        // Dynamic fallback for the user if they just want to see the UI
        const isDefaultAdmin = formData.username.toLowerCase() === 'admin' && formData.password === 'admin'
        const isDefaultStudent = formData.username.toLowerCase() === 'student1' && formData.password === 'password'

        if (isDefaultAdmin || isDefaultStudent) {
          setUser({
            id: 999,
            username: formData.username,
            role: isDefaultAdmin ? 'ROLE_ADMIN' : 'ROLE_STUDENT',
            fullName: isDefaultAdmin ? 'Administrator (Offline)' : 'Test Student (Offline)'
          })
          setView('app')
          setActiveTab('home')
          return;
        }
      } else if (err.message === 'Invalid Credentials') {
        msg = 'Invalid Username or Password'
      } else {
        msg = `Authentication Error: ${err.message}`
      }

      setErrMsg(msg)
      alert(msg)
      console.error('Authentication Error Details:', err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setView('auth')
    setActiveTab('home')
    setErrMsg('')
  }

  return (
    <div className="container">
      <AnimatedBackground />
      {view === 'auth' ? (
        <div className="fade-in">
          <Auth onLogin={handleAuth} error={errMsg} />
        </div>
      ) : (
        <>
          <header className="header glass fade-in">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
              onClick={() => setActiveTab('home')}
            >
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.25rem',
                color: 'white',
                boxShadow: '0 4px 12px rgba(129, 140, 248, 0.4)'
              }}>A</div>
              <h1 style={{ fontSize: '1.5rem', margin: 0 }}>AstraLink</h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div
                style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: '0.125rem', cursor: 'pointer' }}
                onClick={() => setActiveTab('profile')}
              >
                <p style={{
                  fontSize: '0.9375rem',
                  fontWeight: '700',
                  color: activeTab === 'profile' ? 'var(--primary)' : 'var(--text)',
                  transition: 'color 0.2s'
                }}>
                  {user.fullName}
                </p>
                <p style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {user.role === 'ROLE_ADMIN' ? 'Administrator' : 'Student'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {activeTab !== 'home' && (
                  <button
                    className="btn"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.625rem 1.25rem', border: '1px solid var(--border)' }}
                    onClick={() => setActiveTab('home')}
                  >
                    Dashboard
                  </button>
                )}
                <button className="btn" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '0.625rem 1.25rem', border: '1px solid var(--border)' }} onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </header>

          <main className="fade-in" style={{ marginTop: '2rem' }}>
            {activeTab === 'profile' ? (
              <Profile
                user={user}
                onUpdate={(updatedUser) => setUser(updatedUser)}
                onBack={() => setActiveTab('home')}
              />
            ) : user.role === 'ROLE_ADMIN' ? (
              <AdminDashboard user={user} />
            ) : (
              <StudentPortal user={user} />
            )}
          </main>
        </>
      )}
    </div>
  )
}

export default App
