<script setup lang="ts">
import { useChatStore } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import ChatListItem from './chat/ChatListItem.vue'

const store = useChatStore()
const { sortedChats, activeChatId } = storeToRefs(store)

const selectChat = (id: number) => {
  store.setActiveChat(id)
}
</script>

<template>
  <div class="chat-list">
    <div class="header">
      <h2>Чаты</h2>
    </div>

    <div class="list-container">
      <ChatListItem
        v-for="chat in sortedChats"
        :key="chat.id"
        :chat="chat"
        :isActive="chat.id === activeChatId"
        @click="selectChat"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
  border-right: 1px solid #e9edef;

  .header {
    padding: 10px 16px;
    background: #f0f2f5;
    border-bottom: 1px solid #e9edef;
    height: 60px;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    h2 {
      font-size: 1.2rem;
      color: #54656f;
    }
  }

  .list-container {
    flex: 1;
    overflow-y: auto;
  }
}
</style>
