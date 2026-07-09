import axios from 'axios'

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const { headers, status, data } = error.response

      // Есть ответ от сервера, но с ошибкой
      console.error('API. Server error: ', {
        headers,
        status,
        data,
      })

      error.message = data?.error ?? 'Произошла неизвестная ошибка'
    } else if (error.request) {
      const { request, config, message } = error

      // Запрос отправлен, но ответа нет
      console.error('API. Network error (no response): ', {
        request,
        config,
        message,
      })

      error.message = 'Произошла неизвестная ошибка. Проверьте подключение.'
    } else {
      // Ошибка при настройке запроса (например, bad URL)
      console.error('API. Request setup error: ', error.message)

      error.message = 'Ошибка настройки запроса. Проверьте URL.'
    }
  } else {
    console.error('API. Non-Axios error: ', error)
  }

  return error
}
