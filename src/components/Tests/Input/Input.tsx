import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import * as React from 'react'

import { brownMain } from '../../../constants/theme'
import { Data } from '../../../mock/mock'

type Props = Data & { setAnswer: (value: string) => void }

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: 'transparent',
    border: '1px solid',
    borderColor: brownMain,
    fontSize: 14,
    width: 'auto',
    padding: '6px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    fontFamily: ['Roboto'].join(','),

    '&:focus': {
      boxShadow: `${alpha(brownMain, 0.25)} 0 0 0 0.2rem`,
      borderColor: brownMain,
    },
  },
}))

export const Input = ({ setAnswer }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer((event.target as HTMLInputElement).value)
  }

  return (
    <Box>
      <FormControl variant="standard">
        <BootstrapInput id="bootstrap-input" onChange={handleChange} />
      </FormControl>
    </Box>
  )
}
