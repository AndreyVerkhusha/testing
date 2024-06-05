import { useCallback, useEffect, useState } from 'react'

import { InitialValuesForm } from '../components/FormTest/FormTest'
import { mockData } from '../mock'
import { helpers } from '../utils/helpers'

export const useDataTest = () => {
  const [activeTest, setActiveTest] = useState<number>(0)
  const [formValues, setFormValues] = useState<InitialValuesForm>()

  const oldAnswers = localStorage.getItem('answers')
  const mockLength = mockData.length

  const setAnswers = useCallback(
    (value: InitialValuesForm) => {
      localStorage.setItem('answers', helpers.jsonStringify(value))

      if (mockLength !== activeTest + 1) {
        setActiveTest((prev) => prev + 1)
        localStorage.setItem('lastTestIndx', String(activeTest + 1))
      }

      setFormValues(value)
    },
    [activeTest, mockLength],
  )

  const checkInitialValues = useCallback(() => {
    const mockKeys: Record<string, string | string[]> = {}

    mockData.forEach(({ id, type }) => {
      const answer: InitialValuesForm | undefined = helpers.jsonParse(oldAnswers)

      if (type === 'checkbox') {
        mockKeys[id] = answer ? answer[id] : []
      } else mockKeys[id] = answer ? answer[id] : ''
    })

    setFormValues(mockKeys)
  }, [oldAnswers])

  useEffect(() => {
    checkInitialValues()
  }, [checkInitialValues])

  useEffect(() => {
    const lastTestIndx = localStorage.getItem('lastTestIndx')

    if (lastTestIndx !== null) {
      setActiveTest(Number(lastTestIndx))
    } else localStorage.setItem('lastTestIndx', '0')
  }, [activeTest])

  return { activeTest, formValues, setAnswers, setActiveTest }
}
