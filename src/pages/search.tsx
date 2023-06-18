import { type NextPage } from "next";
import common from "@/styles/common.module.scss";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { api } from "@/utils/api";
import { EventSection, PlaceHolderSideBar } from ".";

import c from "./SearchPage.module.scss";
import { useState } from "react";
import { type CalendarDate, parseDate } from "@internationalized/date";
import {
  ArrowBackRounded,
  ArrowDownwardRounded,
  ArrowForwardRounded,
  ArrowUpwardRounded,
  CheckRounded,
  DoNotDisturbRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import categories, { type Category } from "@/utils/categories";
import Select from "@/components/Select/Select";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import { SearchFilters } from "@/components/LandingPage/SearchSection";
import Card, { type CardProps } from "@/components/LandingPage/Card";
import useMediaQuery from "@/hooks/useMediaQuery";


const orderTypes = [
  { value: "date", label: "Date" },
  { value: "title", label: "Title" },
  { value: "participants", label: "Participants" },
  { value: "capacity", label: "Capacity" },
] as const;
type OrderType = typeof orderTypes[number]["value"];
const orderValues = orderTypes.map((v) => v.value) as string[];

export type SearchFilter = Partial<{
  category: string;
  start: string;
  end: string;
  q: string;
  order: string;
  dir: string;
  joined: string;
  owned: string;
  page: string;
  invited: string;
}>;

const PAGE_SIZE = 12;

export async function runSearch(filters: SearchFilter) {
  const filters_noUndef = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== undefined && value !== "")
  );
  await Router.push({
    pathname: "/search",
    query: filters_noUndef,
  });
}

const InvitationCard = (props: CardProps) => {

  const mobile = useMediaQuery("(max-width: 499px)");
  const [denyStep1, setDenyStep1] = useState(false);

  function deny() {
    if (!denyStep1) {
      setDenyStep1(true);
      setTimeout(() => setDenyStep1(false), 3000);
      return;
    }
    setDenyStep1(false);
    // TODO: Deny invitation
  }

  function accept() {
    // TODO: Accept invitation
  }

  return (
    <div className={c.invitationCard}>
      <Card {...props} />
      <div className={c.buttonGroup}>
        <button className={c.acceptBtn} onClick={accept}>
          <CheckRounded />
          {mobile && <span>Accept</span>}
        </button>
        <button className={c.denyBtn} data-confirm={denyStep1} onClick={deny}>
          <DoNotDisturbRounded />
          {mobile && <span>{denyStep1 ? "Confirm" : "Deny"}</span>}
        </button>
      </div>
    </div>
  )
}

const SearchPage: NextPage = () => {
  const router = useRouter();


  const filters = router.query as SearchFilter;
  const {
    start, end,
    q,
  } = filters;

  const category = filters.category && Object.keys(categories).includes(filters.category) ? filters.category as Category : undefined;
  const order: OrderType = filters.order && orderValues.includes(filters.order) ? filters.order as OrderType : "date";
  const dir = filters.dir === "asc";
  const joined = filters.joined === "1";
  const owned = filters.owned === "1";
  const invited = filters.invited === "1";
  let page = isNaN(Number(filters.page)) ? 1 : Number(filters.page);
  if (page < 1) page = 1;

  const CardComponent = invited ? InvitationCard : Card;


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
      orderBy: order && orderValues.includes(order) ? order : undefined,
      order: dir ? "asc" : "desc",
      joined,
      owned,
      invited,
      page,
      pageSize: PAGE_SIZE,

    },
    { enabled: router.isReady }
  );
  const events = data?.events;
  if (data && page > data.pageCount) runSearch({ ...filters, page: String(data.pageCount) });

  const [filtersOpen, setFiltersOpen] = useState(false);

  if (!router.isReady) return null;

  return (
    <>
      <Head>
        <title>{"EventMate - " + (owned ? "My Events" : joined ? "Joined Events" : "Search")}</title>
      </Head>
      <main className={common.main}>
        <PlaceHolderSideBar />
        <div className={c.searchPage}>

          {/* Filters */}
          <div className={c.filters} data-filters={filtersOpen}>
            <header className={c.header}>
              <h1>{owned ? "My" : joined ? "Joined" : "Find"} Events</h1>
              <button onClick={() => setFiltersOpen((v) => !v)}>
                <span>Filters</span>
                {filtersOpen ? (
                  <KeyboardArrowUpRounded />
                ) : (
                  <KeyboardArrowDownRounded />
                )}
              </button>
            </header>
            <SearchFilters
              moreFilters
              defaults={{
                dateRange,
                category: category as Category,
                query: q,
                owned, joined, invited
              }}
              onSearch={() => setFiltersOpen(false)}
              submitText="Apply"
              submitIcon={<CheckRounded />}
              filters={{
                category,
                start, end,
                joined: joined ? "1" : undefined,
                owned: owned ? "1" : undefined,
                order,
                dir: dir ? "asc" : "desc",
                page: String(page),
              }}
            />
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
                value={order}
                onValueChange={v => runSearch({ ...filters, order: v as OrderType })}
              />
              <ToggleButton pressed={dir} onPressedChange={v => runSearch({ ...filters, dir: v ? "asc" : "desc" })}>
                {dir ? <ArrowUpwardRounded /> : <ArrowDownwardRounded />}
              </ToggleButton>
            </div>
          </div>

          <EventSection fill wrap className={c.results} events={events} component={CardComponent} />

          {/* Page Controls */}
          {(data && data.pageCount > 1) && (
            <footer className={c.pageControls}>
              <button disabled={page <= 1} onClick={() => runSearch({ ...filters, page: String(page - 1) })}>
                <ArrowBackRounded />
                <span>Back</span>
              </button>
              <span className={c.pageInfo}>
                Page <span>{page}</span> of <span>{data?.pageCount ?? "?"}</span>
              </span>
              <button
                disabled={!data || page >= data.pageCount}
                onClick={() => runSearch({ ...filters, page: String(page + 1) })}
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