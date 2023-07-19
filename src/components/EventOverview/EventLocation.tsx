import EventOverviewContext from "@/contexts/EventOverviewContext";
import { useContext, useEffect, useState } from "react";

import c from "@/components/EventOverview/eventOverview.module.scss";
import { HomeRounded, LocationCityRounded, PublicRounded, StreetviewRounded } from "@mui/icons-material";

interface Address {
  house_number: string;
  road: string;
  city_district: string;
  village: string;
  county: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
}

interface ReverseGeocodingResult {
  address: Address;
}

interface ReverseGeocodingProps {
  latitude: number;
  longitude: number;
}

const EventLocation = () => {
  const {
    event: { latitude, longitude },
  } = useContext(EventOverviewContext);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<Address | null>(null);

  useEffect(() => {
    if (!latitude || !longitude) return;

    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setLocation((data as ReverseGeocodingResult).address);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Reverse geocoding API error:", error);
        setLoading(false);
      });
  }, [latitude, longitude]);

  if (loading || !location) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className={c.location}>
      <div className={c.infoItem}>
        <span>{location.road} {location.house_number}</span>
        <HomeRounded />
      </div>
      <div className={c.infoItem}>
        <span>{
          [location.postcode, ...(location.city_district ? [location.city_district, location.village] : [location.village, location.county])]
            .filter(Boolean).join(", ")
        }</span>
        <LocationCityRounded />
      </div>
      <div className={c.infoItem}>
        <span>{location.country}</span>
        <PublicRounded />
      </div>
    </div>
  );
};

export default EventLocation;
