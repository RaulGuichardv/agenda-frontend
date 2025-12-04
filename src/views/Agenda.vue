<template>
  <section class="card">
    <header class="card-header">
      <h2>Mis contactos</h2>
      <router-link class="btn" to="/agenda/crear">Crear contacto</router-link>
    </header>
    <div v-if="error" class="error">{{ error }}</div>
    <ul v-if="contacts.length">
      <li v-for="c in contacts" :key="c.id" class="contact-item">
        <div>
          <strong>{{ c.nombre }} {{ c.apellido }}</strong>
          <div>{{ c.telefono }} — {{ c.email }}</div>
        </div>
        <div>
          <router-link class="btn" :to="`/agenda/${c.id}`">Editar</router-link>
          <button class="btn danger" @click="del(c.id)">Eliminar</button>
        </div>
      </li>
    </ul>
    <p v-else>No hay contactos aún.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { apiFetch } from '../services/api';

const contacts = ref([]);
const error = ref(null);

async function load() {
  try {
    const res = await apiFetch('/api/contactos/index.php');
    contacts.value = res.contacts || [];
  } catch (e) {
    error.value = e.message || 'Error';
  }
}

onMounted(load);

async function del(id) {
  if (!confirm('Eliminar contacto?')) return;
  try {
    await apiFetch(`/api/contactos/eliminar.php?id=${id}`, { method: 'DELETE' });
    contacts.value = contacts.value.filter(c => c.id !== id);
  } catch (e) {
    alert(e.message || 'Error al eliminar');
  }
}
</script>
