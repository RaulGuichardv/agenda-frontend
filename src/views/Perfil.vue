<template>
  <section class="card">
    <h2>Perfil</h2>
    <div v-if="user">
      <p><strong>Usuario:</strong> {{ user.nombre_de_usuario }}</p>
      <p><strong>Registrado:</strong> {{ user.fecha_registro }}</p>
    </div>
    <p v-else>Cargando...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiFetch } from '../services/api';
import { useAuthStore } from '../stores/auth';

const auth = useAuthStore();
const user = ref(null);

async function load() {
  try {
    const res = await apiFetch('/perfil.php');
    user.value = res.user;
    auth.setUser(res.user);
    auth.persist();
  } catch (e) {
    console.error(e);
  }
}

onMounted(load);
</script>
