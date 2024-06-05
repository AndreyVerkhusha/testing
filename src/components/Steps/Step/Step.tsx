import './Step.scss'

import cn from 'classnames'

import { InitialValuesForm } from '../../FormTest/FormTest'

type Props = {
  formValues?: InitialValuesForm
  index: number
  activeTest: number
}

export const Step = ({ formValues, index, activeTest }: Props) => {
  const classes = () => {
    // Определить цвет для текущего шага теста

    if (formValues) {
      const currentField = formValues[String(index)]

      if (Array.isArray(currentField)) {
        if (currentField.length > 0) return { passed: true }
      } else {
        if (formValues[String(index)]) return { passed: true }
      }
    }

    if (activeTest === index) return { current: true }

    return
  }

  return <div className={cn('step', classes())} />
}
