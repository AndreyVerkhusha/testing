import { memo } from 'react'

import { mockData } from '../../mock'
import { InitialValuesForm } from '../FormTest/FormTest'
import { Step } from './Step'

type Props = {
  activeTest: number
  formValues?: InitialValuesForm
}

export const Steps = memo(({ formValues, activeTest }: Props) => {
  return (
    <div className="steps">
      {formValues &&
        mockData.map((elem, index) => (
          <Step {...elem} key={elem.id} formValues={formValues} index={index} activeTest={activeTest} />
        ))}
    </div>
  )
})
