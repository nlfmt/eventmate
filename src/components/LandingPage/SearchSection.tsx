import React from "react";

import c from "./SearchSection.module.scss";
import categories, { type Category } from "@/utils/categories";

import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Select from "@/components/Select/Select";
import { CalendarDate } from "@internationalized/date";
import { ArrowForwardRounded } from "@mui/icons-material";
import { useRouter } from "next/router";

const SearchSection = () => {
  const router = useRouter();

  const [category, setCategory] = React.useState<Category | "">("");
  const now = new Date();
  const start = new CalendarDate(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate()
  );
  const end = start.add({ days: 7 });
  const [dateRange, setDateRange] = React.useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>({ start, end });

  function findEvents() {
    router.push({
      pathname: "search",
      query: {
        category,
        start: dateRange?.start.toString(),
        end: dateRange?.end.toString(),
      },
    });
  }

  return (
    <div className={c.searchSection}>
      <h1>Find Events</h1>
      <div className={c.searchBar}>
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          className={c.datePicker}
        />
        <div className={c.selectWrapper}>
          <Select
            className={c.selectBox}
            value={category}
            allowEmpty
            onValueChange={(v) => setCategory(v as Category)}
            placeholder="Select a Category..."
            options={Object.entries(categories).map((c) => {
              return { value: c[0], label: c[1][0] };
            })}
          />
          <button className={c.searchButton} onClick={findEvents}>
            <span>Find</span>
            <div className={c.searchIcon}>
              <ArrowForwardRounded />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
