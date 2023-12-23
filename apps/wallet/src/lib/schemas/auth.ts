import { z } from 'zod'

export const createPasswordSchema = z
  .object({
    password: z
      .string({ required_error: 'Password is a required field.' })
      .min(8, {
        message: 'Password must be at least 8 characters.'
      })
      .max(60, { message: 'Password must be maximum 60 characters.' }),
    confirmPassword: z.string({
      required_error: 'You must confirm your password.'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword']
  })

export const confirmSecretSchema = z.object({
  word1: z.string(),
  word2: z.string(),
  word3: z.string()
})

export const unlockSchema = z.object({
  password: z.string({ required_error: 'You must enter your password.' })
})

export const importSecretPhraseSchema = z.object({
  secretPhraseWords: z.array(z.string())
})
