import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  RefObject,
} from "react";
import "./styles.css";
import { fetchPeople, fetchPeopleFilter } from "../../api/starWarsApi";
import { IPeople } from "./interfaces";

const AutoComplete = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [options, setOptions] = useState<IPeople[]>([]);
  const [search, setSearch] = useState<string>("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  //Request list of people
  const getPeople = async () => {
    const people = await fetchPeople();
    setOptions(people);
  };

  useEffect(() => {
    getPeople();
  }, []);

  useEffect(() => {
    // Added listener for clicks
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Removed listener for clicks
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  //Request people by filter
  const handleSearch = useCallback(async () => {
    const people = await fetchPeopleFilter(search);
    setOptions(people);
    !showDropdown && setShowDropdown(true);
  }, [search]);

  //Send request with filter on inputChange
  useEffect(() => {
    handleSearch();
  }, [handleSearch, search]);

  const handleClickOutside = (event: Event) => {
    const { current: wrap } = wrapperRef as RefObject<HTMLDivElement>;
    if (wrap && !wrap?.contains(event.target as Element)) {
      setShowDropdown(false);
    }
  };

  //Set value from dropdown
  const handleDropdownClick = (nameOfCharacter: string) => {
    setSearch(nameOfCharacter);
    setShowDropdown(false);
  };

  return (
    <div ref={wrapperRef} className="auto-complete">
      <input
        id="auto-complete"
        onClick={() => setShowDropdown(!showDropdown)}
        placeholder="Type name to search"
        value={search}
        className="auto-complete-input"
        onChange={(event) => setSearch(event.target.value)}
      />
      {showDropdown && (
        <div className="auto-container">
          {options.length > 0 ? (
            options.map((value: IPeople, i: number) => {
              const searchValue =
                search.charAt(0).toUpperCase() + search.slice(1);
              const original = value.name;
              const formattedOption = original.replace(
                new RegExp(searchValue, "gi"),
                (match) => `<mark>${match}</mark>`
              );

              return (
                <div
                  onClick={() => handleDropdownClick(value.name)}
                  className="option"
                  key={i}
                  tabIndex={0}
                >
                  <span dangerouslySetInnerHTML={{ __html: formattedOption }} />
                </div>
              );
            })
          ) : (
            <p>No results</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
