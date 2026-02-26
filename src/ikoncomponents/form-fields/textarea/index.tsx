import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/ui/form'
import type { FormTextareaProps } from '../types'
import { Textarea } from '../../../shadcn/ui/textarea'



export function FormTextarea({ formControl, name, label, formItemClass, formDescription, ...textAreaProps }: FormTextareaProps) {
  return (
    <>
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
          <FormItem className={formItemClass}>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Textarea {...field}  {...textAreaProps} />
            </FormControl>
            {formDescription && <FormDescription>{formDescription}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
