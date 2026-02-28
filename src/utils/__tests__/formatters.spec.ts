import { describe, it, expect } from 'vitest'
import { formatTime, formatMessageText } from '../formatters'

describe('formatters', () => {
  describe('formatTime', () => {
    it('formats valid date string correctly', () => {
      const date = new Date('2023-01-01T12:30:00')
      const isoString = date.toISOString()
      const result = formatTime(isoString)
      expect(result).toMatch(/\d{2}:\d{2}/)
    })

    it('returns empty string for empty input', () => {
      expect(formatTime('')).toBe('')
    })
  })

  describe('formatMessageText', () => {
    it('returns empty string for empty input', () => {
      expect(formatMessageText('')).toBe('')
    })

    it('escapes HTML characters', () => {
      const input = '<script>alert("xss")</script>'
      const result = formatMessageText(input)
      expect(result).not.toContain('<script>')
      expect(result).toContain('&lt;script&gt;')
    })

    it('formats bold text', () => {
      const input = 'Hello *world*'
      const result = formatMessageText(input)
      expect(result).toBe('Hello <b>world</b>')
    })

    it('formats italic text', () => {
      const input = 'Hello _world_'
      const result = formatMessageText(input)
      expect(result).toBe('Hello <i>world</i>')
    })

    it('formats both bold and italic', () => {
      const input = '*Bold* and _Italic_'
      const result = formatMessageText(input)
      expect(result).toBe('<b>Bold</b> and <i>Italic</i>')
    })
  })
})
