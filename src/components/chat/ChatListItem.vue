<script setup lang="ts">
import type { Chat } from '@/types'
import { formatTime } from '@/utils/formatters'

defineProps<{
  chat: Chat
  isActive: boolean
}>()

const emit = defineEmits<{
  (e: 'click', id: number): void
}>()
</script>

<template>
  <div class="chat-item" :class="{ active: isActive }" @click="emit('click', chat.id)">
    <div class="avatar-container">
      <img :src="chat.user.avatar" :alt="chat.user.name" class="avatar" />
      <span class="status-indicator" :class="chat.user.status"></span>
    </div>

    <div class="chat-info">
      <div class="top-row">
        <span class="name">{{ chat.user.name }}</span>
        <span class="time" v-if="chat.messages.length">
          {{ formatTime(chat.messages[chat.messages.length - 1]?.timestamp ?? '') }}
        </span>
      </div>

      <div class="bottom-row">
        <p class="last-message">
          <span v-if="chat.messages.length">
            {{ chat.messages[chat.messages.length - 1]?.text }}
          </span>
          <span v-else>Нет сообщений</span>
        </p>

        <div v-if="chat.unreadCount > 0" class="badge-container">
          <span class="badge">
            {{ chat.unreadCount > 99 ? '99+' : chat.unreadCount }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chat-item {
  display: flex;
  padding: 0 15px;
  height: 72px;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border-bottom: 1px solid #f0f2f5;

  &:hover {
    background-color: #f5f6f6;
  }

  &.active {
    background-color: #f0f2f5;
  }

  .avatar-container {
    position: relative;
    margin-right: 15px;

    .avatar {
      width: 49px;
      height: 49px;
      border-radius: 50%;
      object-fit: cover;
    }

    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: 2px solid #fff;

      &.online {
        background-color: #25d366;
      }

      &.offline {
        background-color: #ccc;
      }
    }
  }

  .chat-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    overflow: hidden;
    padding-right: 10px;

    .top-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: 3px;

      .name {
        font-size: 17px;
        color: #111b21;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .time {
        font-size: 12px;
        color: #667781;
        margin-left: 10px;
        flex-shrink: 0;
      }
    }

    .bottom-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .last-message {
        font-size: 14px;
        color: #667781;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        margin-right: 10px;
      }

      .badge-container {
        flex-shrink: 0;

        .badge {
          background-color: #25d366;
          color: white;
          font-size: 12px;
          font-weight: 600;
          padding: 0 6px;
          border-radius: 18px;
          min-width: 20px;
          text-align: center;
          height: 20px;
          line-height: 20px;
          display: inline-block;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}
</style>
