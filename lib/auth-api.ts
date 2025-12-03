// Simulated API for authentication
// In a real app, this would make actual HTTP requests

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// Simulate login API call
export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate successful login with a JWT token
  const token = `mock_jwt_token_${Date.now()}`;
  const user: User = {
    id: '1',
    email: email,
    name: email.split('@')[0],
  };

  return { token, user };
}

// Simulate fetching user session with token
export async function getUserSession(token: string): Promise<User> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Extract email from mock token or use default
  const user: User = {
    id: '1',
    email: 'user@example.com',
    name: 'Demo User',
  };

  return user;
}
