<template>
  <section class="card">
    <h2>Registro</h2>
    <form @submit.prevent="onSubmit" class="form">
      <label>
        Usuario
        <input v-model="nombre_de_usuario" required />
      </label>
      <label>
        Contraseña
        <input v-model="password" type="password" required />
      </label>
      <button>Registrar</button>
      <p v-if="msg">{{ msg }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { apiFetch } from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const nombre_de_usuario = ref('');
const password = ref('');
const msg = ref('');

async function onSubmit() {
  msg.value = '';
  try {
    const res = await apiFetch('/registrar.php', {
      method: 'POST',
      body: {
        nombre_de_usuario: nombre_de_usuario.value,
        password: password.value
      }
    });
    msg.value = res.message || 'Registrado';
    setTimeout(() => router.push('/login'), 900);
  } catch (e) {
    msg.value = e.message || 'Error';
  }
}
</script>
