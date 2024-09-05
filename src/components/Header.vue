<template>
  <header class="header">
    <router-link :to="{ name: 'Home' }">
      <img src="../assets/logo.png" class="header__logo" alt="logo" />
    </router-link>
    <nav class="header__nav">
      <router-link class="header__nav-link" :to="{ name: 'Home' }">Главная</router-link>
      <router-link class="header__nav-link" :to="{ name: 'Convert' }">Конвертация</router-link>
    </nav>
  </header>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

<style scoped>
  .header {
    background-color: #515151;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header__logo {
    width: 60px;
  }

  .header__nav {
    display: flex;
    gap: 20px;
  }

  .header__nav-link {
    position: relative;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s ease-in;
  }

  .header__nav-link.router-link-active.router-link-exact-active {
    font-weight: bold;
    color: #00ff8b;
  }

  .header__nav-link::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -2px;
    width: 0;
    height: 2px;
    background-color: #fff;
    transition: width 0.3s ease-in-out, left 0.3s ease-in-out;
    transform: translateX(-50%);
  }

  .header__nav-link:hover::after {
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
