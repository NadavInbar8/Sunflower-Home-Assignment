import styled from "styled-components";
import { Select, Seperator } from "../shared";
import type { ChangeEvent } from "react";

interface Props {
  sort: string;
  onSortChange: (value: string) => void;
  distanceFrom: string;
  onDistanceFromChange: (value: string) => void;
  cityOptions: string[];
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Button = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  padding: 0;
  font-size: 16px;
  cursor: pointer;
  text-decoration: ${({ active }) => (active ? "underline" : "none")};
`;

const Sorting = ({
  sort,
  onSortChange,
  distanceFrom,
  onDistanceFromChange,
  cityOptions,
}: Props) => {
  return (
    <Wrapper style={{ display: "flex", alignItems: "center" }}>
      <Button active={sort === "name"} onClick={() => onSortChange("name")}>
        Sort by Name
      </Button>
      <Seperator />
      <Button
        active={sort === "distance"}
        onClick={() => onSortChange("distance")}
      >
        Sort by Distance
      </Button>
      {sort === "distance" && (
        <Select
          value={distanceFrom}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onDistanceFromChange(e.target.value)
          }
        >
          {cityOptions.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </Select>
      )}
    </Wrapper>
  );
};

export default Sorting;
