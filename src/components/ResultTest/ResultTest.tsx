import './ResultTest.scss'

import { Button } from '@mui/material'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { memo } from 'react'

import { InitialValuesForm } from '../FormTest/FormTest'

type Props = {
  formValues?: InitialValuesForm
  clear: () => void
}

const formValuesResultToMap = (formValues?: InitialValuesForm) => {
  if (formValues) {
    return Object.keys(formValues).map((key) => formValues[key])
  }

  return
}

export const ResultTest = memo(({ formValues, clear }: Props) => {
  return (
    <div className="result__test">
      <div className="result__test-title">Тест завершён. Результаты:</div>
      <List>
        {formValuesResultToMap(formValues)?.map((answer, index) => (
          <ListItem key={index} disableGutters>
            <ListItemText primary={`${index + 1}. Ответ: ${answer}`} />
          </ListItem>
        ))}
      </List>
      <Button size="small" color="brown" variant="contained" className="btn__answer" onClick={clear}>
        Начать заново
      </Button>
    </div>
  )
})
