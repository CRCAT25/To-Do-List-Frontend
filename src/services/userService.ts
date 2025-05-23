import axios from 'axios';
import api from './api'
import type { UserDTO } from '../dto/UserDTO';

const USER_API = import.meta.env.VITE_USER_API_BASE_URL;
const BASE_API = import.meta.env.VITE_BASE_URL;
const authUrl = BASE_API + '/auth'

if (!USER_API) {
    throw new Error('VITE_USER_API_BASE_URL is not defined');
}
if (!BASE_API) {
    throw new Error('VITE_BASE_URL is not defined');
}

export const userService = {
    // Lấy tất cả người dùng
    async getAllUsers(): Promise<UserDTO[]> {
        return api.get(USER_API).then(res => res.data.data)
    },

    // Lấy user theo ID
    async getUserById(id: number): Promise<UserDTO> {
        return api.get(`${USER_API}/${id}`).then(res => res.data.data)
    },

    // Đăng nhập
    async login(credentials: { username: string; password: string }): Promise<{ token: string }> {
        return axios.post(`${authUrl}/login`, credentials).then(res => res.data.data);
    },

    // Đăng ký
    async register(user: UserDTO): Promise<UserDTO> {
        return axios.post(`${authUrl}/register`, user).then(res => res.data.data);
    }
};
