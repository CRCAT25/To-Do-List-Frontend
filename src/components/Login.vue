<template>
    <div class="login-container">
        <div class="login-card">
            <h2>Đăng nhập</h2>
            <form @submit.prevent="handleLogin" class="login-form">
                <div class="form-group">
                    <label for="username">Tên đăng nhập</label>
                    <input v-model="username" type="text" id="username" required placeholder="Nhập tên đăng nhập" />
                </div>
                <div class="form-group">
                    <label for="password">Mật khẩu</label>
                    <input v-model="password" type="password" id="password" required placeholder="Nhập mật khẩu" />
                </div>
                <button type="submit" class="login-button">Đăng nhập</button>
                <p v-if="error" class="error">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useAuthStore()

const handleLogin = async () => {
    try {
        await userStore.login({ username: username.value, password: password.value })
        router.push('/')
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Đăng nhập thất bại'
    }
}
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    background: #f3f4f6;
}

.login-card {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.login-card h2 {
    text-align: center;
    margin-bottom: 1.5rem;
}

.login-form .form-group {
    margin-bottom: 1rem;
}

.login-form label {
    display: block;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.login-form input {
    width: 100%;
    padding: 0.6rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    transition: border-color 0.2s ease-in-out;
}

.login-form input:focus {
    outline: none;
    border-color: #3b82f6;
}

.login-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #3b82f6;
    color: white;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.login-button:hover {
    background-color: #2563eb;
}

.error {
    margin-top: 1rem;
    color: #ef4444;
    text-align: center;
}
</style>