<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import ChatHeader from './chat/ChatHeader.vue'
import MessageList from './chat/MessageList.vue'
import MessageForm from './chat/MessageForm.vue'

const store = useChatStore()
const { activeChat } = storeToRefs(store)

const isSwitchingChat = ref(false)

watch(
  () => activeChat.value?.id,
  async () => {
    isSwitchingChat.value = true
    await nextTick()
    setTimeout(() => {
      isSwitchingChat.value = false
    }, 50)
  },
  { immediate: true },
)

const handleSend = (text: string) => {
  store.sendMessage(text)
}
</script>

<template>
  <div class="chat-window" v-if="activeChat">
    <ChatHeader :user="activeChat.user" />
    <MessageList :messages="activeChat.messages" :isSwitchingChat="isSwitchingChat" />
    <MessageForm @send="handleSend" />
  </div>

  <div v-else class="empty-state">
    <p>Выберите чат для начала общения</p>
  </div>
</template>

<style scoped lang="scss">
.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #efeae2;
}

.empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #667781;
  font-size: 1.1rem;
  background: #f0f2f5;
  border-bottom: 6px solid #43c960;
}
</style>
