import { z } from 'zod'
import { isPublicKeyValid } from '../utils/wallet'

export const createTransactionSchema = z.object({
  receiverAddress: z
    .string({ required_error: 'Receiver address is a required field.' })
    .refine((address) => !address || isPublicKeyValid(address), 'Enter a valid address.'),
  amount: z
    .number({
      required_error: 'Amount is a required field.'
    })
    .or(z.string().regex(/\d+/).transform(Number))
    .refine((amount) => amount > 0, 'Amount must be greater than 0.')
})
