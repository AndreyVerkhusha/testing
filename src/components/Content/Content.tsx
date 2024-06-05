import './Content.scss'

import { memo, useCallback, useEffect, useState } from 'react'

import { timerCountS } from '../../constants/timer'
import { useDataTest } from '../../hooks/useDataTest'
import { useTime } from '../../hooks/useTime'
import { mockData } from '../../mock'
import { ThemeProvider } from '../../ThemeProvider'
import { FormTest } from '../FormTest'
import { InitialValuesForm } from '../FormTest/FormTest'
import { ResultTest } from '../ResultTest'
import { Steps } from '../Steps'
import { Timer } from '../Timer'

export const Content = memo(() => {
  const [timerTime, setTimerTime] = useState<Date>()

  const { activeTest, formValues, setAnswers, setActiveTest } = useDataTest()
  const { minutes, seconds, pause } = useTime(timerTime)

  const startTimer = useCallback(() => {
    const timeLeftStorage = localStorage.getItem('timerLeft')
    const time = new Date()
    const addedSeconds = time.setSeconds(
      time.getSeconds() + (timeLeftStorage !== null ? Number(timeLeftStorage) : timerCountS),
    ) as unknown

    setTimerTime(addedSeconds as Date)
  }, [])

  const stopTimer = useCallback(() => {
    setTimerTime(undefined)
    pause()
  }, [pause])

  const handleSetAnswers = useCallback(
    (value: InitialValuesForm) => {
      setAnswers(value)
    },
    [setAnswers],
  )

  const handleClear = useCallback(() => {
    // Пройти тест заново
    localStorage.clear()
    setActiveTest(0)
    startTimer()
  }, [setActiveTest, startTimer])

  const detectTestIsDone = useCallback(() => {
    // проверить завершено ли прохождение всех тестов.

    const mockDataLength = mockData.length
    const formAnswers = []

    if (formValues) {
      for (const key in formValues) {
        const currentField = formValues[key]
        if (currentField.length > 0 || currentField) {
          formAnswers.push(currentField)
        }
      }
    }

    return mockDataLength === formAnswers.length
  }, [formValues])

  useEffect(() => {
    const formIsSend = localStorage.getItem('formIsSend')
    if (formIsSend === null) startTimer()
  }, [startTimer])

  useEffect(() => {
    const formIsSend = localStorage.getItem('formIsSend')
    if (formIsSend === null) {
      if (seconds || minutes) {
        const timeToSec = (minutes || 0) * 60 + seconds
        localStorage.setItem('timerLeft', timeToSec === 1 ? '0' : String(timeToSec))
      }
    }
  }, [seconds, minutes])

  return (
    <ThemeProvider>
      <div className="content">
        <div className="content__title">
          <h1>Тестирование</h1>
          {Boolean(timerTime && (minutes || seconds)) && <Timer seconds={seconds} minutes={minutes} />}
          {Boolean(timerTime && !minutes && !seconds) && (
            <div className="timer__left"> Время отведённое на тест вышло</div>
          )}
        </div>
        <Steps activeTest={activeTest} formValues={formValues} />
        {!detectTestIsDone() ? (
          <FormTest
            activeTest={activeTest}
            formValues={formValues}
            setAnswers={handleSetAnswers}
            stopTimer={stopTimer}
          />
        ) : (
          <ResultTest formValues={formValues} clear={handleClear} />
        )}
      </div>
    </ThemeProvider>
  )
})
