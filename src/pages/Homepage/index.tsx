import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import type { City, TemperatureUnit } from "../../types";
import { fetchCities } from "../../api";
import TopBar from "../../components/Topbar/Topbar";
import { calculateDistance } from "./utils";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 24px;
  height: 100%;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 24px;
`;

const CityCard = styled.div`
  background-size: cover;
  background-position: center;
  height: 250px;
  color: white;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const CityName = styled.h2`
  font-size: 24px;
  margin: 0;
`;
const CityCountry = styled.h3`
  font-size: 16px;
  margin: 0;
`;
const CityDescription = styled.p`
  margin: 0;
`;

const NoResults = styled.div`
  height: 100%;
  width: 100%;
  color: #999;
  font-size: 24px;
`;

const HomePage = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [sort, setSort] = useState("name");
  const [distanceFrom, setDistanceFrom] = useState("Tel Aviv");
  const [unit, setUnit] = useState<TemperatureUnit>("metric");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCities().then(setCities);
  }, []);

  const referenceCity = cities.find((c) => c.name === distanceFrom);

  const filteredCities = useMemo(() => {
    let list = cities.filter(
      (c) =>
        (c.name.toLowerCase().includes(search.toLowerCase()) ||
          c.country.toLowerCase().includes(search.toLowerCase())) &&
        (continent === "All" || c.continent === continent)
    );

    if (sort === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "distance" && referenceCity) {
      list = [...list].sort((a, b) => {
        const distA = calculateDistance(
          referenceCity.coords.lat,
          referenceCity.coords.lng,
          a.coords.lat,
          a.coords.lng
        );
        const distB = calculateDistance(
          referenceCity.coords.lat,
          referenceCity.coords.lng,
          b.coords.lat,
          b.coords.lng
        );
        return distA - distB;
      });
    }

    return list;
  }, [cities, search, continent, sort, referenceCity]);

  const uniqueContinents = useMemo(() => {
    const all = cities.map((c) => c.continent);
    return ["All", ...Array.from(new Set(all))];
  }, [cities]);

  const cityNames = useMemo(() => cities.map((c) => c.name), [cities]);

  const onCityClick = (cityName: string) => {
    navigate(`/city/${cityName}`);
  };

  return (
    <Container>
      <TopBar
        search={search}
        onSearchChange={setSearch}
        continent={continent}
        onContinentChange={setContinent}
        continents={uniqueContinents}
        sort={sort}
        onSortChange={setSort}
        distanceFrom={distanceFrom}
        onDistanceFromChange={setDistanceFrom}
        cityOptions={cityNames}
        unit={unit}
        onUnitChange={setUnit}
      />
      <Grid>
        {filteredCities.map((city) => (
          <CityCard
            key={city.name}
            style={{ backgroundImage: `url(${city.image})` }}
            onClick={() => onCityClick(city.name)}
          >
            <CityName>{city.name}</CityName>
            <CityCountry>{city.country}</CityCountry>
            <CityDescription>{city.description}</CityDescription>
          </CityCard>
        ))}
        {filteredCities.length === 0 && <NoResults>No cities found.</NoResults>}
      </Grid>
    </Container>
  );
};

export default HomePage;
