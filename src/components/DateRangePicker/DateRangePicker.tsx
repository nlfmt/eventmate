import { I18nProvider } from "react-aria";
import {CalendarDate} from '@internationalized/date';
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
} from "react-aria-components";
import { TodayRounded, ChevronRight, ChevronLeft } from "@mui/icons-material";
import c from "./DateRangePicker.module.scss"

const DateRangePicker = () => {
  const now = new Date();
  const start = new CalendarDate(now.getFullYear(), now.getMonth()+1, now.getDate());
  const end = start.add({ days: 7 });

  return (
    <I18nProvider locale="en-DE" >
      <RangePicker className={c.dateRangePicker} aria-label="Select Date Range" hourCycle={24} defaultValue={{ start, end }} minValue={start}>
        <Group>
          <span id="hwhbföshdbfhsdb" aria-hidden="true">from</span>
          <DateInput slot="start">
            {(segment) => <DateSegment segment={segment} />}
          </DateInput>
          <span id="hwhbföshdbfhsdb2" aria-hidden="true">to</span>
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
                <Button slot="previous"><ChevronLeft /></Button>
                <Heading />
                <Button slot="next"><ChevronRight /> </Button>
              </header>
              <CalendarGrid>
                {(date) => <CalendarCell date={date}>
                  <div>{date.day}</div>
                  </CalendarCell>}
              </CalendarGrid>
            </RangeCalendar>
          </Dialog>
        </Popover>
      </RangePicker>
    </I18nProvider>
  );
};

export default DateRangePicker;
