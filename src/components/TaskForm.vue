<template>
    <div class="task-form">
        <h3>{{ task?.id ? '📝 Edit task' : '➕ Create a new task' }}</h3>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label>Title</label>
                <input v-model="form.title" type="text" placeholder="Type title..." required />
            </div>

            <div class="form-group">
                <label>Assigned to</label>
                <select v-model="form.userId" required>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.fullName }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label>Status</label>
                <select v-model="form.status" required>
                    <option value="PENDING">Pending</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="DONE">Done</option>
                </select>
            </div>

            <div class="form-group">
                <label>Deadline</label>
                <input v-model="form.deadline" type="datetime-local" required />
            </div>

            <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                    {{ task?.id ? '💾 Update' : '✅ Add' }}
                </button>
                <button type="button" class="btn btn-secondary" @click="$emit('cancel')">❌ Cancel</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue'
import type { TaskDTO } from '@/dto/TaskDTO'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()
const users = computed(() => userStore.users)

const props = defineProps<{ task?: TaskDTO }>()
const emit = defineEmits<{
    (e: 'submit', task: TaskDTO): void
    (e: 'cancel'): void
}>()

const form = reactive<TaskDTO>({
    title: '',
    userId: 2,
    username: '',
    status: 'PENDING',
    deadline: '',
    fullName: '',
})

watch(
    () => props.task,
    (newTask) => {
        if (newTask) {
            Object.assign(form, newTask)
        } else {
            form.title = ''
            form.status = 'PENDING'
            form.deadline = ''
        }
    },
    { immediate: true }
)

const submitForm = () => {
    if (form.deadline) {
        const formattedDateTime = new Date(form.deadline).toISOString().slice(0, 19)
        form.deadline = formattedDateTime
    }
    emit('submit', { ...form })
}
</script>

<style scoped>
.task-form {
    max-width: 500px;
    margin: 20px auto;
    padding: 24px;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.task-form h3 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    font-weight: 600;
    margin-bottom: 6px;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
    border-color: #007bff;
    outline: none;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 20px;
}

.btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.3s ease;
    border: none;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-primary:hover {
    background: #0056b3;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn-secondary:hover {
    background: #5a6268;
}
</style>