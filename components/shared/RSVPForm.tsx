"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { rsvpFormSchema } from "@/lib/validator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

interface RSVPFormProps {
  userId: string;
  type: "Create" | "Update";
}

const DinnerChoiceEnum = {
  Steak: "Steak",
  Chicken: "Chicken",
  Vegetarian: "Vegetarian",
  NotPicked: "Not Picked",
};

type DinnerChoiceType = "Steak" | "Chicken" | "Vegetarian" | "NotPicked";

const RSVPForm = ({ userId, type }: RSVPFormProps) => {
  const initialValues = {
    isAttending: false,
    numberOfAttendees: undefined,
    namesOfAttendees: "",
    dinnerChoice: DinnerChoiceEnum.NotPicked as DinnerChoiceType,
    commentsOrQuestions: "",
  };

  const form = useForm<z.infer<typeof rsvpFormSchema>>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit, watch, reset } = form;

  const isAttending = watch('isAttending');

  useEffect(() => {
    if (!isAttending) {
      reset({
        namesOfAttendees: '',
        dinnerChoice: 'NotPicked',
        commentsOrQuestions: ''
      });
    }
  }, [isAttending, reset]);

  function onSubmit(values: z.infer<typeof rsvpFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={control}
            name="isAttending"
            render={({ field }) => (
              <FormItem>
                <FormLabel>I will be attending!</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {isAttending ? (
          <>
            <div className="flex flex-col gap-5 md:flex-row">
              <FormField
                control={form.control}
                name="dinnerChoice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dinner Choice:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={DinnerChoiceEnum.Steak} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {DinnerChoiceEnum.Steak}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={DinnerChoiceEnum.Chicken} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {DinnerChoiceEnum.Chicken}
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              value={DinnerChoiceEnum.Vegetarian}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {DinnerChoiceEnum.Vegetarian}
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
          </>
        ) : (
          ""
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RSVPForm;
