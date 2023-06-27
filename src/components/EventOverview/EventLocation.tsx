import { Component } from 'react';

interface ReverseGeocodingResult {
  address: string;
  city: string;
  country: string;
}

interface ReverseGeocodingProps {
  latitude: number;
  longitude: number;
}

interface ReverseGeocodingState {
  isLoading: boolean;
  address: string;
  city: string;
  country: string;
}

class EventLocation extends Component<
  ReverseGeocodingProps,
  ReverseGeocodingState
> {
  constructor(props: ReverseGeocodingProps) {
    super(props);
    this.state = {
      isLoading: true,
      address: '',
      city: '',
      country: '',
    };
  }

  componentDidMount() {
    const { latitude, longitude } = this.props;
    const apiUrl = `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const { address, city, country } = data as ReverseGeocodingResult;
        this.setState({
          isLoading: false,
          address,
          city,
          country,
        });
      })
      .catch((error) => {
        console.error('Reverse geocoding API error:', error);
        this.setState({ isLoading: false });
      });
  }

  render() {
    const { isLoading, address, city, country } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div>Address: {address}</div>
        <div>City: {city}</div>
        <div>Country: {country}</div>
      </div>
    );
  }
}

export default EventLocation;





// import type { Event, User } from "@prisma/client";
// import axios from 'axios';
// import { useEffect, useState } from "react";


// interface GeocodingResponse {
//   results: {
//     formatted_address: string;
//   }[];
// }


// class GeocodingService {
//   private readonly API_KEY = 'DEIN_API_SCHLÜSSEL'; // Deinen eigenen API-Schlüssel einfügen

//   async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
//     const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.API_KEY}`;

//     try {
//       const response = await axios.get<GeocodingResponse>(url); 
//       const address = response.data.results[0]?.formatted_address; 
//       return address || 'Adresse nicht gefunden.';
//     } catch (error) {
//       console.error('Fehler beim Abrufen der Adresse:', error);
//       throw error;
//     }
//   }
// }


// export interface InformationProps {
//   event: Event;
// }


// const EventLocation = (props: InformationProps) => {
//   const { event } = props;
//   //const location = [event.latitude, event.longitude];
//   const geocodingService = new GeocodingService();
//   const latitude = event.latitude ?? 0;
//   const longitude = event.longitude ?? 0;
//   const [address, setAddress] = useState<string | null>(null);


//   useEffect(() => {
//     geocodingService.getAddressFromCoordinates(latitude, longitude)
//       .then(address => setAddress(address))
//       .catch(error => {
//         console.error('Fehler:', error);
//         setAddress('Adresse nicht gefunden.');
//       });
//   }, [event]); 


//    return (
//     <div>
//       {address ? (
//         <p>Adresse: {address}</p>
//       ) : (
//         <p>Lade Adresse...</p>
//       )}
//     </div>
//   ); 
// }

// export default EventLocation;






/* import type { Event, User } from "@prisma/client";
import axios from 'axios';
import { useEffect, useState } from "react";
import { GoogleMap, Marker } from '@react-google-maps/api';



// Schnittstelle für die Geocoding-Antwort definieren
interface GeocodingResponse {
  results: {
    formatted_address: string;
  }[];
}


// Geocoding-Service-Klasse erstellen
class GeocodingService {
  private readonly API_KEY = 'DEIN_API_SCHLÜSSEL'; // Deinen eigenen API-Schlüssel einfügen

  // Funktion zum Abrufen der Adresse aus den Koordinaten
  async getAddressFromCoordinates(latitude: number, longitude: number): Promise<string> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.API_KEY}`;

    try {
      const response = await axios.get<GeocodingResponse>(url); // Geocoding-API-Aufruf
      const address = response.data.results[0]?.formatted_address; // Adresse aus der Antwort extrahieren
      return address || 'Adresse nicht gefunden.';
    } catch (error) {
      console.error('Fehler beim Abrufen der Adresse:', error);
      throw error;
    }
  }
}


// Schnittstellen für Props definieren
export interface InformationProps {
  event: Event;
}


// EventLocation-Komponente definieren
const EventLocation = (props: InformationProps) => {
  const { event } = props;
  //const location = [event.latitude, event.longitude];
  const geocodingService = new GeocodingService();
  // Latitude und Longitude mit Standardwert 0 initialisieren, wenn sie nicht vorhanden sind
  const latitude = event.latitude ?? 0;
  const longitude = event.longitude ?? 0;
  // Zustand für die Adresse
  const [address, setAddress] = useState<string | null>(null);
   // Zustand für die Koordinaten
   const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });


  // useEffect-Hook verwenden, um die Geocoding-Adresse bei Änderungen am Event-Objekt abzurufen
  useEffect(() => {
    geocodingService.getAddressFromCoordinates(latitude, longitude)
    .then(address => {
      setAddress(address);
      setCoordinates({ lat: latitude, lng: longitude });
    })
    .catch(error => {
      console.error('Fehler:', error);
      setAddress('Adresse nicht gefunden.');
    });
  }, [event]); // Überwache Änderungen am Event-Objekt
  

  // Hier wird das JSX-Element zurückgeben, das angezeigt werden soll
  return (
    <div>
      {address ? (
        <div>
          <p>Adresse: {address}</p>
          <div style={{ height: '400px' }}>
            <div style={{ height: '100%' }}>
            <GoogleMap
              mapContainerStyle={{ height: '400px', width: '100%' }}
              center={coordinates}
              zoom={15}
            >
            <Marker position={coordinates} />
            </GoogleMap>
            </div>
          </div>
        </div>
      ) : (
        <p>Lade Adresse...</p>
      )}
    </div>
  ); 
}

export default EventLocation;
 */