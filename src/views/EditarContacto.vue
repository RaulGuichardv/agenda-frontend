<template>
  <section class="card">
    <h2>Editar contacto</h2>
    <form v-if="loaded" @submit.prevent="onSubmit" class="form">
      <input v-model="form.nombre" required />
      <input v-model="form.apellido" />
      <input v-model="form.telefono" required />
      <input v-model="form.email" />
      <input v-model="form.direccion" />
      <textarea v-model="form.notas"></textarea>
      <button>Guardar</button>
      <p v-if="msg">{{ msg }}</p>
    </form>
    <p v-else>Cargando...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { apiFetch } from '../services/api';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({ nombre: '', apellido: '', telefono: '', email: '', direccion: '', notas: '' });
const loaded = ref(false);
const msg = ref('');

async function load() {
  try {
    const res = await apiFetch('/api/contactos/index.php');
    const c = (res.contacts || []).find(x => String(x.id) === String(id));
    if (!c) {
      msg.value = 'No encontrado';
      return;
    }
    form.value = { ...c };
    loaded.value = true;
  } catch (e) {
    msg.value = e.message || 'Error';
  }
}

onMounted(load);

async function onSubmit() {
  try {
    await apiFetch(`/api/contactos/actualizar.php?id=${id}`, {
      method: 'PUT',
      body: form.value
    });
    msg.value = 'Actualizado';
    setTimeout(() => router.push('/agenda'), 700);
  } catch (e) {
    msg.value = e.message || 'Error';
  }
}
</script>
