import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:4000",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export type User = { id: string; firstName: string; lastName: string; email: string };

export const signupAPI = async (payload: { firstName: string; lastName: string; email: string, password: string }) => {
    const { data } = await api.post("/signup/signup", payload);
    return data as { token: string; user: User };
};

export const loginAPI = async (payload: { email: string, password: string }) => {
    const { data } = await api.post("/signup/login", payload);
    return data as { token: string; user: User };
};

export const profileAPI = async () => {
    const { data } = await api.get("/signup/profile")
    return data as { user: User };
}


// CRUD Operations

export const ReadUser = async () => {
    const response = await axios.get('http://localhost:4000/signup/getallusers');
    return response.data
};

export const createuser = async (firstName: string, lastName: string, email: string, password: string) => {
    const data = {
        "firstName" : firstName,
        "lastName" : lastName,
        "email" : email,
        "password" : password
    }
    const response = await axios.post('http://localhost:4000/signup/createuser', data)
    return response.data
};

