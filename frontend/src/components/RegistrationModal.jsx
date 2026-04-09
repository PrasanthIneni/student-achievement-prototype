import { useState } from 'react'
import { X, ClipboardCheck, Building2, User, HelpCircle } from 'lucide-react'

export default function RegistrationModal({ isOpen, onClose, onRegister, activityName }) {
    const [formData, setFormData] = useState({
        residenceType: 'Hosteller',
        branch: 'CSE',
        certificateName: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onRegister(formData)
    }

    if (!isOpen) return null

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(3, 7, 18, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
        }} className="fade-in">
            <div className="card glass" style={{ width: '100%', maxWidth: '500px', padding: 0 }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', background: 'none', WebkitTextFillColor: 'initial' }}>Register for Activity</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{activityName}</p>
                    </div>
                    <button className="btn" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)' }} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                            <Building2 size={16} style={{ color: 'var(--primary)' }} />
                            Residence Type
                        </label>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {['Hosteller', 'Day Scholar'].map(type => (
                                <label key={type} style={{
                                    flex: 1,
                                    padding: '1rem',
                                    borderRadius: 'var(--radius-md)',
                                    border: `1px solid ${formData.residenceType === type ? 'var(--primary)' : 'var(--border)'}`,
                                    background: formData.residenceType === type ? 'rgba(129, 140, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                    transition: 'all 0.2s',
                                    fontSize: '0.9375rem',
                                    fontWeight: '500'
                                }}>
                                    <input
                                        type="radio"
                                        name="residenceType"
                                        value={type}
                                        checked={formData.residenceType === type}
                                        onChange={handleChange}
                                        style={{ display: 'none' }}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                            <HelpCircle size={16} style={{ color: 'var(--primary)' }} />
                            Branch / Department
                        </label>
                        <select className="input" name="branch" value={formData.branch} onChange={handleChange} style={{ appearance: 'none' }}>
                            <option value="CSE">Computer Science (CSE)</option>
                            <option value="ECE">Electronics (ECE)</option>
                            <option value="EEE">Electrical (EEE)</option>
                            <option value="MECH">Mechanical (MECH)</option>
                            <option value="CIVIL">Civil (CIVIL)</option>
                            <option value="AI&ML">AI & Machine Learning</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '2.5rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                            <User size={16} style={{ color: 'var(--primary)' }} />
                            Preferred Name for Certificate
                        </label>
                        <input
                            className="input"
                            name="certificateName"
                            type="text"
                            placeholder="e.g. John Doe"
                            required
                            value={formData.certificateName}
                            onChange={handleChange}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '-0.75rem' }}>This name will be printed on your final participation certificate.</p>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }} onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                            <ClipboardCheck size={20} />
                            Confirm & Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
