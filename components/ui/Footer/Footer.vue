<script setup lang="ts">
import { aboutData, socialLinks, appDownloadIcons } from '@/data/footerData';

const { isLoaded } = useIsLoaded();
</script>

<template>
  <footer class="bg-gray-900 text-white py-12" v-if="isLoaded">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div v-for="section in aboutData" :key="section.id">
          <h3 class="text-lg font-bold mb-4">{{ section.title }}</h3>
          <ul class="space-y-2">
            <li
              v-for="link in section.links"
              :key="link"
              class="hover:text-gray-400 cursor-pointer"
            >
              {{ link }}
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 border-t border-gray-800 pt-8">
        <ul class="flex justify-center space-x-6">
          <li v-for="social in socialLinks" :key="social.id" class="cursor-pointer">
            <font-awesome-icon :icon="social.icon" class="text-xl" />
          </li>
        </ul>
      </div>

      <div class="mt-8 flex justify-center space-x-6">
        <span v-for="app in appDownloadIcons" :key="app.id">
          <font-awesome-icon :icon="app.icon" class="text-xl cursor-pointer" />
        </span>
      </div>

      <div class="mt-8 text-center text-gray-400">
        &copy; {{ new Date().getFullYear() }} GlovoApp. All rights reserved.
      </div>
    </div>
  </footer>
</template>
