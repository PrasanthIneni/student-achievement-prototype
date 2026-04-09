const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

export const api = {
    async auth(endpoint, data) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.status === 401) {
                throw new Error('Invalid Credentials');
            }

            if (!response.ok) {
                const errorMsg = await response.text();
                throw new Error(errorMsg || `Server Error: ${response.status}`);
            }

            return response.json();
        } catch (err) {
            if (err.name === 'TypeError') {
                throw new Error('Server Unreachable');
            }
            throw err;
        }
    },

    async getActivities() {
        const response = await fetch(`${API_BASE_URL}/activities`);
        if (!response.ok) throw new Error('Failed to fetch activities');
        return response.json();
    },

    async createActivity(activity) {
        const response = await fetch(`${API_BASE_URL}/activities`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity),
        });
        return response.json();
    },

    async updateActivity(id, activity) {
        const response = await fetch(`${API_BASE_URL}/activities/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity),
        });
        return response.json();
    },

    async deleteActivity(id) {
        await fetch(`${API_BASE_URL}/activities/${id}`, { method: 'DELETE' });
    },

    async registerForActivity(registration) {
        const response = await fetch(`${API_BASE_URL}/registrations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registration),
        });
        return response.json();
    },

    async getUserRegistrations(username) {
        const response = await fetch(`${API_BASE_URL}/registrations/student/${username}`);
        if (!response.ok) throw new Error(`Fetch Registrations Failed: ${response.status} ${response.statusText}`);
        return response.json();
    },

    async updateUser(id, userData) {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Profile Update Failed: ${response.status} ${response.statusText} ${errorText}`);
        }
        return response.json();
    }
};
