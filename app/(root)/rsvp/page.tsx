"use client"
import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { rsvpFormSchema } from "@/lib/validator"
import { Button } from '@/components/ui/button'

const DinnerChoiceEnum = {
  Steak: "Steak",
  Chicken: "Chicken",
  Vegetarian: "Vegetarian",
  NotPicked: "Not Picked",
}

type DinnerChoiceType = "Steak" | "Chicken" | "Vegetarian" | "NotPicked";

const Rsvp = () => {
  const [selectedButton, setSelectedButton] = useState<"yes" | "no" | null>(null);

  const initialValues = {
    isAttending: false,
    foodAllergies: "",
    dinnerChoice: DinnerChoiceEnum.NotPicked as DinnerChoiceType,
  };

  const form = useForm<z.infer<typeof rsvpFormSchema>>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: initialValues,
  });

  const { control, handleSubmit, setValue } = form;

  function onSubmit(values: any) {
    console.log("submitted form!", values)
  }

  return (
    <div>
      <h1>RSVP for Casey and Brandon&apos;s Wedding!</h1>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="isAttending"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Are you able to join us at the wedding on xx/xx/xxxx from x-xPM?</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <Button
                        type="button"
                        variant={selectedButton === 'yes' ? "default" : "secondary"}
                        onClick={() => {
                          setValue("isAttending", true);
                          setSelectedButton("yes");
                        }}
                      >
                        Yes, I wouldn&apos;t miss it!
                      </Button>
                      <Button
                        type="button"
                        variant={selectedButton === 'no' ? "default" : "secondary"}
                        onClick={() => {
                          setValue("isAttending", false);
                          setSelectedButton("no");
                        }}                      >
                        Sorry, I can&apos;t make it.
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="foodAllergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Any food allergies or dietary restrictions?</FormLabel>
                  <FormControl>
                    <Input className="flex" placeholder="I am allergic to..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={control}
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
{/* <span>Are you able to join us at the wedding on xx/xx/xxxx from x-xPM?</span>
                <button>Yes, I wouldn&apos;t miss it!</button>
                <button>Sorry, I can&apos;t make it.</button> */}

export default Rsvp