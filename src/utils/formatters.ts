export const formatTime = (isoString: string): string => {
  if (!isoString) return ''
  const date = new Date(isoString)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export const formatMessageText = (text: string): string => {
  if (!text) return ''

  let formatted = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  formatted = formatted.replace(/\*(.*?)\*/g, '<b>$1</b>')

  formatted = formatted.replace(/_(.*?)_/g, '<i>$1</i>')

  return formatted
}
