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
