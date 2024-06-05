export const helpers = {
  jsonParse(value: string | null) {
    if (value) {
      return JSON.parse(value)
    }

    return ''
  },
  jsonStringify<T>(value?: T) {
    if (value) {
      return JSON.stringify(value)
    }

    return ''
  },
}
