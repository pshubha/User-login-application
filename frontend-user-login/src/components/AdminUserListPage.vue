<template>
  <q-page-container>
    <q-card class="q-ma-md">
      <h5 class="title" align="center">Welcome, Admin....</h5>
      <div class="heading">
        <q-input @update:model-value="searchUsers" class="search" v-model="searchQuery" label="Search by Name" />
        <q-btn @click="logout" class="q-ma-sm" label="Logout" color="grey"/>
      </div>
    <q-table
      :rows="userData"
      row-key="id"
    >
    <template v-slot:header="props">
        <q-tr :props="props">
          <q-th>
            Name
          </q-th>
          <q-th>
            Email
          </q-th>
          <q-th>
            Status
          </q-th>
          <q-th>
            Delete
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props" align="center">
          <q-td>
            {{ props.row.name }}
          </q-td>
          <q-td>
            {{ props.row.email }}
          </q-td>
          <q-td>
            <q-toggle :modelValue="isStatusActive(props.row.status)" :title=" props.row.status" @click="changeStatus(props.row)" />
          </q-td>
          <q-td>
            <q-btn color="negative" label="Delete" @click="deleteUser(props.row)" />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-card>
  </q-page-container>
  <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">
          {{ deleteMsg }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="closeDeleteDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const userData = ref([])
    const filterData = ref([])
    const deleteDialog = ref(false)
    const deleteMsg = ref('')
    const searchQuery = ref('')

    const fetchUserData = async () => {
      try {
        const response = await api.get('/user')
        filterData.value = response.data
        userData.value = response.data
      } catch (error) {
        console.error('Error fetching user data', error)
      }
    }

    const searchUsers = () => {
      const term = searchQuery.value.toLowerCase()
      if (term === '') {
        fetchUserData()
      } else {
        userData.value = filterData.value.filter((user: any) => user.name.toLowerCase().includes(term))
      }
    }

    const changeStatus = async (user : any) => {
      try {
        const response = await api.put(`/user/${user.id}`, { status: user.status === 'active' ? 'inactive' : 'active' })
        if (response.status === 202) {
          fetchUserData()
        } else {
          deleteDialog.value = true
          deleteMsg.value = 'Status Not Updated'
        }
      } catch (error) {
        console.error('Error updating user status', error)
      }
    }

    const deleteUser = async (user : any) => {
      try {
        await api.delete(`/user/${user.id}`)
        deleteDialog.value = true
        deleteMsg.value = `User ${user.name} Deleted Successfuly`
      } catch (error) {
        console.error('Error updating user status', error)
      }
    }

    const closeDeleteDialog = () => {
      fetchUserData()
      deleteDialog.value = false
    }

    const logout = () => {
      router.push('/')
    }

    const isStatusActive = (status : string) => {
      return status === 'active'
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      userData,
      deleteDialog,
      deleteMsg,
      searchQuery,
      changeStatus,
      deleteUser,
      closeDeleteDialog,
      logout,
      isStatusActive,
      searchUsers
    }
  }
}
</script>

<style>

  .title{
    margin: 20px;
  }

  .heading{
    display: flex;
    justify-content: space-between;
  }

  .search{
    margin-left: 10px;
  }
</style>
