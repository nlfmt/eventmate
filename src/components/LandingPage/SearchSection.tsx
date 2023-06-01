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
import { SearchFilter, runSearch } from "@/pages/search";

const SearchSection = () => {
  return (
    <div className={c.searchSection}>
      <h1>Find Events</h1>
      <SearchFilters />
    </div>
  );
};

export interface SearchFilterProps {
  moreFilters?: boolean;
  defaults?: {
    category?: Category;
    dateRange?: { start: CalendarDate; end: CalendarDate } | null;
    query?: string;
    owned?: boolean;
    joined?: boolean;
  };
  onSearch?: () => void;
  submitText?: string;
  submitIcon?: React.ReactNode;
  filters?: SearchFilter;
}
type DateRange = { start: CalendarDate; end: CalendarDate };

export const SearchFilters = ({ defaults, moreFilters, onSearch, submitText, submitIcon, filters }: SearchFilterProps) => {
  const [category, setCategory] = React.useState<Category | "">(defaults?.category ?? "");
  const [dateRange, setDateRange] = React.useState<DateRange | null>(defaults?.dateRange ?? null);
  const [query, setQuery] = React.useState(defaults?.query ?? "");
  const [owned, setOwned] = React.useState(defaults?.owned);
  const [joined, setJoined] = React.useState(defaults?.joined);

  function findEvents(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSearch?.();

    runSearch({
      ...filters,
      category,
      start: dateRange?.start.toString(),
      end: dateRange?.end.toString(),
      q: query,
      joined: joined ? "1" : undefined,
      owned: owned ? "1" : undefined,
    });
  }

  return (
    <form className={c.searchBar} onSubmit={findEvents}>
      {moreFilters && (
        <>
          <input
            placeholder="Search Events..."
            type="text"
            className={c.queryInput}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className={c.checkboxes}>
            <Checkbox className={c.checkbox} label="Owned only" checked={owned} onCheckedChange={setOwned} />
            <Checkbox className={c.checkbox} label="Joined only" checked={joined} onCheckedChange={setJoined} />
          </div>
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
