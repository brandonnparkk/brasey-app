"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { rsvpFormSchema } from "@/lib/validator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

interface RSVPFormProps {
  userId: string,
  type: 'Create' | 'Update'
}

const DINNER_OPTIONS = ["Steak", "Chicken", "Vegetarian", "NotPicked"] as const;
const DinnerChoiceEnum = z.enum(DINNER_OPTIONS);

const RSVPForm = ({userId, type} : RSVPFormProps) => {
  const initialValues = {
    isAttending: false,
    numberOfAttendees: undefined,
    namesOfAttendees: '',
    dinnerChoice: DinnerChoiceEnum.enum.NotPicked,
    commentsOrQuestions: ''
  };

  const form = useForm<z.infer<typeof rsvpFormSchema>>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: initialValues,
  })

  function onSubmit(values: z.infer<typeof rsvpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="isAttending"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Can You Attend?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Yes!
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        No, I cannot make it
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="dinnerChoice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dinner Choice:</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {DinnerChoiceEnum.enum.Steak}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {DinnerChoiceEnum.enum.Chicken}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal">{DinnerChoiceEnum.enum.Vegetarian}</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="namesOfAttendees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Names of Attendees</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="List out the names of attendees"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="commentsOrQuestions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments or Questions:</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any questions or comments?"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default RSVPForm