import React, { useCallback, useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import autoCompleteApi from "../Api/AutoCompleteApi";

const AutocompleteComponent = ({
  url,
  onChange,
  value,
  label,
  error,
  helperText,
  required,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  const fetchOptions = useCallback(() => {
    autoCompleteApi
      .get(url)
      .then((response) => setOptions(response.data.data))
      .catch((e) => console.error("Error fetching options:", e));
  }, [url]);

  useEffect(() => fetchOptions(), [fetchOptions]);

  const handleOptionSelect = (event, newValue) => {
    setSelectedOption(newValue ?? null);
    setInputValue(newValue?.name ?? "");
    if (onChange) onChange(newValue ?? null);
  };

  useEffect(() => {
    setSelectedOption(value ?? null);
  }, [value]);

  return (
    <Autocomplete
      onFocus={() => {
        if (options.length === 0) fetchOptions();
      }}
      onChange={handleOptionSelect}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.name || ""}
      value={selectedOption || null}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="filled"
          required={required}
          error={error}
          helperText={helperText}
        />
      )}
    />
  );
};

export default AutocompleteComponent;
