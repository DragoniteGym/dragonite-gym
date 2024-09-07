export const logout = async () => {
    try {
        // Call the backend logout endpoint
        const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, 
            },
        });

        if (response.ok) {
            // Clear token from localStorage
            localStorage.removeItem('token');
            console.log('Logout successful');
        } else {
            console.error('Logout failed:', response.statusText);
        }
    } catch (error) {
        console.error('Error during logout:', error);
    }
};
