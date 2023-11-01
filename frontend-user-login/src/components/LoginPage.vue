<template>
  <q-page-container>
  <div class="q-ma-md">
    <q-card class="q-sm">
      <q-card-section>
        <span class="error">{{ adminError }}</span>
        <q-input v-model="email" label="Email" @click="validateEmail"/>
        <span class="error">{{ emailError }}</span>
        <q-input v-model="password" label="Password" type="password" @click="validatePassword" />
        <span class="error">{{ passwordError }}</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn @click="adminLogin" label="Admin Login" color="secondary"/>
        <q-btn @click="login" label="User Login" color="primary"/>
        <q-btn @click="register" label="New Register" color="grey" />
      </q-card-actions>
    </q-card>
  </div>
  <q-dialog v-model="successDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">
          {{ successMsg }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="closeSuccessDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</q-page-container>
</template>

<script lang="ts">

import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
import { isValidEmail, isValidPassword } from '../common/validators'

export default {
  setup () {
    const email = ref('')
    const password = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const adminError = ref('')
    const successMsg = ref('')
    const router = useRouter()
    const successDialog = ref(false)
    // Rest of your setup function

    const validateEmail = () => {
      emailError.value = ''
    }

    const validatePassword = () => {
      passwordError.value = ''
    }

    const login = async () => {
      try {
        emailError.value = ''
        passwordError.value = ''

        if (!isValidEmail(email.value)) {
          emailError.value = 'Invalid email format'
          return
        }

        if (!isValidPassword(password.value)) {
          passwordError.value = 'Password must be at least 8 characters long'
          return
        }

        const response = await api.get('/user')
        const userData = response.data
        const foundUser = userData.find((user:any) => user.email === email.value && user.password === password.value)
        if (foundUser) {
          email.value = ''
          password.value = ''
          if (foundUser.status === 'active') {
            router.push({ path: '/user', query: { name: foundUser.name } })
          } else {
            successDialog.value = true
            successMsg.value = 'Account has been blocked! Please contact Admin.'
          }
        } else {
          console.log('User not found. Redirecting to register page.')
          router.push('/register')
        }
      } catch (error) {
        console.log('an error occured')
      }
    }

    const closeSuccessDialog = () => {
      successDialog.value = false
      adminError.value = ''
    }

    const adminLogin = () => {
      if (!isValidEmail(email.value)) {
        emailError.value = 'Invalid email format'
        return
      }

      if (email.value === 'admin@gmail.com' && password.value === '123') {
        router.push('/admin')
      } else {
        adminError.value = 'You are not allowed to signing as Admin'
      }
    }

    const register = () => {
      router.push('/register')
    }

    return {
      email,
      password,
      emailError,
      passwordError,
      adminError,
      successDialog,
      successMsg,
      validateEmail,
      validatePassword,
      login,
      register,
      adminLogin,
      closeSuccessDialog

    }
  }
}
</script>

<style>
.error {
  color: red;
  font-size: 14px;
}
</style>
