export async function register(name, account, email, phone, password) {
    const response = await fetch('http://localhost:8000/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            account: account,
            password: password,
            email: email,
            phone_number: phone,
          }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }
    return response.json();
}

export async function login(account, password) {
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            { 
                account: account, 
                password: password
            }),
    });

    if (!response.ok) {
        throw new Error('Invalid credentials');
    }

    return response.json();
}

export async function logout() {
    const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
    return response.json();
}


export async function resetPassword(account, email, phone) {
    try {
        const response = await fetch('http://localhost:8000/reset_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            account: account,
            email: email,
            phone_number: phone,
        }),
    });
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to reset password');
        }
        return await response.json();
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }
  