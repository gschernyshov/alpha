import { telegramClient } from '../api/telegramClient'

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function sendTelegramMessage(text: string) {
  const response = await telegramClient.post('/sendMessage', {
    chat_id: TELEGRAM_CHAT_ID,
    text: text,
    parse_mode: 'HTML',
  })

  return response.data
}
