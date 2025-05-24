import { ResponseDTO } from '@/dto/ResponseDTO';
import { UserDTO } from '@/dto/UserDTO'
import api from '@/services/api';
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const userUrl: string = import.meta.env.VITE_USER_API_BASE_URL;
if (!userUrl) {
    throw new Error('VITE_USER_API_BASE_URL is not defined');
}

export const useUserStore = defineStore('userStore', () => {
    const users = ref<UserDTO[]>([])
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    const fetchUsers = async () => {
        isLoading.value = true
        error.value = null
        try {
            // Giả sử bạn có API GET /api/users
            const res = (await api.get<ResponseDTO<UserDTO[]>>(`${userUrl}`)).data;
            if (res.error) throw new Error('Lỗi khi tải danh sách người dùng')
            users.value = res.data;
        }
        catch (err) {
            error.value = (err as Error).message
        }
        finally {
            isLoading.value = false
        }
    }

    // Computed helper để lấy user theo id
    const getUserById = (id: number) =>
        computed(() => users.value.find((u) => u.id === id))

    return {
        users,
        isLoading,
        error,
        fetchUsers,
        getUserById,
    }
})
