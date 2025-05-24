<template>
    <div class="register-view">
        <h2>📝 Create a new account</h2> <br>
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label>Username</label>
                <input v-model="form.username" type="text" required />
            </div>

            <div class="form-group">
                <label>Fullname</label>
                <input v-model="form.fullname" type="text" required />
            </div>

            <div class="form-group">
                <label>Email</label>
                <input v-model="form.email" type="email" required />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="form.password" type="password" required />
            </div>

            <div class="form-group">
                <label>Re-password</label>
                <input v-model="form.confirmPassword" type="password" required />
            </div>

            <div v-if="error" class="error">{{ error }}</div>

            <button class="btn-register">✨ Register</button>

        </form>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const error = ref('')

const form = reactive({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
})

const userStore = useAuthStore()

const onSubmit = async () => {
    error.value = ''

    if (form.password !== form.confirmPassword) {
        error.value = 'Mật khẩu không khớp!'
        return
    }

    try {
        await userStore.register({
            username: form.username,
            fullname: form.fullname,
            email: form.email,
            password: form.password
        })

        // Thành công → chuyển sang trang đăng nhập
        router.push('/auth/login')
    } catch (e) {
        error.value = 'Lỗi kết nối đến server!'
    }
}
</script>

<style scoped>
.btn-register {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 242, 254, 0.3);
}

.btn-register:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 242, 254, 0.4);
}

.btn-register:active {
    transform: scale(0.98);
}

.register-view {
    max-width: 400px;
    margin: 0 auto;
    padding: 24px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
}

.error {
    color: red;
    margin-bottom: 12px;
}
</style>