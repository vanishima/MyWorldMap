import { useCallback, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

// Styles
import "@reach/combobox/styles.css";
import mapStyles from "../../mapStyles";

// Constants
const libraries = ["places"];
const mapContainerStyle = {
  height: "30vh",
  width: "50vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
};
function Deleter() {
  // Ugly hack to make google maps pass the axe audit
  const delRef = useRef();
  useEffect(() => {
    console.group("DELETE ARIA");
    try {
      console.log("PARENT", delRef.current.parentElement);

      setTimeout(() => {
        console.log("waiting for map to render");
        const bug = delRef.current.parentElement.querySelector(
          "div[aria-roledescription]"
        );

        console.log("deleting from ", bug);

        if (bug) {
          bug.removeAttribute("aria-roledescription");
        }
      }, 1000);

      console.groupEnd("removing aria-roledescription", delRef.current);
    } catch (err) {
      console.groupEnd("deleter failed, maybe the map wasn't ready?", err);
    }
  }, []);
  return <div ref={delRef}></div>;
}

const EmbeddedMap = (props) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  console.log("location", props.location);

  const center = {
    lat: props.location.lat,
    lng: props.location.lng,
  };

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <GoogleMap
      id="map"
      mapContainerStyle={mapContainerStyle}
      zoom={5}
      center={center}
      options={options}
      onLoad={onMapLoad}
    >
      <Marker
        title={"target"}
        animation={window.google.maps.Animation.DROP}
        position={center}
        icon={{
          url: "/icons/dinosaur-1.png",
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(15, 15),
          scaledSize: new window.google.maps.Size(35, 35),
        }}
      />
      <Deleter></Deleter>
    </GoogleMap>
  );
};

export default EmbeddedMap;
