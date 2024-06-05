import './Timer.scss'

import { memo } from 'react'

type Props = {
  seconds: number
  minutes: number
}

export const Timer = memo(({ seconds, minutes }: Props) => {
  return (
    <div className="timer">
      <div className="timer__time">
        <span>{minutes < 10 ? '0' + minutes : minutes}</span>
        <span>:</span>
        <span>{seconds < 10 ? '0' + seconds : seconds}</span>
      </div>
    </div>
  )
})
