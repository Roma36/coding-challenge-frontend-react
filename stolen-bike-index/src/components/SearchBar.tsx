import React from 'react';
import styled from 'styled-components';

interface SearchBarProps {
  onSearch: (str: string) => void
  placeholder?: string
}

const Input = styled.input`
`

export default function SearchBar({onSearch, placeholder = ''}: SearchBarProps) {
  return (
    <div>
      <Input placeholder={placeholder}/>
    </div>
  );
}
