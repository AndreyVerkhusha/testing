export type Data = {
  id: string
  question: string
  type: 'radio' | 'checkbox' | 'input' | 'textarea'
  answers?: AnswersRadio[]
}

export type AnswersRadio = {
  id: number
  label: string
  value: string
}

export const mockData: Data[] = [
  {
    id: '0',
    type: 'radio',
    question: 'Первый вопрос. Выбрать один из многих',
    answers: [
      { id: 1, label: 'Вариант ответа 1_1', value: 'Вариант ответа 1_1' },
      { id: 2, label: 'Вариант ответа 1_2', value: 'Вариант ответа 1_2' },
      { id: 3, label: 'Вариант ответа 1_3', value: 'Вариант ответа 1_3' },
    ],
  },
  {
    id: '1',
    type: 'checkbox',
    question: 'Второй вопрос. Выбрать несколько из многих',
    answers: [
      { id: 1, label: 'Вариант ответа 2_1', value: 'Вариант ответа 2_1' },
      { id: 2, label: 'Вариант ответа 2_2', value: 'Вариант ответа 2_2' },
      { id: 3, label: 'Вариант ответа 2_3', value: 'Вариант ответа 2_3' },
    ],
  },
  {
    id: '2',
    type: 'input',
    question: 'Третий вопрос. Дописать в инпут короткий ответ',
  },
  {
    id: '3',
    type: 'textarea',
    question: 'Четвёртый вопрос. Дописать развёрнутый ответ',
  },
]
