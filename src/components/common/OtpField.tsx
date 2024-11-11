import React, { useEffect, useRef } from 'react'

import { styled } from '@mui/material/styles'

// @mui components
import Typography from '../mui/Typography'
import TextField from '../mui/TextField'
import  Box  from '../mui/Box'

interface OTPProps {
  errorMsg?: string
  isInvalidOtp?: boolean
  separator?: React.ReactNode        // Separator between OTP inputs (e.g., '-')
  value: string                      // Current OTP value as a string
  onChange: (value: string) => void  // Callback to update OTP value
  length: number                     // Number of OTP input fields
}

const OtpField: React.FC<OTPProps> = ({
  separator,
  value = '',
  onChange,
  length,
  isInvalidOtp = false,
  errorMsg = 'Invalid OTP'
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Focus on the first input field on component mount
    if (inputRefs.current[0]) {
      inputRefs.current[0]!.focus()
    }
  }, [])

  // Ensure the value is always of the correct length
  const paddedValue = value.padEnd(length, '')

  // Handle change in OTP input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newValue = event.target.value
    const updatedValue = paddedValue.substring(0, index) + newValue + paddedValue.substring(index + 1)

    onChange(updatedValue)

    // Move to the next input field
    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle paste event
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData('Text')

    if (pasteData.length === length) {
      onChange(pasteData)

      // Move to the last input field
      inputRefs.current[length - 1]?.focus()
    }
  }

  // Handle key down events
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace') {
      event.preventDefault() // Prevent the default backspace behavior

      if (!paddedValue[index] && index > 0) {
        // Move to the previous input field if current value is empty
        inputRefs.current[index - 1]?.focus()
      }

      // Update the value to remove the character
      const updatedValue = paddedValue.substring(0, index - 1) + paddedValue.substring(index)

      onChange(updatedValue)
    } else if (event.key === 'Delete') {
      event.preventDefault() // Prevent the default delete behavior

      // Update the value to remove the character
      const updatedValue = paddedValue.substring(0, index) + paddedValue.substring(index + 1)

      onChange(updatedValue)
    }
  }

  return (
    <>
      <OTPContainer>
        {Array.from({ length }, (_, index) => (
          <React.Fragment key={index}>
            <OTPInput
              type="text"
              value={paddedValue[index] || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>handleChange(e, index)}
              onPaste={handlePaste}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e, index)}
              inputProps={{ maxLength: 1 }}
              inputRef={(el) => (inputRefs.current[index] = el)}
              placeholder="0"
            />
            {index < length - 1 && (
              <Separator separator={!!separator}>{separator}</Separator>
            )}
          </React.Fragment>
        ))}
      </OTPContainer>
      {isInvalidOtp && (
        <Typography color="error" className="ml-1">
          {errorMsg}
        </Typography>
      )}
    </>
  );
}

const OTPContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center'
})

const OTPInput = styled(TextField)({
  width: '2.5rem',
  height: '2.5rem',
  textAlign: 'center',
  margin: '0 4px',
  '& .MuiInputBase-input': {
    padding: '0',
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  '& .MuiOutlinedInput-root': {
    height: '100%',
    borderRadius: '4px',
    '& fieldset': {
      borderRadius: '4px'
    }
  },
  '&:last-child': {
    marginRight: '0'
  }
})

const Separator = styled('span')<{ separator: boolean }>(({ separator }) => ({
  margin: separator ? '0 8px' : '0 4px'
}))

export default OtpField;
