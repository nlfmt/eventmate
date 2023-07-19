import React, { useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import c from "../UserSelectDialog/UserSelectDialog.module.scss"
import {
  AddRounded,
  CloseRounded,
  ManageSearchRounded,
} from "@mui/icons-material";
import { classes } from "@/utils/utils";
import { Address } from "../EventOverview/EventLocation";

export interface Location {
  lat: number;
  lon: number;
  display_name: string;
}
type LocationSearchResult = Location[];

export interface LocationSelectDialogProps {
  /** The title to show in the dialog */
  title?: string;
  /** The text to show on the trigger when nothing is selected */
  emptyText?: string;
  /** The selected location */
  selected: Location | null;
  /** A function to set the selected usernames */
  setSelected: (selected: Location) => void;
  className?: string;
}

/** A popup dialog that lets you select one or many users */
const LocationSelectDialog = ({
  title,
  selected,
  setSelected,
  emptyText,
  className,
}: LocationSelectDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [results, setResults] = React.useState<LocationSearchResult>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const apiUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(
      query
    )}`;
    setLoading(true);
    setResults([]);

    const getData = setTimeout(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setResults(data as LocationSearchResult);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Reverse geocoding API error:", error);
          setLoading(false);
        });
    }, 750);

    return () => {
      clearTimeout(getData);
      setLoading(false);
    };
  }, [query]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(v) => {
        setQuery("");
        setOpen(v);
      }}
    >
      <Dialog.Trigger asChild>
        <button className={classes(c.trigger, className)}>
          {selected?.display_name ?? emptyText ?? "Select Location"}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={c.overlay} />
        <Dialog.Content className={c.content}>
          <header className={c.header}>
            <Dialog.Title className={c.title}>
              {title ?? "Select Location"}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className={c.iconButton} aria-label="Close">
                <CloseRounded />
              </button>
            </Dialog.Close>
          </header>
          <div className={c.searchInput}>
            <ManageSearchRounded />
            <input
              id="query"
              placeholder="Search for a Location"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className={c.results}>
            {query &&
              results.length != 0 &&
              results.map((l) => (
                <div
                  key={`${l.lat}:${l.lon}`}
                  onClick={() => {
                    setSelected(l);
                    setOpen(false);
                  }}
                >
                  {l.display_name}
                  <AddRounded />
                </div>
              ))}
              {!loading && query && results.length == 0 && <div>No results found</div>}
              {loading && query && <div>Loading...</div>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LocationSelectDialog;
