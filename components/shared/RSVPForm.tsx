// "use client";

// import { useEffect } from "react";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// // import { useUser } from '@clerk/clerk-react';
// import { Button } from "@/components/ui/button";
// import { rsvpFormSchema } from "@/lib/validator";

// import useStore from '@/hooks/useStore'
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Textarea } from "@/components/ui/textarea";
// import { useRouter } from "next/navigation";
// import { createRsvp } from "@/lib/actions/rsvp.actions";
// import { IRsvp } from "@/lib/database/models/rsvp.model";

// interface RSVPFormProps {
//   userId: string;
//   type: "Create" | "Update";
//   rsvpData?: IRsvp
//   rsvpId?: string;
// }

// const DinnerChoiceEnum = {
//   Steak: "Steak",
//   Chicken: "Chicken",
//   Vegetarian: "Vegetarian",
//   NotPicked: "Not Picked",
// };

// type DinnerChoiceType = "Steak" | "Chicken" | "Vegetarian" | "NotPicked";

// const RSVPForm = ({ userId, type, rsvpData, rsvpId }: RSVPFormProps) => {
//   const currentUser = useStore((state: any) => state.user);

//   const initialValues = {
//     isAttending: false,
//     numberOfAttendees: undefined,
//     namesOfAttendees: "",
//     dinnerChoice: DinnerChoiceEnum.NotPicked as DinnerChoiceType,
//     dinnerChoicePlusOne: DinnerChoiceEnum.NotPicked as DinnerChoiceType,
//     commentsOrQuestions: "",
//     commentsOrQuestionsPlusOne: "",
//   };

//   const form = useForm<z.infer<typeof rsvpFormSchema>>({
//     resolver: zodResolver(rsvpFormSchema),
//     defaultValues: initialValues,
//   });

//   const router = useRouter();

//   const { control, handleSubmit, watch, reset } = form;

//   const isAttending = watch('isAttending');

//   useEffect(() => {
//     if (!isAttending) {
//       reset({
//         namesOfAttendees: '',
//         dinnerChoice: 'NotPicked',
//         dinnerChoicePlusOne: 'NotPicked',
//         commentsOrQuestions: '',
//         commentsOrQuestionsPlusOne: ''
//       });
//     }
//   }, [isAttending, reset]);

//   async function onSubmit(values: z.infer<typeof rsvpFormSchema>) {
//     if (type === "Create") {
//       try {
//         const newRsvp = await createRsvp({
//           rsvpData: { ...values },
//           userId,
//           path: '/profile'
//         });

//         if (newRsvp) {
//           form.reset();
//           router.push(`/rsvp/${newRsvp._id}`)
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     } else if (type === "Update") {

//     }
//   }

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="flex flex-col gap-5"
//       >
//         <div className="flex flex-col gap-5 md:flex-row">
//           <FormField
//             control={control}
//             name="isAttending"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>I will be attending!</FormLabel>
//                 <FormControl>
//                   <Checkbox
//                     checked={field.value}
//                     onCheckedChange={field.onChange}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         </div>
//         {isAttending ? (
//           <>
//             <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="dinnerChoice"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Dinner Choice:</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         value={field.value}
//                         onValueChange={field.onChange}
//                         className="flex flex-col space-y-1"
//                       >
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value={DinnerChoiceEnum.Steak} />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {DinnerChoiceEnum.Steak}
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value={DinnerChoiceEnum.Chicken} />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {DinnerChoiceEnum.Chicken}
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem
//                               value={DinnerChoiceEnum.Vegetarian}
//                             />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {DinnerChoiceEnum.Vegetarian}
//                           </FormLabel>
//                         </FormItem>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="namesOfAttendees"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Names of Attendees</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="List out the names of attendees"
//                         className="resize-none"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="commentsOrQuestions"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Comments or Questions:</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Any questions or comments?"
//                         className="resize-none"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             {currentUser?.hasPlusOne && (
//               <>
//               <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="dinnerChoicePlusOne"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Dinner Choice:</FormLabel>
//                     <FormControl>
//                       <RadioGroup
//                         value={field.value}
//                         onValueChange={field.onChange}
//                         className="flex flex-col space-y-1"
//                       >
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value={DinnerChoiceEnum.Steak} />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {DinnerChoiceEnum.Steak}
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem value={DinnerChoiceEnum.Chicken} />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {DinnerChoiceEnum.Chicken}
//                           </FormLabel>
//                         </FormItem>
//                         <FormItem className="flex items-center space-x-3 space-y-0">
//                           <FormControl>
//                             <RadioGroupItem
//                               value={DinnerChoiceEnum.Vegetarian}
//                             />
//                           </FormControl>
//                           <FormLabel className="font-normal">
//                             {DinnerChoiceEnum.Vegetarian}
//                           </FormLabel>
//                         </FormItem>
//                       </RadioGroup>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             <div className="flex flex-col gap-5 md:flex-row">
//               <FormField
//                 control={form.control}
//                 name="commentsOrQuestionsPlusOne"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Comments or Questions:</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         placeholder="Any questions or comments?"
//                         className="resize-none"
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>
//             </>
//             )}
//           </>
//         ) : (
//           ""
//         )}
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };

// export default RSVPForm;
