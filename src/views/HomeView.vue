<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import ChatList from '@/components/ChatList.vue'
import ChatWindow from '@/components/ChatWindow.vue'
import { useIsMobile } from '@/composables/useIsMobile'

const store = useChatStore()
const { activeChatId } = storeToRefs(store)
const router = useRouter()
const { isMobile } = useIsMobile()

onMounted(() => {
  store.initializeChats()
})

watch(activeChatId, (newId) => {
  if (newId && isMobile.value) {
    router.push(`/chat/${newId}`)
  }
})
</script>

<template>
  <div class="home-container">
    <div class="sidebar">
      <ChatList />
    </div>
    <div class="main-window" v-if="!isMobile">
      <ChatWindow />
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  height: 100vh;
  width: 100%;
  background-color: #fff;
  overflow: hidden;
}

.sidebar {
  width: 30%;
  min-width: 350px;
  border-right: 1px solid #e0e0e0;
  height: 100%;
}

.main-window {
  flex: 1;
  height: 100%;
  background-color: #f0f2f5;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    border-right: none;
  }
}
</style>
