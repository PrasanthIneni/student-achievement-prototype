import { useState, useEffect } from 'react'
import { api } from '../services/api'
import RegistrationModal from './RegistrationModal'
import { MapPin, Calendar, Users, Search, Filter, Rocket, Trophy, PartyPopper, CheckCircle } from 'lucide-react'

export default function StudentPortal({ user }) {
    const [activities, setActivities] = useState([])
    const [registeredActivityIds, setRegisteredActivityIds] = useState(new Set())
    const [loading, setLoading] = useState(true)
    const [selectedActivity, setSelectedActivity] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)
            const [acts, regs] = await Promise.all([
                api.getActivities(),
                api.getUserRegistrations(user.username)
            ])
            setActivities(acts)
            setRegisteredActivityIds(new Set(regs.map(r => r.activity.id)))
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const handleRegisterClick = (activity) => {
        if (registeredActivityIds.has(activity.id)) {
            alert('Already registered')
            return
        }
        setSelectedActivity(activity)
        setIsModalOpen(true)
    }

    const handleConfirmRegistration = async (registrationDetails) => {
        try {
            await api.registerForActivity({
                student: { id: user.id },
                activity: { id: selectedActivity.id },
                ...registrationDetails
            })
            alert(`Successfully registered for ${selectedActivity.name}!`)
            setIsModalOpen(false)
            loadData() // Refresh to show new registration status
        } catch (err) {
            alert('Registration failed')
            console.error(err)
        }
    }

    const filtered = activities.filter(act =>
        act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.category.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const clubs = filtered.filter(act => act.category?.toLowerCase() === 'club')
    const sports = filtered.filter(act => act.category?.toLowerCase() === 'sport')
    const events = filtered.filter(act => act.category?.toLowerCase() === 'event')

    const SectionHeader = ({ title, icon: Icon, count }) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', marginTop: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(129, 140, 248, 0.1)', borderRadius: '10px', color: 'var(--primary)' }}>
                    <Icon size={24} />
                </div>
                <h3 style={{ fontSize: '1.75rem', margin: 0 }}>{title}</h3>
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-muted)', background: 'var(--surface)', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                {count} {title}
            </span>
        </div>
    )

    const ActivityCard = ({ act, badgeClass }) => {
        const isRegistered = registeredActivityIds.has(act.id);

        return (
            <div className="card glass fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <span className={`badge badge-${badgeClass}`}>{act.category}</span>
                    <div style={{ color: 'var(--text-muted)' }}><Users size={18} /></div>
                </div>

                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', background: 'none', WebkitTextFillColor: 'initial' }}>{act.name}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1rem', minHeight: '3rem' }}>{act.description}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                        <MapPin size={16} className="text-primary" style={{ color: 'var(--primary)' }} />
                        <span>{act.location}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
                        <Calendar size={16} style={{ color: 'var(--primary)' }} />
                        <span>Upcoming • {act.capacity} Spots</span>
                    </div>
                </div>

                <button
                    className={`btn ${isRegistered ? '' : 'btn-primary'}`}
                    style={{
                        width: '100%',
                        background: isRegistered ? 'var(--success)' : '',
                        color: isRegistered ? 'white' : '',
                        borderColor: isRegistered ? 'var(--success)' : ''
                    }}
                    onClick={() => handleRegisterClick(act)}
                >
                    <CheckCircle size={18} />
                    {isRegistered ? 'Already Registered' : 'Register Now'}
                </button>
            </div>
        )
    }

    return (
        <div className="fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', gap: '2rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                    <h2 style={{ fontSize: '3.5rem', marginBottom: '0.75rem', lineHeight: 1.1 }}>Discover <br />Opportunities</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px' }}>
                        Engage in clubs, sports, and events to build your network and enhance your skills.
                    </p>
                </div>

                <div className="glass" style={{ padding: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
                    <Search style={{ color: 'var(--text-muted)', marginLeft: '0.75rem' }} size={20} />
                    <input
                        className="input"
                        placeholder="Search activities..."
                        style={{ border: 'none', background: 'none', marginBottom: 0, padding: '0.75rem' }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="btn" style={{ background: 'var(--surface)', padding: '0.5rem' }}>
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {loading ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 0' }}>
                    <div className="btn-primary" style={{ width: '40px', height: '40px', borderRadius: '50%', marginBottom: '1rem' }}></div>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>Loading your future...</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {clubs.length > 0 && (
                        <div>
                            <SectionHeader title="Clubs" icon={Rocket} count={clubs.length} />
                            <div className="grid">
                                {clubs.map(act => <ActivityCard key={act.id} act={act} badgeClass="club" />)}
                            </div>
                        </div>
                    )}

                    {sports.length > 0 && (
                        <div>
                            <SectionHeader title="Sports" icon={Trophy} count={sports.length} />
                            <div className="grid">
                                {sports.map(act => <ActivityCard key={act.id} act={act} badgeClass="sport" />)}
                            </div>
                        </div>
                    )}

                    {events.length > 0 && (
                        <div>
                            <SectionHeader title="Events" icon={PartyPopper} count={events.length} />
                            <div className="grid">
                                {events.map(act => <ActivityCard key={act.id} act={act} badgeClass="event" />)}
                            </div>
                        </div>
                    )}

                    {filtered.length === 0 && (
                        <div className="card glass" style={{ textAlign: 'center', padding: '5rem' }}>
                            <Search size={48} style={{ color: 'var(--border)', marginBottom: '1.5rem' }} />
                            <h3 style={{ background: 'none', WebkitTextFillColor: 'initial' }}>No activities found</h3>
                            <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            )}

            <RegistrationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRegister={handleConfirmRegistration}
                activityName={selectedActivity?.name}
            />
        </div>
    )
}
