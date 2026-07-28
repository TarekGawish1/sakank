import { z } from 'zod';

export const submitVerificationSchema = z.object({
  nationalIdFrontUrl: z.string().url('Invalid front image URL'),
  nationalIdBackUrl: z.string().url('Invalid back image URL'),
});

export type SubmitVerificationInput = z.infer<typeof submitVerificationSchema>;
