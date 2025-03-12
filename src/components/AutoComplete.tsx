import React, { useState, useEffect } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import axiosConfig from "../lib/axiosConfig";
import API_ENDPOINTS from "../lib/endpoints";
import useDebounce from "../hooks/useDebounce";

interface AutoCompleteProps {
  placeholder: string;
  onSelect: (value: string) => void;
  handleOnClear: () => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  placeholder,
  onSelect,
  handleOnClear,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>(" ");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [noSuggestions, setNoSuggestions] = useState<boolean>(false);

  // Use the debounced search term for API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms debounce

  // Fetch suggestions when debouncedSearchTerm changes
  useEffect(() => {
    if (debouncedSearchTerm.length >= 1) {
      setIsLoading(true);
      setNoSuggestions(false);

      const fetchSuggestions = async () => {
        try {
          const response = await axiosConfig.get(API_ENDPOINTS.SUGGESTIONS, {
            params: { query: debouncedSearchTerm },
          });
          const data = response.data.suggestions;
          if (data && data.length > 0) {
            setSuggestions(data.map((sug: string) => ({ id: sug, name: sug })));
          } else {
            setSuggestions([]);
            setNoSuggestions(true);
          }
        } catch (error) {
          setSuggestions([]);
          setNoSuggestions(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
      setNoSuggestions(false);
    }
  }, [debouncedSearchTerm]);

  // Handle search term change
  const handleOnSearch = (query: string) => {
    setSearchTerm(query);
  };

  // Handle selection of a suggestion
  const handleOnSelect = (item: any) => {
    setSearchTerm(item.name);
    onSelect(item.name);
  };

  // Format result item for display
  const formatResult = (item: any) => (
    <div className="p-2">
      <strong>{item.name}</strong>
    </div>
  );

  return (
    <div className="relative">
      <ReactSearchAutocomplete
        items={suggestions}
        onClear={handleOnClear}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
        formatResult={formatResult}
        placeholder={placeholder}
        maxResults={4}
        styling={{
          height: "40px", // Input height
          borderRadius: "8px",
          backgroundColor: "#fff",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
          hoverBackgroundColor: "#f2f2f2",
          fontSize: "16px",
          fontFamily: "Arial, sans-serif",
          color: "#333",
          iconColor: "#999",
          clearIconMargin: "3px 8px 0 0",
          zIndex: 1000,
        }}
      />

      {/* Display loading message */}
      {/* {isLoading && (
        <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 p-2 text-gray-500">
          Fetching data...
        </div>
      )} */}

      {/* Display no suggestions message */}
      {/* {noSuggestions ||
        (searchTerm.length <= 0 && !isLoading && (
          <div className="absolute w-full bg-white border border-gray-200 rounded-lg mt-1 p-2 text-gray-500">
            No suggestions available.
          </div>
        ))} */}
    </div>
  );
};

export default AutoComplete;
