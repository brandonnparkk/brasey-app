import { z } from "zod"

const DINNER_OPTIONS = ["Steak", "Chicken", "Vegetarian", "NotPicked"] as const;

export const rsvpFormSchema = z.object({
  isAttending: z.boolean(),
  namesOfAttendees: z.string(),
  dinnerChoice: z.enum(DINNER_OPTIONS),
  commentsOrQuestions: z.string()
})