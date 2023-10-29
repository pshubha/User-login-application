<template>
  <q-page-container>
  <div class="">
    <q-input v-model="email" label="Email" />
    <q-input v-model="password" label="Password" type="password" />
    <q-btn label="Login" />
  </div>
</q-page-container>
</template>

<script>
// import api from 'src/services/api';
import { ref } from 'vue'
// import { useRoute } from 'vue-router'

export default {
  setup () {
    const email = ref('')
    const password = ref('')

    // Rest of your setup function

    return {
      email,
      password
      // Other properties and functions
    }
  }
}

// export default {
//   setup() {
//     const email = ref('')
//     const password = ref('');
//     const route = useRoute();

//     const login = async () => {
//       try {
//         const response = await api.post('/login', { email: email.value, password: password.value });
//         if (response.data.success) {
//           // Successful login, redirect to the user's dashboard or home page
//         } else {
//           // Redirect to the registration page
//           route.push('/register');
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     return {
//       email,
//       password,
//       login
//     };
//   }
// };
</script>
