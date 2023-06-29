import { I18nProvider, SSRProvider } from "react-aria";
import { type CalendarDate } from "@internationalized/date";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DateRangePicker as RangePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Popover,
  RangeCalendar,
  type DateRangePickerProps as ARIADateRangePickerProps,
} from "react-aria-components";
import { TodayRounded, ChevronRight, ChevronLeft } from "@mui/icons-material";
import c from "./DateRangePicker.module.scss";
import { classes } from "@/utils/utils";

export interface DateRangePickerProps extends ARIADateRangePickerProps<CalendarDate> {
  className?: string;
}

const DateRangePicker = ({ className, ...props }: DateRangePickerProps) => {

  return (
    <SSRProvider>
      <I18nProvider locale="en-DE">
        <RangePicker
          className={classes(c.dateRangePicker, className)}
          aria-label="Select Date Range"
          hourCycle={24}
          minValue={props.defaultValue?.start}
          {...props}
        >
          <Group>
            <span id="hwhbföshdbfhsdb" aria-hidden="true">
              from
            </span>
            <DateInput slot="start">
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <span id="hwhbföshdbfhsdb2" aria-hidden="true">
              to
            </span>
            <DateInput slot="end">
              {(segment) => <DateSegment segment={segment} />}
            </DateInput>
            <Button>
              <TodayRounded />
            </Button>
          </Group>
          <Popover isNonModal={true} className={c.popover}>
            <Dialog>
              <RangeCalendar>
                <header>
                  <Button slot="previous">
                    <ChevronLeft />
                  </Button>
                  <Heading />
                  <Button slot="next">
                    <ChevronRight />
                  </Button>
                </header>
                <CalendarGrid>
                  {(date) => (
                    <CalendarCell date={date}>
                      <div>{date.day}</div>
                    </CalendarCell>
                  )}
                </CalendarGrid>
              </RangeCalendar>
            </Dialog>
          </Popover>
        </RangePicker>
      </I18nProvider>
    </SSRProvider>
  );
};

export default DateRangePicker;
