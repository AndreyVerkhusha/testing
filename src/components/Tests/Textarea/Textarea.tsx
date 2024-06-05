import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize'
import { Box } from '@mui/material'
import { styled } from '@mui/system'
import * as React from 'react'
import { useEffect } from 'react'

import { brownMain } from '../../../constants/theme'
import { Data } from '../../../mock/mock'

type Props = Data & { setAnswer: (value: string) => void }

const TextareaMui = styled(BaseTextareaAutosize)(() => ({
  boxSizing: 'border-box',
  width: '320px',
  fontFamily: 'IBM Plex Sans, sans-serif',
  fontSize: '0.875rem',
  fontWeight: '400',
  lineHeight: '1.5',
  padding: '8px 12px',
  borderRadius: '8px',
  background: '#fff',
  border: `1px solid ${brownMain}`,

  '&:hover': {
    borderColor: brownMain,
  },

  '&:focus': {
    border: `2px solid ${brownMain}`,
  },

  '&:focus-visible': {
    outline: 0,
  },
}))

export const Textarea = ({ setAnswer }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer((event.target as HTMLTextAreaElement).value)
  }

  useEffect(() => {
    window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        const resizeObserverErrDiv = document.getElementById('webpack-dev-server-client-overlay-div')
        const resizeObserverErr = document.getElementById('webpack-dev-server-client-overlay')
        if (resizeObserverErr) {
          resizeObserverErr.setAttribute('style', 'display: none')
        }
        if (resizeObserverErrDiv) {
          resizeObserverErrDiv.setAttribute('style', 'display: none')
        }
      }
    })
  }, [])

  return (
    <Box>
      <TextareaMui onChange={handleChange} minRows={4} maxRows={4} />
    </Box>
  )
}
