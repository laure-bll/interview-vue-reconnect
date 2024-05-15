// ____________________ External _________________________

// Avatars
export const avatarEndpoint = "https://api.dicebear.com/8.x/avataaars/svg";
export const avatarOptions = "&backgroundType=gradientLinear&mouth=smile";

// ____________________ External _________________________

export const backendUrl = "http://localhost:8000/api";

// Authentification
export const loginEndpoint = `${backendUrl}/token/authentication`;
export const logoutEndpoint = `${backendUrl}/token/invalidate`;
export const refreshLoginEndpoint = `${backendUrl}/token/refresh`;

// Bénéficiaires
export const beneficiariesEndpoint = `${backendUrl}/beneficiaries`;

// User
export const usersEndpoint = `${backendUrl}/users`;
