import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  onSearch: (str: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBarWrapper = styled.div`
  font-size: 16px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  height: 40px;
  width: 300px;
  line-height: 1;
  font-size: 16px;
  vertical-align: middle;
  padding-left: 5px;
`;

const SearchButton = styled.button`
  height: 44px;
  width: 100px;
  border: 1px solid #000;
  margin-left: 15px;
  box-shadow: 2px 2px;

  &:active {
    box-shadow: 0 0;
  }
`;

function SearchBar({ onSearch, placeholder = '', className }: SearchBarProps) {
  // just wanted to try hooks so much :)
  const [inputValue, setInputValue] = useState('');

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  const handleButtonClick = () => onSearch(inputValue);

  return (
    <SearchBarWrapper className={className}>
      <Input placeholder={placeholder} onChange={handleInputChange} onKeyUp={handleKeyUp} />
      <SearchButton onClick={handleButtonClick}>Find cases</SearchButton>
    </SearchBarWrapper>
  );
}

export default SearchBar;
