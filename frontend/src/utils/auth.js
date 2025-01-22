export function getToken() {
  return localStorage.getItem('token'); // Directly return the token from localStorage
}

export function setToken(userToken) {
  localStorage.setItem('token', userToken);
}
