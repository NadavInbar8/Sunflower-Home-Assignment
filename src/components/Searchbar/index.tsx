import styled from 'styled-components';
import type { ChangeEvent } from 'react';

const Input = styled.input`
  width: 400px;
  padding: 12px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return <Input type="text" placeholder="Search by city or country" value={value} onChange={handleChange} />;
};

export default SearchBar;