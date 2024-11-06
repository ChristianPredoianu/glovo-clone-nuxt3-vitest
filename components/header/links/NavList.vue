<script setup lang="ts">
import { navLinks } from '@/data/navLinks';
</script>

<template>
  <ul class="text-sm flex flex-col gap-4 sm:flex-row">
    <NavLink
      v-for="navLink in navLinks"
      :key="navLink.title"
      :title="navLink.title"
      :link="navLink.link"
      :icon="navLink.icon"
    />
  </ul>
</template>
