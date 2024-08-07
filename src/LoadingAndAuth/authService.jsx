export const getCurrentUser = async () => {
    try {
        const storedUserdata = JSON.parse(localStorage.getItem('userdata'));
        const token = storedUserdata?.token;

        if (!token) {
            console.warn('No token found');
            return null;
        }

        const response = await fetch('https://cautious-sniffle.netlify.app/.netlify/functions/api/get-user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            return { name: data.name, id: data.id, email: data.email, token: data.token };
        } else {
            console.warn('Failed to fetch current user');
            return null;
        }
    } catch (error) {
        console.error('Failed to fetch current user', error);
        return null;
    }
};
