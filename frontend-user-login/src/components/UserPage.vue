<template>
  <q-page-container>
    <q-card class="q-ma-md">
      <h5 class="title" align="center">Welcome {{ $route.query.name }}....</h5>
      <div class="heading">
        <q-btn @click="logout" class="q-ma-sm" label="Logout" color="grey" align="right"/>
      </div>
    </q-card>
  </q-page-container>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()

    const logout = () => {
      router.push('/')
    }

    return {
      logout
    }
  }
}
</script>
