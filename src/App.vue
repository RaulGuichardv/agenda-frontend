<template>
  <div>
    <header class="topbar">
      <nav class="nav">
        <router-link to="/">Inicio</router-link>
        <router-link to="/agenda">Agenda</router-link>
        <router-link to="/perfil">Perfil</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/registro">Registro</router-link>
      </nav>
    </header>
    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>
