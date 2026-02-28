import { ref, onMounted, onUnmounted } from 'vue'

export function useIsMobile(breakpoint = 768) {
  const isMobile = ref(window.innerWidth < breakpoint)

  const checkWidth = () => {
    isMobile.value = window.innerWidth < breakpoint
  }

  onMounted(() => {
    window.addEventListener('resize', checkWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkWidth)
  })

  return { isMobile }
}
