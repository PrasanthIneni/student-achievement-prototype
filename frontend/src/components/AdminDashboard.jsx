import { useState, useEffect } from 'react'
import { api } from '../services/api'
import ActivityModal from './CreateActivityModal'
import { Plus, Edit, Trash2, PieChart, Users, Calendar, Activity, Layout } from 'lucide-react'

export default function AdminDashboard() {
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingActivity, setEditingActivity] = useState(null)

    useEffect(() => {
        loadActivities()
    }, [])

    const loadActivities = async () => {
        try {
            const data = await api.getActivities()
            setActivities(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleOpenCreate = () => {
        setEditingActivity(null)
        setIsModalOpen(true)
    }

    const handleOpenEdit = (activity) => {
        setEditingActivity(activity)
        setIsModalOpen(true)
    }

    const handleSave = async (activityData) => {
        try {
            if (editingActivity) {
                await api.updateActivity(editingActivity.id, activityData)
            } else {
                await api.createActivity(activityData)
            }
            setIsModalOpen(false)
            loadActivities()
        } catch (err) {
            alert('Failed to save activity')
            console.error(err)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            await api.deleteActivity(id)
            loadActivities()
        }
    }

    const StatCard = ({ title, value, icon: Icon, color }) => (
        <div className="card glass fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{title}</p>
                    <h3 style={{ fontSize: '2.5rem', background: 'none', WebkitTextFillColor: 'initial', margin: 0 }}>{value}</h3>
                </div>
                <div style={{ padding: '0.75rem', background: `${color}15`, borderRadius: '12px', color: color }}>
                    <Icon size={24} />
                </div>
            </div>
        </div>
    )

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Dashboard</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Overview of your management activities and schedules.</p>
                </div>
                <button className="btn btn-primary" onClick={handleOpenCreate}>
                    <Plus size={20} />
                    New Activity
                </button>
            </div>

            <ActivityModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                initialData={editingActivity}
            />

            <div className="grid" style={{ marginBottom: '4rem' }}>
                <StatCard title="Total Activities" value={activities.length} icon={Activity} color="var(--primary)" />
                <StatCard title="Total Registrations" value="1,240" icon={Users} color="var(--accent)" />
                <StatCard title="Scheduled This Month" value="12" icon={Calendar} color="var(--secondary)" />
            </div>

            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Layout size={24} style={{ color: 'var(--primary)' }} />
                <h3 style={{ fontSize: '1.75rem', margin: 0 }}>Activity Records</h3>
            </div>

            <div className="glass" style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ background: 'rgba(255,255,255,0.03)' }}>
                            <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase' }}>Activity Name</th>
                            <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase' }}>Category</th>
                            <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase' }}>Capacity</th>
                            <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.875rem', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.map(act => (
                            <tr key={act.id} style={{ borderTop: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row">
                                <td style={{ padding: '1.5rem', fontWeight: '600' }}>{act.name}</td>
                                <td style={{ padding: '1.5rem' }}>
                                    <span className={`badge badge-${act.category?.toLowerCase()}`}>{act.category}</span>
                                </td>
                                <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{act.capacity} Students</td>
                                <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                        <button
                                            className="btn"
                                            style={{ background: 'rgba(255,255,255,0.05)', padding: '0.5rem', border: '1px solid var(--border)' }}
                                            onClick={() => handleOpenEdit(act)}
                                            title="Edit"
                                        >
                                            <Edit size={18} style={{ color: 'var(--primary)' }} />
                                        </button>
                                        <button
                                            className="btn"
                                            style={{ background: 'rgba(251, 113, 133, 0.1)', padding: '0.5rem', border: '1px solid rgba(251, 113, 133, 0.2)' }}
                                            onClick={() => handleDelete(act.id)}
                                            title="Delete"
                                        >
                                            <Trash2 size={18} style={{ color: 'var(--danger)' }} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .table-row:hover {
                    background: rgba(255, 255, 255, 0.02);
                }
            `}} />
        </div>
    )
}
