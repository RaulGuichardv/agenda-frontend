<template>
  <section class="card">
    <h2>Crear contacto</h2>
    <form @submit.prevent="onSubmit" class="form">
      <input v-model="nombre" placeholder="Nombre" required />
      <input v-model="apellido" placeholder="Apellido" />
      <input v-model="telefono" placeholder="Teléfono" required />
      <input v-model="email" placeholder="Email" />
      <input v-model="direccion" placeholder="Dirección" />
      <textarea v-model="notas" placeholder="Notas"></textarea>
      <button>Crear</button>
      <p v-if="msg">{{ msg }}</p>
    </form>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { apiFetch } from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const nombre = ref('');
const apellido = ref('');
const telefono = ref('');
const email = ref('');
const direccion = ref('');
const notas = ref('');
const msg = ref('');

async function onSubmit() {
  msg.value = '';
  try {
    await apiFetch('/api/contactos/crear.php', {
      method: 'POST',
      body: {
        nombre: nombre.value,
        apellido: apellido.value,
        telefono: telefono.value,
        email: email.value,
        direccion: direccion.value,
        notas: notas.value
      }
    });
    msg.value = 'Creado';
    setTimeout(() => router.push('/agenda'), 700);
  } catch (e) {
    msg.value = e.message || 'Error';
  }
}
</script>
