import React from 'react';
import {
    Trophy, Dumbbell, Bike, Waves,
    BookOpen, GraduationCap, Library, Pencil,
    Cpu, Globe, Database, Binary
} from 'lucide-react';

const icons = [
    // Sports
    { Icon: Trophy, color: 'rgba(244, 114, 182, 0.1)' },
    { Icon: Dumbbell, color: 'rgba(244, 114, 182, 0.08)' },
    { Icon: Bike, color: 'rgba(244, 114, 182, 0.12)' },
    { Icon: Waves, color: 'rgba(244, 114, 182, 0.09)' },
    // Books
    { Icon: BookOpen, color: 'rgba(192, 132, 252, 0.1)' },
    { Icon: GraduationCap, color: 'rgba(192, 132, 252, 0.15)' },
    { Icon: Library, color: 'rgba(192, 132, 252, 0.08)' },
    { Icon: Pencil, color: 'rgba(192, 132, 252, 0.1)' },
    // Technology
    { Icon: Cpu, color: 'rgba(129, 140, 248, 0.1)' },
    { Icon: Globe, color: 'rgba(129, 140, 248, 0.12)' },
    { Icon: Database, color: 'rgba(129, 140, 248, 0.08)' },
    { Icon: Binary, color: 'rgba(129, 140, 248, 0.15)' }
];

const AnimatedBackground = () => {
    // Create 24 background elements (2 for each icon)
    const items = Array.from({ length: 24 }).map((_, i) => ({
        id: i,
        ...icons[i % icons.length],
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.floor(Math.random() * 40) + 20, // 20px to 60px
        duration: Math.floor(Math.random() * 20) + 15, // 15s to 35s
        delay: Math.floor(Math.random() * 10) * -1 // Random starting offset
    }));

    return (
        <div className="animated-bg">
            <div className="bg-gradient-overlay"></div>
            {items.map((item) => (
                <div
                    key={item.id}
                    className="bg-floating-icon"
                    style={{
                        top: item.top,
                        left: item.left,
                        color: item.color,
                        animationDuration: `${item.duration}s`,
                        animationDelay: `${item.delay}s`
                    }}
                >
                    <item.Icon size={item.size} />
                </div>
            ))}
        </div>
    );
};

export default AnimatedBackground;
