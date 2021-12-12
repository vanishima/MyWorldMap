import PropTypes from "prop-types";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption
} from "@reach/combobox";

// Styles
import "@reach/combobox/styles.css";

const Search = (props) => {
  const { panTo, isLoaded } = props;

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 200 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      console.log(`RESULT: ${lat}, ${lng}`);
      panTo({ lat, lng });
      clearSuggestions();
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div>
      {isLoaded && (
        <Combobox className="search" onSelect={handleSelect}>
          <ComboboxInput
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Enter an address"
            className="form-control"
          />
          <ComboboxPopover>
            <ComboboxList>
              {status === "OK" &&
                data.map(({ id, description }) => (
                  <ComboboxOption key={id} value={description} />
                ))}
            </ComboboxList>
          </ComboboxPopover>
        </Combobox>
      )}
    </div>
  );
};

Search.propTypes = {
  panTo: PropTypes.func,
  isLoaded: PropTypes.bool,
};

export default Search;
