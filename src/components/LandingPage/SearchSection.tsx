import React from "react";

import c from "./SearchSection.module.scss";
import categories, { type Category } from "@/utils/categories";

import DateRangePicker from "@/components/DateRangePicker/DateRangePicker";
import Select from "@/components/Select/Select";
import {
  type CalendarDate,
} from "@internationalized/date";
import { ArrowForwardRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import Checkbox from "@/components/Checkbox/Checkbox";

const SearchSection = () => {
  return (
    <div className={c.searchSection}>
      <h1>Find Events</h1>
      <SearchFilters />
    </div>
  );
};

export interface SearchFilterProps {
  textSearch?: boolean;
  defaults?: {
    category?: Category;
    dateRange?: { start: CalendarDate; end: CalendarDate } | null;
    query?: string;
  };
  onSearch?: () => void;
  submitText?: string;
  submitIcon?: React.ReactNode;
}
type DateRange = { start: CalendarDate; end: CalendarDate };

export const SearchFilters = ({ defaults, textSearch, onSearch, submitText, submitIcon }: SearchFilterProps) => {
  const router = useRouter();
  const [category, setCategory] = React.useState<Category | "">(defaults?.category ?? "");
  const [dateRange, setDateRange] = React.useState<DateRange | null>(defaults?.dateRange ?? null);
  const [query, setQuery] = React.useState(defaults?.query ?? "");

  function findEvents(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch?.();

    router.push({
      pathname: "search",
      query: {
        category,
        start: dateRange?.start.toString(),
        end: dateRange?.end.toString(),
        q: query,
      },
    });
  }

  return (
    <form className={c.searchBar} onSubmit={findEvents}>
      {textSearch && (
        <>
          <input
            placeholder="Search Events..."
            type="text"
            className={c.queryInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Checkbox />
        </>
      )}
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
        <button className={c.searchButton} type="submit">
          <span>{submitText ?? "Find"}</span>
          <div className={c.searchIcon}>
            {submitIcon ?? <ArrowForwardRounded />}
          </div>
        </button>
      </div>
    </form>
  );
};

export default SearchSection;
