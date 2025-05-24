<template>
    <div class="task-view">
        <h1>🗂️ TO DO LIST BY DO QUOC THANH</h1>

        <div class="top-actions">
            <button v-if="!showForm" class="btn-add" @click="showForm = true">
                ➕ Add a new task
            </button>
            <button v-else class="btn-cancel" @click="cancelEdit">
                ❌ Close
            </button>
        </div>

        <transition name="fade">
            <TaskForm v-if="showForm" :task="editingTask" @submit="onSubmitTask" @cancel="cancelEdit" />
        </transition>

        <hr />

        <TaskList :tasks="tasks" @edit="onEditTask" @delete="deleteTask" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/store/taskStore'
import { useUserStore } from '@/store/userStore'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'
import type { TaskDTO } from '@/dto/TaskDTO'

const taskStore = useTaskStore()
const userStore = useUserStore()
const tasks = ref<TaskDTO[]>([])
const showForm = ref(false)
const editingTask = ref<TaskDTO | undefined>()

onMounted(async () => {
  await Promise.all([
    taskStore.fetchTasks(),
    userStore.fetchUsers()
  ])
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
    max-width: 800px;
    margin: 0 auto;
    padding: 24px;
    background-color: #fefefe;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h1 {
    font-size: 26px;
    text-align: center;
    margin-bottom: 20px;
}

.top-actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.btn-add,
.btn-cancel {
    padding: 8px 14px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

.btn-add {
    background-color: #2ecc71;
    color: white;
}

.btn-cancel {
    background-color: #e74c3c;
    color: white;
}

hr {
    margin: 20px 0;
    border: 1px solid #ddd;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>