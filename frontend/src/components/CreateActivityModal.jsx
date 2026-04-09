import { useState, useEffect } from 'react'
import { X, Save, PlusCircle, Edit3, Type, FileText, Layout, MapPin, Users } from 'lucide-react'

export default function ActivityModal({ isOpen, onClose, onSave, initialData }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Club',
        location: '',
        capacity: 30
    })

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        } else {
            setFormData({
                name: '',
                description: '',
                category: 'Club',
                location: '',
                capacity: 30
            })
        }
    }, [initialData, isOpen])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave(formData)
    }

    if (!isOpen) return null

    const isEdit = !!initialData

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
            <div className="card glass" style={{ width: '100%', maxWidth: '600px', padding: 0 }}>
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ padding: '0.625rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                            {isEdit ? <Edit3 size={24} /> : <PlusCircle size={24} />}
                        </div>
                        <h3 style={{ fontSize: '1.75rem', margin: 0, background: 'none', WebkitTextFillColor: 'initial' }}>
                            {isEdit ? 'Edit Activity' : 'Create New Activity'}
                        </h3>
                    </div>
                    <button className="btn" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)' }} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                <Type size={16} style={{ color: 'var(--primary)' }} />
                                Activity Name
                            </label>
                            <input className="input" name="name" placeholder="e.g. Masterclass in React" required value={formData.name} onChange={handleChange} />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                <FileText size={16} style={{ color: 'var(--primary)' }} />
                                Description
                            </label>
                            <textarea
                                className="input"
                                name="description"
                                placeholder="Tell us more about this activity..."
                                required
                                value={formData.description}
                                onChange={handleChange}
                                style={{ minHeight: '100px', resize: 'vertical' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                <Layout size={16} style={{ color: 'var(--primary)' }} />
                                Category
                            </label>
                            <select className="input" name="category" value={formData.category} onChange={handleChange} style={{ appearance: 'none' }}>
                                <option value="Club">Club</option>
                                <option value="Sport">Sport</option>
                                <option value="Event">Event</option>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                <MapPin size={16} style={{ color: 'var(--primary)' }} />
                                Location
                            </label>
                            <input className="input" name="location" placeholder="e.g. Auditorium" required value={formData.location} onChange={handleChange} />
                        </div>

                        <div style={{ gridColumn: 'span 2' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)' }}>
                                <Users size={16} style={{ color: 'var(--primary)' }} />
                                Capacity (Max Students)
                            </label>
                            <input className="input" name="capacity" type="number" required value={formData.capacity} onChange={handleChange} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                        <button type="button" className="btn" style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)' }} onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1.5 }}>
                            <Save size={20} />
                            {isEdit ? 'Update Activity' : 'Launch Activity'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
