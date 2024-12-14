import { useState } from 'react';
import { startOfWeek, isSameWeek, getWeek } from 'date-fns';
import { CalendarDate } from '@internationalized/date'; 

import { CalendarIcon } from "lucide-react";
import {
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  Dialog as AriaDialog,
  DialogProps as AriaDialogProps,
  PopoverProps as AriaPopoverProps,
  ValidationResult as AriaValidationResult,
  composeRenderProps,
  Text,
} from "react-aria-components";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarHeading,
} from "./calendar";
import { DateInput } from "./datefield";
import { FieldError, FieldGroup, Label } from "./field";
import { Popover } from "./popover";

const DatePicker = AriaDatePicker;

const DatePickerContent = ({
  className,
  popoverClassName,
  ...props
}: AriaDialogProps & { popoverClassName?: AriaPopoverProps["className"] }) => (
  <Popover
    className={composeRenderProps(popoverClassName, (className) =>
      cn("w-auto p-3", className)
    )}
  >
    <AriaDialog
      className={cn(
        "flex w-full flex-col space-y-4 outline-none sm:flex-row sm:space-x-4 sm:space-y-0",
        className
      )}
      {...props}
    />
  </Popover>
);

interface JollyWeekPickerProps
  extends AriaDatePickerProps<CalendarDate> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: AriaValidationResult) => string);
  onWeekSelect?: (weekNumber: number) => void;
}

function JollyWeekPicker({
  label,
  description,
  errorMessage,
  className,
  onWeekSelect,
  ...props
}: JollyWeekPickerProps) {
  const [selectedWeekStart, setSelectedWeekStart] = useState<Date | null>(null);

  return (
    <DatePicker
      {...props}
      className={composeRenderProps(className, (className) =>
        cn("group flex flex-col gap-2", className)
      )}
    >
      <Label>{label}</Label>
      <FieldGroup>
        <DateInput className="flex-1" variant="ghost" />
        <Button
          variant="ghost"
          size="icon"
          className="mr-1 size-6 data-[focus-visible]:ring-offset-0"
        >
          <CalendarIcon aria-hidden className="size-4" />
        </Button>
      </FieldGroup>
      {description && (
        <Text className="text-sm text-muted-foreground" slot="description">
          {description}
        </Text>
      )}
      <FieldError>{errorMessage}</FieldError>
      <DatePickerContent>
        <Calendar>
          <CalendarHeading />
          <CalendarGrid>
            <CalendarGridHeader>
              {(day) => <CalendarHeaderCell>{day}</CalendarHeaderCell>}
            </CalendarGridHeader>
            <CalendarGridBody>
              {(date) => (
                <CalendarCell
                  date={date}
                  className={(renderProps) => {
                    const jsDate = date.toDate("UTC");
                    const isSelectedWeek = selectedWeekStart
                      ? isSameWeek(jsDate, selectedWeekStart, { weekStartsOn: 1 })
                      : false;

                    return cn(
                      renderProps.defaultClassName,
                      isSelectedWeek && "bg-blue-500 text-white",
                      "cursor-pointer"
                    );
                  }}
                >
                  {({ formattedDate, ...cellProps }) => (
                    <div
                      {...cellProps}
                      onClick={() => {
                        const jsDate = date.toDate("UTC");
                        const weekStart = startOfWeek(jsDate, { weekStartsOn: 1 });
                        setSelectedWeekStart(weekStart);
                        const weekNumber = getWeek(weekStart, { weekStartsOn: 1 });
                        if (onWeekSelect) {
                          onWeekSelect(weekNumber);
                        }
                        props.onChange && props.onChange(date);
                      }}
                    >
                      {formattedDate}
                    </div>
                  )}
                </CalendarCell>
              )}
            </CalendarGridBody>
          </CalendarGrid>
        </Calendar>
      </DatePickerContent>
    </DatePicker>
  );
}

export {
  DatePicker,
  DatePickerContent,
  JollyWeekPicker,
};
export type { JollyWeekPickerProps };
