import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Chat, Message, User, UserStatus } from '@/types'

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([])
  const activeChatId = ref<number | null>(null)

  const activeChat = computed(() => chats.value.find((chat) => chat.id === activeChatId.value))

  const sortedChats = computed(() => {
    return [...chats.value].sort((a, b) => {
      const lastMsgA = a.messages[a.messages.length - 1]
      const lastMsgB = b.messages[b.messages.length - 1]
      if (!lastMsgA || !lastMsgB) return 0
      return new Date(lastMsgB.timestamp).getTime() - new Date(lastMsgA.timestamp).getTime()
    })
  })

  const getRandomStatus = (): UserStatus => (Math.random() > 0.3 ? 'online' : 'offline')

  const generateMockMessages = (count: number): Message[] => {
    const messages: Message[] = []
    const now = new Date()

    for (let i = 0; i < count; i++) {
      const isOutgoing = Math.random() > 0.5
      const timeOffset = (count - i) * 1000 * 60 * (Math.random() * 60 + 1)
      const msgDate = new Date(now.getTime() - timeOffset)

      messages.push({
        id: crypto.randomUUID(),
        text: isOutgoing ? `Это моё сообщение #${i + 1}` : `Привет! Это ответ #${i + 1}`,
        type: isOutgoing ? 'outgoing' : 'incoming',
        timestamp: msgDate.toISOString(),
        isRead: true,
      })
    }
    return messages.sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    )
  }

  const initializeChats = async () => {
    const savedChats = localStorage.getItem('wahelp_chats')
    if (savedChats) {
      chats.value = JSON.parse(savedChats)
      return
    }

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const users = await response.json()

      chats.value = users.slice(0, 5).map((user: User) => ({
        id: user.id,
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`,
          status: getRandomStatus(),
        },
        messages: generateMockMessages(Math.floor(Math.random() * 10) + 20),
        unreadCount: Math.floor(Math.random() * 5) + 10,
      }))
    } catch (error) {
      console.error('Ошибка загрузки пользователей:', error)
    }
  }

  const sendMessage = (text: string) => {
    if (!activeChat.value) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      type: 'outgoing',
      timestamp: new Date().toISOString(),
      isRead: true,
    }

    const activeChatId = activeChat.value!.id

    const chat = chats.value.find((c) => c.id === activeChatId)
    if (!chat) return

    chat.messages.push(newMessage)

    setTimeout(() => {
      receiveMessage(activeChatId, 'Спасибо за сообщение!)')
    }, 2000)
  }

  const receiveMessage = (chatId: number, text: string) => {
    const chat = chats.value.find((c) => c.id === chatId)
    if (!chat) return

    const newMessage: Message = {
      id: crypto.randomUUID(),
      text,
      type: 'incoming',
      timestamp: new Date().toISOString(),
      isRead: false,
    }

    chat.messages.push(newMessage)

    if (activeChatId.value !== chatId) {
      chat.unreadCount++
    }
  }

  const setActiveChat = (id: number) => {
    activeChatId.value = id
    const chat = chats.value.find((c) => c.id === id)
    if (chat) {
      chat.unreadCount = 0
      if (Math.random() > 0.7) {
        chat.user.status = chat.user.status === 'online' ? 'offline' : 'online'
      }
    }
  }

  watch(
    chats,
    (newChats) => {
      localStorage.setItem('wahelp_chats', JSON.stringify(newChats))
    },
    { deep: true },
  )

  return {
    chats,
    activeChatId,
    activeChat,
    sortedChats,
    initializeChats,
    sendMessage,
    setActiveChat,
  }
})
