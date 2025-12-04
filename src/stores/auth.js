import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null);
  const user = ref(null);

  function setToken(t) { token.value = t; }
  function setUser(u) { user.value = u; }
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem('agenda_token');
    localStorage.removeItem('agenda_user');
  }

  function tryLoadFromStorage() {
    const t = localStorage.getItem('agenda_token');
    const u = localStorage.getItem('agenda_user');
    if (t) token.value = t;
    if (u) user.value = JSON.parse(u);
  }
  function persist() {
    if (token.value) localStorage.setItem('agenda_token', token.value);
    if (user.value) localStorage.setItem('agenda_user', JSON.stringify(user.value));
  }

  return { token, user, setToken, setUser, logout, tryLoadFromStorage, persist };
});
