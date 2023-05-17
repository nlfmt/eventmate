import { NextPage } from "next";
import common from "@/styles/common.module.scss"
import Head from "next/head";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import { EventSection, PlaceHolderSideBar } from ".";

import c from "./SearchPage.module.scss"
import { SearchFilters } from "@/components/LandingPage/SearchSection";
import { useState } from "react";
import { type CalendarDate, parseDate } from "@internationalized/date";
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from "@mui/icons-material";
import { Category } from "@/utils/categories";

const SearchPage: NextPage = () => {

  const router = useRouter();
  const { query: { category, start, end, q }, isReady } = router;

  let dateRange: { start: CalendarDate, end: CalendarDate } | null = null;
  if (start && end) {
    dateRange = {
      start: parseDate(start as string),
      end: parseDate(end as string),
    }
  }

  const { data: events } = api.event.search.useQuery({
    category: category as string,
    start: start as string,
    end: end as string,
    query: q as string,
  }, { enabled: isReady });

  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Search Events</title>
      </Head>
      <main className={common.main}>
        <PlaceHolderSideBar />
        <div className={c.searchPage}>
          <div className={c.filters} data-filters={filtersOpen}>
            <header className={c.header}>
              <h1>Find Events</h1>
              <button onClick={() => setFiltersOpen(v => !v)}>
                <span>Filters</span>
                {filtersOpen ? <KeyboardArrowUpRounded /> : <KeyboardArrowDownRounded />}
              </button>
            </header>
            {isReady && <SearchFilters textSearch defaults={{ dateRange, category: category as Category, query: q as string}} />}
          </div>
          <div className={c.info}>
            <span>Search Results</span>
            <span>{events?.length} events</span>
          </div>
          <EventSection className={c.results} events={events} />
        </div>
      </main>
    </>
  );
};

export default SearchPage;