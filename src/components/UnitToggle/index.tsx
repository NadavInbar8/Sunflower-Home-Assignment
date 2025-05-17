import styled from "styled-components";
import { useUnit } from "../../context/UnitContext";

const ToggleWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 16px;
`;

const Button = styled.button<{ active: boolean }>`
  padding: 6px 12px;
  font-size: 16px;
  cursor: pointer;
  background: ${({ active }) => (active ? "#0077ff" : "white")};
  color: ${({ active }) => (active ? "white" : "#0077ff")};
  border: 1px solid #0077ff;
  border-radius: 4px;
`;

const UnitToggle = () => {
  const { unit, setUnit } = useUnit();
  return (
    <ToggleWrapper>
      <span>Units:</span>
      <Button active={unit === "metric"} onClick={() => setUnit("metric")}>
        °C
      </Button>
      <Button active={unit === "imperial"} onClick={() => setUnit("imperial")}>
        °F
      </Button>
    </ToggleWrapper>
  );
};

export default UnitToggle;
