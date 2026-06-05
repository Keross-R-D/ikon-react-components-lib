import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../../../shadcn/ui/form'
import { Input } from '../../../shadcn/ui/input'
import type { FormInputProps } from '../types'


export function FormInput({ formControl, label, formDescription, extraFormComponent, name, ...inputProps }: FormInputProps) {
  return (
    <>
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => {
          const isNumberInput = inputProps.type === "number";
          return (
            <FormItem>
              {label && <FormLabel>{label}</FormLabel>}
              <FormControl>
                <Input
                  {...field}
                  {...inputProps}
                  onChange={(e) => {
                    if (isNumberInput) {
                      field.onChange(e.target.valueAsNumber);
                    } else {
                      field.onChange(e);
                    }
                  }}
                />
              </FormControl>
              {extraFormComponent && extraFormComponent(field.value)}
              {formDescription && <FormDescription>{formDescription}</FormDescription>}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  )
}

