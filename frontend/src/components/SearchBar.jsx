import React, { useState, useEffect } from 'react';

function SearchBar({ onSearch, compact = false, initialValue = '' }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => { setValue(initialValue); }, [initialValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="search-wrapper" style={compact ? { minWidth: 0 } : {}}>
      <i className="bi bi-search search-icon" />
      <input
        id="search-bar-input"
        type="text"
        className="form-control-custom"
        placeholder={compact ? 'Search…' : 'Search articles, authors, topics…'}
        value={value}
        onChange={handleChange}
        style={{ paddingLeft: '2.2rem', paddingRight: value ? '2.2rem' : '1rem' }}
        autoComplete="off"
      />
      {value && (
        <button className="search-clear" onClick={handleClear} aria-label="Clear search">
          <i className="bi bi-x-lg" />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
