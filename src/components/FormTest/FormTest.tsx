import './FormTest.scss'

import { Button } from '@mui/material'
import { Form, Formik } from 'formik'
import { memo } from 'react'

import { mockData } from '../../mock'
import { Checkbox } from '../Tests/Checkbox'
import { Input } from '../Tests/Input'
import { Radio } from '../Tests/Radio'
import { Textarea } from '../Tests/Textarea'

export type InitialValuesForm = Record<string, string | string[]>

type Props = {
  activeTest: number
  formValues?: InitialValuesForm
  setAnswers: (value: InitialValuesForm) => void
  stopTimer: () => void
}

export const FormTest = memo(({ activeTest, setAnswers, formValues, stopTimer }: Props) => {
  const mockDataLength = mockData.length

  const checkDisabledBtn = (values: InitialValuesForm) => {
    // Определить disabled для кнопки "Ответить"

    const currentField = values[activeTest]

    if (Array.isArray(currentField) && currentField.length === 0) {
      return true
    }

    return !currentField
  }

  const handleSubmit = async () => {
    stopTimer()
    localStorage.setItem('formIsSend', 'true')
  }

  const viewCurrentTest = (
    values: InitialValuesForm,
    setFieldValue: (field: string, value: string | string[]) => void,
  ) => {
    // Отобразить текущий тест исходя из типа

    switch (mockData[Number(activeTest)].type) {
      case 'radio':
        return (
          <Radio
            {...mockData[Number(activeTest)]}
            key={mockData[Number(activeTest)].id}
            setAnswer={(value) => setFieldValue(String(activeTest), value)}
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            {...mockData[Number(activeTest)]}
            key={mockData[Number(activeTest)].id}
            setAnswer={(value) => {
              const valueInFormik = values[activeTest]

              if (valueInFormik.includes(value)) {
                const newValues = Array.isArray(valueInFormik) && valueInFormik.filter((elem) => elem !== value)
                newValues && setFieldValue(String(activeTest), newValues)
              } else setFieldValue(String(activeTest), [...valueInFormik, value])
            }}
          />
        )
      case 'input':
        return (
          <Input
            {...mockData[Number(activeTest)]}
            key={mockData[Number(activeTest)].id}
            setAnswer={(value) => setFieldValue(String(activeTest), value)}
          />
        )
      case 'textarea':
        return (
          <Textarea
            {...mockData[Number(activeTest)]}
            key={mockData[Number(activeTest)].id}
            setAnswer={(value) => setFieldValue(String(activeTest), value)}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="form">
      <div className="form__title">{mockData[activeTest].question}</div>
      {formValues && (
        <Formik initialValues={formValues} onSubmit={handleSubmit}>
          {({ handleSubmit, setFieldValue, values, submitForm }) => (
            <Form onSubmit={handleSubmit} className="formik">
              {viewCurrentTest(values, setFieldValue)}
              <Button
                size="small"
                color="brown"
                variant="contained"
                className="btn__answer"
                disabled={checkDisabledBtn(values)}
                onClick={async () => {
                  await setAnswers(values)
                  if (activeTest + 1 === mockDataLength) {
                    submitForm()
                  }
                }}
              >
                Ответить
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  )
})
