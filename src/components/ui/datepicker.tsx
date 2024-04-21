"use client"

import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { ru } from "date-fns/locale"
import { useState } from "react"

export function DatePickerDemo(field: any) {
 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  return (
    <div>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.value ? format(field.value, "PPP") : <span>Укажите дату рождения...</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {/* <PopoverClose> */}
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={(e) => { field.onChange(e); setIsCalendarOpen(false) }}
            locale={ru}
            captionLayout="dropdown-buttons"
            fromYear={1959}
            toYear={2025}
          />
          {/* </PopoverClose> */}
        </PopoverContent>
      </Popover>
      {/* <ShieldCloseIcon onClick={() => form.setValue("birthDate", "")} className="self-center pl-[0.5rem]"></ShieldCloseIcon> */}
    </div>

  )
}
