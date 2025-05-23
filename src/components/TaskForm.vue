<template>
    <div class="task-form">
        <h3>{{ task?.id ? 'Cập nhật công việc' : 'Tạo công việc mới' }}</h3>
        <form @submit.prevent="submitForm">
            <div>
                <label>Tiêu đề công việc:</label>
                <input v-model="form.title" type="text" required />
            </div>

            <div>
                <label>Trạng thái:</label>
                <select v-model="form.status">
                    <option value="PENDING">Chưa bắt đầu</option>
                    <option value="IN_PROGRESS">Đang thực hiện</option>
                    <option value="DONE">Hoàn thành</option>
                </select>
            </div>

            <div>
                <label>Hạn chót:</label>
                <input v-model="form.deadline" type="date" required />
            </div>

            <!-- Nếu bạn có danh sách user thì có thể thêm input chọn user ở đây -->

            <div class="form-actions">
                <button type="submit">{{ task?.id ? 'Cập nhật' : 'Thêm mới' }}</button>
                <button type="button" @click="$emit('cancel')">Huỷ</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, watch, toRefs } from 'vue'
import type { TaskDTO } from '@/dto/TaskDTO'

const props = defineProps<{
    task?: TaskDTO
}>()

const emit = defineEmits<{
    (e: 'submit', task: TaskDTO): void
    (e: 'cancel'): void
}>()

// Dữ liệu mặc định cho form
const form = reactive<TaskDTO>({
    title: '',
    userId: 2,
    username: '',
    status: 0,
    statusName: '',
    deadline: ''
})

// Khi nhận props.task thì đổ vào form
watch(
    () => props.task,
    (newTask) => {
        if (newTask) {
            Object.assign(form, newTask)
        } else {
            // reset nếu là tạo mới
            form.title = ''
            form.status = 0
            form.deadline = ''
        }
    },
    { immediate: true }
)

const submitForm = () => {
    if(form.deadline){
        const formattedDateTime = new Date(form.deadline).toISOString().slice(0, 19); // "2025-05-23T00:00:00"
        form.deadline = formattedDateTime;
    }

    emit('submit', { ...form })
}
</script>

<style scoped>
.task-form {
    margin-top: 20px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

.task-form label {
    display: block;
    margin: 8px 0 4px;
}

.task-form input,
.task-form select {
    width: 100%;
    padding: 6px;
    margin-bottom: 12px;
}

.form-actions {
    display: flex;
    gap: 10px;
}
</style>