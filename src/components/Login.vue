<template>
    <div class="login">
        <h2>Login</h2>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="username">Username:</label>
                <input v-model="username" type="text" id="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input v-model="password" type="password" id="password" required />
            </div>
            <button type="submit">Login</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/authStore' // tuỳ theo cấu trúc dự án

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const userStore = useAuthStore()

const handleLogin = async () => {
    try {
        await userStore.login({ username: username.value, password: password.value })
        router.push('/') // chuyển hướng sau khi đăng nhập thành công
    } catch (err: any) {
        error.value = err.response?.data?.message || 'Login failed'
    }
}
</script>

<style scoped>
.error {
    color: red;
}
</style>