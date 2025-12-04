<template>
  <section class="card">
    <h2>Login</h2>
    <form @submit.prevent="onSubmit" class="form">
      <label>
        Usuario
        <input v-model="nombre_de_usuario" required />
      </label>
      <label>
        Contraseña
        <input v-model="password" type="password" required />
      </label>
      <button type="submit">Entrar</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { apiFetch } from '../services/api';

const nombre_de_usuario = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter();
const auth = useAuthStore();

async function onSubmit() {
  error.value = null;
  try {
    const res = await apiFetch('/api/auth/login.php', {
      method: 'POST',
      body: { nombre_de_usuario: nombre_de_usuario.value, password: password.value }
    });
    auth.setToken(res.token);
    auth.persist();
    router.push('/agenda');
  } catch (e) {
    error.value = e.message || 'Error';
  }
}
</script>
