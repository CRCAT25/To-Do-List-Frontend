<template>
    <div class="task-view">
        <h1>Quản lý Công việc</h1>

        <TaskForm v-if="showForm" :task="editingTask" @submit="onSubmitTask" @cancel="cancelEdit" />

        <button v-else @click="showForm = true">+ Thêm công việc</button>

        <TaskList :tasks="tasks" @edit="onEditTask" @delete="deleteTask" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'
import type { TaskDTO } from '@/dto/TaskDTO'

const taskStore = useTaskStore()
const tasks = ref<TaskDTO[]>([])
const showForm = ref(false)
const editingTask = ref<TaskDTO | undefined>()

onMounted(async () => {
    await taskStore.fetchTasks()
    tasks.value = taskStore.tasks
})

const onEditTask = (task: TaskDTO) => {
    editingTask.value = { ...task }
    showForm.value = true
}

const cancelEdit = () => {
    editingTask.value = undefined
    showForm.value = false
}

const onSubmitTask = async (task: TaskDTO) => {
    if (task.id) {
        await taskStore.updateTask(task)
    } else {
        await taskStore.addTask(task)
    }
    await taskStore.fetchTasks()
    tasks.value = taskStore.tasks
    showForm.value = false
    editingTask.value = undefined
}

const deleteTask = async (id: number) => {
    if (confirm('Bạn có chắc chắn muốn xoá công việc này?')) {
        await taskStore.deleteTask(id)
        tasks.value = taskStore.tasks
    }
}
</script>

<style scoped>
.task-view {
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
}
</style>