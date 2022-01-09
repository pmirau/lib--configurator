import { NumberInput, TextInput } from '@pmirau/lib--react-form'

export const inputText1: TextInput = {
  type: 'text',
  id: 'text-1',
  label: 'Text 1',
  validation: {
    minLength: 5,
  },
}

export const inputNumber1: NumberInput = {
  type: 'number',
  id: 'number-1',
  label: 'Number 1',
  validation: {
    max: 3,
  },
}
