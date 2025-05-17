import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { City } from "../../types";
import { useUnit } from "../../context/UnitContext";
import { fetchCities, fetchWeatherData } from "../../api";
import UnitToggle from "../../components/UnitToggle";

const Container = styled.div`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
  font-family: sans-serif;
  color: #333;
`;

const BackButton = styled.button`
  background-color: #0077ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.2s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #005ec2;
  }
`;

const ForecastList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ForecastItem = styled.li`
  padding: 12px;
  margin-bottom: 8px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
`;

const Image = styled.div<{ src: string }>`
  height: 250px;
  background-image: url(${({ src }) => src});
  border-radius: 12px;
  margin-bottom: 24px;
  background-size: contain;
`;

const CityPage = () => {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const { unit } = useUnit();

  useEffect(() => {
    fetchCities().then((cities) => {
      const found = cities.find((c) => c.name === cityName);

      setCity(found || null);
    });
  }, [cityName]);

  useEffect(() => {
    if (city) {
      const { lat, lng } = city.coords;
      fetchWeatherData(lat, lng, unit).then(setWeather);
    }
  }, [city, unit]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!city || !weather || weather?.cod === "400")
    return (
      <Container>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
        <h1>Loading...</h1>
      </Container>
    );

  return (
    <Container>
      <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      <Image src={city.image} />
      <h1>{city.name}</h1>
      <p>{city.country}</p>
      <p>{city.description}</p>
      <h2>
        Current: {Math.round(weather.current.temp)}°
        {unit === "metric" ? "C" : "F"} -{" "}
        {weather.current.weather[0].description}
      </h2>
      <h3>5-Day Forecast</h3>
      <ForecastList>
        {weather.daily.slice(1, 6).map((day: any, i: number) => (
          <ForecastItem key={i}>
            <span>{formatDate(day.dt)}</span>
            <span>
              {Math.round(day.temp.day)}°{unit === "metric" ? "C" : "F"} -{" "}
              {day.weather[0].main}
            </span>
          </ForecastItem>
        ))}
      </ForecastList>
      <UnitToggle />
    </Container>
  );
};

export default CityPage;
