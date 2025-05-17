import styled from "styled-components";
import SearchBar from "../Searchbar";
import type { ChangeEvent } from "react";
import UnitToggle from "../UnitToggle";
import { Select } from "../shared";
import Sorting from "../Sorting";
import type { TemperatureUnit } from "../../types";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;
  continent: string;
  onContinentChange: (value: string) => void;
  continents: string[];
  sort: string;
  onSortChange: (value: string) => void;
  distanceFrom: string;
  onDistanceFromChange: (value: string) => void;
  cityOptions: string[];
  unit: TemperatureUnit;
  onUnitChange: (unit: TemperatureUnit) => void;
}

const Wrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const TopBar = ({
  search,
  onSearchChange,
  continent,
  onContinentChange,
  continents,
  sort,
  onSortChange,
  distanceFrom,
  onDistanceFromChange,
  cityOptions,
  unit,
  onUnitChange,
}: Props) => {
  return (
    <Wrapper>
      <SearchBar value={search} onChange={onSearchChange} />
      <Select
        value={continent}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onContinentChange(e.target.value)
        }
      >
        {continents.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </Select>
      <Sorting
        sort={sort}
        onSortChange={onSortChange}
        distanceFrom={distanceFrom}
        onDistanceFromChange={onDistanceFromChange}
        cityOptions={cityOptions}
      />
      <UnitToggle unit={unit} onUnitChange={onUnitChange} />
    </Wrapper>
  );
};

export default TopBar;
