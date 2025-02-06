import { Paper, Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
  return (
    <Paper elevation={0} className='mx-3 py-4 px-2 border-t-2 border-[#0002]' >
      <Typography >Copyright &copy; 2025</Typography>
    </Paper>
  )
}

export default Footer