import { useState } from 'react'

export default function Auth({ onLogin, error }) {
    const [mode, setMode] = useState('login') // login, signup
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        fullName: '',
        role: 'ROLE_STUDENT'
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onLogin(mode, formData)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <div className="card glass fade-in" style={{ width: '100%', maxWidth: '440px', padding: '3rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '800',
                        fontSize: '1.75rem',
                        color: 'white',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 8px 16px rgba(129, 140, 248, 0.3)'
                    }}>A</div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                        {mode === 'login' ? 'Sign in to continue to AstraLink' : 'Join our extracurricular community'}
                    </p>
                </div>

                {error && (
                    <div className="fade-in" style={{
                        background: 'rgba(251, 113, 133, 0.1)',
                        border: '1px solid var(--danger)',
                        color: 'var(--danger)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center',
                        marginBottom: '1.5rem',
                        fontSize: '0.875rem',
                        fontWeight: '600'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {mode === 'signup' && (
                        <div style={{ marginBottom: '1.25rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)' }}>Full Name</label>
                            <input
                                className="input"
                                name="fullName"
                                type="text"
                                placeholder="Your Name"
                                required
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)' }}>Username</label>
                        <input
                            className="input"
                            name="username"
                            type="text"
                            placeholder="username"
                            required
                            value={formData.username}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)' }}>Password</label>
                        <input
                            className="input"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                    {mode === 'signup' && (
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-muted)' }}>Identity</label>
                            <select className="input" name="role" value={formData.role} onChange={handleChange} style={{ appearance: 'none' }}>
                                <option value="ROLE_STUDENT">Student</option>
                                <option value="ROLE_ADMIN">Administrator</option>
                            </select>
                        </div>
                    )}

                    <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }} type="submit">
                        {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.9375rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                        {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
                    </span>
                    <button
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            fontWeight: '700',
                            cursor: 'pointer',
                            padding: '0 0.25rem',
                            transition: 'color 0.2s'
                        }}
                        onMouseOver={(e) => e.target.style.color = 'var(--primary-hover)'}
                        onMouseOut={(e) => e.target.style.color = 'var(--primary)'}
                    >
                        {mode === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
            </div>
        </div>
    )
}
