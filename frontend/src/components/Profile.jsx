import { useState, useEffect } from 'react'
import {
    User, Hash, MapPin, Calendar, Linkedin, Phone, Mail,
    Save, Loader2, ArrowLeft, History, BookOpen, Shield,
    BookmarkCheck, Info
} from 'lucide-react'
import { api } from '../services/api'

export default function Profile({ user, onUpdate, onBack }) {
    const [profileData, setProfileData] = useState({
        fullName: user.fullName || '',
        rollNo: user.rollNo || '',
        branch: user.branch || '',
        semester: user.semester || '',
        linkedInUrl: user.linkedInUrl || '',
        mobileNumber: user.mobileNumber || '',
        email: user.email || ''
    })
    const [registrations, setRegistrations] = useState([])
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (user.role === 'ROLE_STUDENT') {
            fetchRegistrations()
        }
    }, [user])

    const fetchRegistrations = async () => {
        try {
            setLoading(true)
            const data = await api.getUserRegistrations(user.username)
            setRegistrations(data)
        } catch (err) {
            console.error('Error fetching registrations:', err)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            setSaving(true)
            setMessage('')

            // Ensure we pass the ID and all profile data
            const updatedUser = await api.updateUser(user.id, {
                ...user,
                ...profileData
            })

            onUpdate(updatedUser)
            setMessage('Profile updated successfully!')
            setTimeout(() => setMessage(''), 3000)
        } catch (err) {
            let msg = err.message || 'Failed to update profile'
            if (msg.includes('404')) {
                msg = 'Session Mismatch (404): Please log out and log in again to sync with the server.'
            }
            setMessage(`Error: ${msg}`)
        } finally {
            setSaving(false)
        }
    }

    const inputGroupStyle = { marginBottom: '1.25rem' };
    const labelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
        fontWeight: '700',
        letterSpacing: '0.05em'
    };

    const renderInput = (label, icon, key, type = "text", placeholder = "") => (
        <div style={inputGroupStyle}>
            <label style={labelStyle}>
                {icon} {label}
            </label>
            <input
                type={type}
                className="input"
                placeholder={placeholder}
                value={profileData[key]}
                onChange={(e) => setProfileData({ ...profileData, [key]: e.target.value })}
                style={{ marginBottom: 0 }}
            />
        </div>
    );

    return (
        <div className="container fade-in" style={{ maxWidth: '1200px', padding: '1rem 2rem' }}>
            <button
                onClick={onBack}
                className="btn"
                style={{ background: 'rgba(255,255,255,0.05)', marginBottom: '2rem', padding: '0.625rem 1rem' }}
            >
                <ArrowLeft size={18} />
                Back to Dashboard
            </button>

            <div className="grid" style={{ gridTemplateColumns: 'minmax(400px, 1fr) 1.5fr' }}>
                {/* Profile Card */}
                <div className="card glass" style={{ height: 'fit-content' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                            boxShadow: 'var(--shadow-glow)',
                            position: 'relative'
                        }}>
                            <User size={48} color="white" />
                        </div>
                        <h2 style={{ margin: 0 }}>{user.fullName}</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>@{user.username}</p>
                        <div className={`badge ${user.role === 'ROLE_ADMIN' ? 'badge-club' : 'badge-sport'}`} style={{ marginTop: '1rem' }}>
                            {user.role === 'ROLE_ADMIN' ? 'Administrator' : 'Student'}
                        </div>
                    </div>

                    <form onSubmit={handleUpdate}>
                        {renderInput("Full Name", <User size={14} />, "fullName")}

                        {user.role === 'ROLE_STUDENT' && (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    {renderInput("Roll No", <Hash size={14} />, "rollNo", "text", "e.g. 21CSE101")}
                                    {renderInput("Semester", <Calendar size={14} />, "semester", "text", "e.g. 6th")}
                                </div>
                                {renderInput("Branch", <MapPin size={14} />, "branch", "text", "e.g. Information Technology")}
                            </>
                        )}

                        {renderInput("Email Address", <Mail size={14} />, "email", "email")}
                        {renderInput("Mobile Number", <Phone size={14} />, "mobileNumber", "tel")}
                        {renderInput("LinkedIn URL", <Linkedin size={14} />, "linkedInUrl", "url", "https://linkedin.com/in/...")}

                        <div style={{
                            marginTop: '1.5rem',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.03)',
                            borderRadius: '12px',
                            border: '1px solid var(--border)',
                            display: 'flex',
                            gap: '0.75rem',
                            alignItems: 'start'
                        }}>
                            <Info size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }} />
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>
                                Username and security settings are managed by your administrator. Contact support to change login credentials.
                            </p>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '2rem' }} disabled={saving}>
                            {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                            {saving ? 'Updating...' : 'Update Profile'}
                        </button>

                        {message && (
                            <p style={{
                                marginTop: '1rem',
                                fontSize: '0.875rem',
                                textAlign: 'center',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                background: message.startsWith('Error') ? 'rgba(251, 113, 133, 0.1)' : 'rgba(52, 211, 153, 0.1)',
                                color: message.startsWith('Error') ? 'var(--danger)' : 'var(--success)'
                            }}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>

                {/* Dynamic Section */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {user.role === 'ROLE_STUDENT' && (
                        <div className="card glass">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                                <div style={{ padding: '0.5rem', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', color: 'var(--success)' }}>
                                    <History size={24} />
                                </div>
                                <h3 style={{ margin: 0, fontSize: '1.5rem' }}>My Participation History</h3>
                            </div>

                            {loading ? (
                                <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                                    <Loader2 className="animate-spin" size={32} color="var(--primary)" />
                                </div>
                            ) : registrations.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                                    <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.3 }} />
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>No registered activities yet.</p>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {registrations.map((reg) => (
                                        <div key={reg.id} className="glass" style={{ padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                                                <div>
                                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{reg.activity.name}</h4>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.125rem 0' }}>
                                                        {reg.branch} • {reg.residenceType}
                                                    </p>
                                                    <p style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '600' }}>
                                                        Ref: {reg.certificateName}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="badge badge-club" style={{ fontSize: '0.625rem' }}>
                                                {new Date(reg.registeredAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="card glass">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '0.5rem', background: 'rgba(192, 132, 252, 0.1)', borderRadius: '8px', color: 'var(--accent)' }}>
                                <Shield size={24} />
                            </div>
                            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>Account Security</h3>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <BookmarkCheck size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Security Level</h4>
                                <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0.5rem 0' }}>MDM-Verified</p>
                            </div>
                            <div className="glass" style={{ padding: '1.5rem', textAlign: 'center' }}>
                                <Shield size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Session Node</h4>
                                <p style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0.5rem 0' }}>{user.id ? `ID-${user.id}` : 'GUEST'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
