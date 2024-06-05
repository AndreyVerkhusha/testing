import { Radio as RadioMui, RadioGroup, RadioProps } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel'
import { styled } from '@mui/material/styles'
import * as React from 'react'
import { memo } from 'react'

import { brownMain } from '../../../constants/theme'
import { Data } from '../../../mock/mock'

type Props = Data & { setAnswer: (value: string) => void }

const BpIcon = styled('span')(() => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: '#f5f8fa',
}))

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: brownMain,
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&::before': {
    display: 'block',
    width: 16,
    height: 16,
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: brownMain,
  },
})

const BpRadio = (props: RadioProps) => {
  return <RadioMui disableRipple checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} {...props} />
}

export const Radio = memo(({ answers, setAnswer }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer((event.target as HTMLInputElement).value)
  }

  return (
    <RadioGroup onChange={handleChange}>
      {answers?.map((answer) => (
        <FormControlLabel key={answer.id} value={answer.value} control={<BpRadio />} label={answer.label} />
      ))}
    </RadioGroup>
  )
})
