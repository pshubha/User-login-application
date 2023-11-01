<template>
  <q-page-container>
    <div class="q-ma-md">
      <q-card>
      <q-card-section>
        <span class="error">{{ emptyError }}</span>
        <q-input v-model="name" label="Name" @click="validateName"/>
        <q-input v-model="email" label="Email" type="email" @click="validateEmail" />
        <span class="error">{{ emailError }}</span>
        <q-input v-model="password" label="Password" type="password" @click="validatePassword"/>
        <span class="error">{{ passwordError }}</span>
        <q-input v-model="confirmPassword" label="Confirm Password" type="password" @click="validateMatch" />
        <span class="error">{{ matchError }}</span>
      </q-card-section>
      <q-card-actions align="center">
        <q-btn @click="register" label="Register" color="primary" />
        <q-btn @click="back" label="Cancel" />
      </q-card-actions>
    </q-card>
    </div>
  </q-page-container>
  <q-dialog v-model="successDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">
          {{ successMsg }}
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="OK" color="primary" @click="back" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { ref } from 'vue'
import api from '../services/api'
import { useRouter } from 'vue-router'
import { isValidEmail, isValidPassword } from '../common/validators'

export default {
  setup () {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const emptyError = ref('')
    const emailError = ref('')
    const passwordError = ref('')
    const matchError = ref('')
    const successDialog = ref(false)
    const successMsg = ref('')
    const router = useRouter()

    const validateEmail = () => {
      emailError.value = ''
      emptyError.value = ''
    }

    const validatePassword = () => {
      passwordError.value = ''
      emptyError.value = ''
    }

    const validateMatch = () => {
      matchError.value = ''
      emptyError.value = ''
    }

    const validateName = () => {
      emptyError.value = ''
    }

    const register = async () => {
      if (!name.value || !email.value || !password.value || !confirmPassword.value) {
        emptyError.value = 'Please fill in all fields.'
        return
      }

      if (!isValidEmail(email.value)) {
        emailError.value = 'Invalid email format'
        return
      }

      if (!isValidPassword(password.value)) {
        passwordError.value = 'Password must be at least 8 characters long'
        return
      }

      if (password.value !== confirmPassword.value) {
        matchError.value = 'Passwords do not match.'
        return
      }

      try {
        const response = await api.post('/user', { name: name.value, email: email.value, password: password.value })
        if (response.status === 201) {
          successDialog.value = true
          successMsg.value = 'User Registered Successfuly'
        } else {
          router.push('/register')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const back = () => {
      router.push('/')
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      emptyError,
      emailError,
      passwordError,
      matchError,
      successDialog,
      successMsg,
      register,
      back,
      validateEmail,
      validatePassword,
      validateMatch,
      validateName
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
