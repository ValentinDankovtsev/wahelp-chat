<script setup lang="ts">
import type { User } from '@/types'

defineProps<{
  user: User
}>()
</script>

<template>
  <header class="chat-header">
    <div class="avatar-container">
      <img :src="user.avatar" class="avatar" :alt="user.name" />
    </div>
    <div class="user-info">
      <span class="name">{{ user.name }}</span>
      <span class="status">{{ user.status === 'online' ? 'в сети' : 'был(а) недавно' }}</span>
    </div>
  </header>
</template>

<style scoped lang="scss">
.chat-header {
  height: 60px;
  background: #f0f2f5;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d1d7db;
  flex-shrink: 0;

  .avatar-container {
    margin-right: 15px;

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .user-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .name {
      font-weight: 500;
      color: #111b21;
      font-size: 16px;
    }

    .status {
      font-size: 13px;
      color: #667781;
    }
  }
}
</style>
