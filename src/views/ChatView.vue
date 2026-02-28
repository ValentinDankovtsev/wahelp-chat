<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import ChatWindow from '@/components/ChatWindow.vue'

const route = useRoute()
const router = useRouter()
const store = useChatStore()

onMounted(async () => {
  if (store.chats.length === 0) {
    await store.initializeChats()
  }

  const chatId = Number(route.params.id)
  const chatExists = store.chats.find((c) => c.id === chatId)

  if (chatExists) {
    store.setActiveChat(chatId)
  } else {
    router.push('/')
  }
})

const goBack = () => {
  store.setActiveChat(0)
  router.push('/')
}
</script>

<template>
  <div class="chat-view-container">
    <div class="mobile-header">
      <button @click="goBack" class="back-btn">
        <svg viewBox="0 0 24 24" width="24" height="24" class="">
          <path
            fill="currentColor"
            d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
          ></path>
        </svg>
      </button>
      <span>Назад к чатам</span>
    </div>
    <div class="chat-content">
      <ChatWindow />
    </div>
  </div>
</template>

<style scoped>
.chat-view-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.mobile-header {
  height: 50px;
  background-color: #008069;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-weight: 500;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  margin-right: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.chat-content {
  flex: 1;
  overflow: hidden;
}
</style>
