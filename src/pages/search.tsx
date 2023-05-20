import { NextPage } from "next";
import common from "@/styles/common.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { EventSection, PlaceHolderSideBar } from ".";

import c from "./SearchPage.module.scss";
import { SearchFilters } from "@/components/LandingPage/SearchSection";
import { useState } from "react";
import { type CalendarDate, parseDate } from "@internationalized/date";
import {
  ArrowBackIosRounded,
  ArrowBackRounded,
  ArrowDownwardRounded,
  ArrowForward,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  CheckRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import { Category } from "@/utils/categories";
import Select, { SelectOptions } from "@/components/Select/Select";
import { OrderBySchema } from "@/validation/types";
import ToggleButton from "@/components/ToggleButton/ToggleButton";

const orderTypes = [
  { value: "date", label: "Date" },
  { value: "title", label: "Title" },
  { value: "participants", label: "Participants" },
  { value: "capacity", label: "Capacity" },
] as const;

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const { category, start, end, q } = query as {
    [key: string]: string | undefined;
  };

  const [orderBy, setOrderBy] = useState<OrderBySchema>(orderTypes[0].value);
  const [order, setOrder] = useState(false);
  const [page, setPage] = useState(1);

  let dateRange: { start: CalendarDate; end: CalendarDate } | null = null;
  if (start && end) {
    dateRange = {
      start: parseDate(start),
      end: parseDate(end),
    };
  }

  const { data } = api.event.search.useQuery(
    {
      category: category,
      start: start,
      end: end,
      query: q,
      orderBy,
      order: order ? "asc" : "desc",
      page,
      pageSize: 2,
    },
    { enabled: isReady }
  );
  const events = data?.events;

  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <Head>
        <title>EventMate - Search</title>
      </Head>
      <main className={common.main}>
        <PlaceHolderSideBar />
        <div className={c.searchPage}>

          {/* Filters */}
          <div className={c.filters} data-filters={filtersOpen}>
            <header className={c.header}>
              <h1>Find Events</h1>
              <button onClick={() => setFiltersOpen((v) => !v)}>
                <span>Filters</span>
                {filtersOpen ? (
                  <KeyboardArrowUpRounded />
                ) : (
                  <KeyboardArrowDownRounded />
                )}
              </button>
            </header>
            {isReady && (
              <SearchFilters
                textSearch
                defaults={{
                  dateRange,
                  category: category as Category,
                  query: q,
                }}
                onSearch={() => setFiltersOpen(false)}
                submitText="Apply"
                submitIcon={<CheckRounded />}
              />
            )}
          </div>

          {/* Metadata & sort options */}
          <div className={c.info}>
            <span className={c.resultCount}>
              {!events
                ? "?"
                : events.length < data.count
                ? `${events.length} / ${data.count}`
                : events.length}{" "}
              {"event" + (events?.length === 1 ? "" : "s")}
            </span>
            <div className={c.orderResults}>
              <Select
                className={c.orderSelect}
                options={orderTypes}
                value={orderBy}
                onValueChange={setOrderBy as (v: string) => void}
              />
              <ToggleButton pressed={order} onPressedChange={setOrder}>
                {order ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
              </ToggleButton>
            </div>
          </div>

          <EventSection wrap className={c.results} events={events} />

          {/* Page Controls */}
          {(data && data.pageCount > 1) && (
            <footer className={c.pageControls}>
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                <ArrowBackRounded />
                <span>Back</span>
              </button>
              <span className={c.pageInfo}>
                Page <span>{page}</span> of <span>{data?.pageCount ?? "?"}</span>
              </span>
              <button
                disabled={!data || page >= data.pageCount}
                onClick={() => setPage((p) => p + 1)}
              >
                <span>Next</span>
                <ArrowForwardRounded />
              </button>
            </footer>
          )}
        </div>
      </main>
    </>
  );
};

export default SearchPage;
