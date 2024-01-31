import { atom } from 'jotai'

// An atom for each input field is created/defined
export const ageAtom = atom<string | null>('0')
export const nameAtom = atom<string | null>('')
export const proficiencyAtom = atom<string | null>('')
