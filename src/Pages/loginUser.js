export const loginUser = async (email, password) => {
    const response = await fetch('https://cautious-sniffle.netlify.app/.netlify/functions/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      // Handle server errors or invalid responses
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
  
    return response.json();
  };
  