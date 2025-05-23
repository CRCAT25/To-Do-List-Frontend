<template>
    <div class="task-list">
        <h2>Danh sách công việc</h2>
        <ul v-if="tasks.length">
            <li v-for="task in tasks" :key="task.id" class="task-item">
                <strong>{{ task.title }}</strong>
                <button @click="$emit('edit', task)">✏️</button>
                <button @click="$emit('delete', task.id)">🗑️</button>
            </li>
        </ul>
        <p v-else>Không có công việc nào.</p>
    </div>
</template>

<script setup lang="ts">
import type { TaskDTO } from '@/dto/TaskDTO'
defineProps<{ tasks: TaskDTO[] }>()
defineEmits(['edit', 'delete'])
</script>

<style scoped>
.task-item {
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

button {
    margin-left: 10px;
}
</style>