import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';

interface SearchBarProps {
  onSearch: (str: string) => void;
  disabled?: boolean;
  searchValue?: string;
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

const SearchButton = styled(Button)`
  margin-left: 15px;
`;

function SearchBar({ onSearch, disabled = false, placeholder = '', searchValue = '', className }: SearchBarProps) {
  // just wanted to try hooks so much :)
  const [inputValue, setInputValue] = useState(searchValue);

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      initiateSearch();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);
  const handleButtonClick = () => initiateSearch();

  const initiateSearch = () => {
    if (!disabled) {
      onSearch(inputValue);
    }
  };

  return (
    <SearchBarWrapper className={className}>
      <Input
        disabled={disabled}
        value={inputValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <SearchButton onClick={handleButtonClick}>Find cases</SearchButton>
    </SearchBarWrapper>
  );
}

export default SearchBar;
