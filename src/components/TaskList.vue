<template>
    <div class="task-list">
        <h2>📝 Tasks list</h2>
        <ul v-if="tasks.length">
            <li v-for="task in tasks" :key="task.id" class="task-item">
                <div class="task-header">
                    <strong class="task-title">{{ task.title }}</strong>
                    <span class="status" :class="statusClass(task.status)">
                        {{ task.status }}
                    </span>
                </div>

                <div class="task-meta">
                    👤 <span class="username">{{ task.username }}</span>
                    <br />
                    📅 Deadline: <span class="deadline">{{ formatDate(task.deadline) }}</span>
                </div>

                <div class="task-actions">
                    <button @click="$emit('edit', task)">✏️ Edit</button>
                    <button @click="$emit('delete', task.id)">🗑️ Delete</button>
                </div>
            </li>
        </ul>
        <p v-else>No tasks found.</p>
    </div>
</template>

<script setup lang="ts">
import type { TaskDTO } from '@/dto/TaskDTO'
defineProps<{ tasks: TaskDTO[] }>()
defineEmits(['edit', 'delete'])

function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function statusClass(status: string) {
    switch (status) {
        case 'PENDING': return 'pending'
        case 'IN_PROGRESS': return 'in-progress'
        case 'DONE': return 'done'
        default: return ''
    }
}
</script>

<style scoped>
.task-list {
    max-width: 600px;
    margin: 0 auto;
    padding: 10px;
}

.task-item {
    margin-bottom: 16px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fdfdfd;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    list-style-type: none;
}

.task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.task-title {
    font-size: 1.1rem;
}

.status {
    font-size: 0.9rem;
    padding: 2px 6px;
    border-radius: 4px;
    font-weight: 600;
}

.status.pending {
    background-color: #fff3cd;
    color: #856404;
}

.status.in-progress {
    background-color: #d1ecf1;
    color: #0c5460;
}

.status.done {
    background-color: #d4edda;
    color: #155724;
}

.task-meta {
    font-size: 0.9rem;
    margin-top: 6px;
    color: #555;
}

.task-actions {
    margin-top: 8px;
}

button {
    margin-right: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    opacity: 0.9;
}

button:first-child {
    background-color: #007bff;
    color: white;
}

button:last-child {
    background-color: #dc3545;
    color: white;
}
</style>