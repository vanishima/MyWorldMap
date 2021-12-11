import { useEffect, useCallback, useRef, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

// Elements
import Layout from "../components/Layout";
import PostsGrid from "../components/PostsGrid";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/utils/LoadingSpinner";
// import PostWindow from "../components/map/PostWindow";
import Map from "../components/map/Map";
import MapNavBar from "../components/map/MapNavBar";

// API
import drawPosts from "../components/utils/drawPosts";
import fetchLabels from "../components/utils/fetchLabels";

// Constants
const libraries = ["places"];

export default function MapPosts() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const [labels, setLabels] = useState(null);
  const [labelsSelected, setLabelsSelected] = useState(null);
  const [posts, setPosts] = useState([]);

  // Post List
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts ?posts.slice(indexOfFirstPost, indexOfLastPost) : [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const mapRef = useRef();

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(8);
  }, []);

  useEffect(() => {
    console.log("### EFFECT ###");
    fetchLabels(setLabels);
    drawPosts(setPosts, labelsSelected, setLoadingPosts);
  }, [labelsSelected]);

  if (loadError) return "Error";
  if (!isLoaded) return "loadingMap...";

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <MapNavBar
            labels={labels}
            setLabelsSelected={setLabelsSelected}
            setPosts={setPosts}
            drawPosts={drawPosts}
            mapRef={mapRef}
            setLoadingPosts={setLoadingPosts}
            panTo={panTo}
            isLoaded={isLoaded}
          />
        </div>

        <hr />

        <div className="row">
          <div className="col-5">
            {loadingPosts ? (
              <LoadingSpinner />
            ) : (
              <div>
                <h1 style={{ fontSize: "12px" }}>
                  <span style={{ fontSize: "14px" }}>{posts.length}</span> posts
                  in category{" "}
                  <span style={{ fontSize: "14px", color: "#A03D50" }}>
                    {labelsSelected ? labelsSelected.label : "All"}
                  </span>
                </h1>

                <PostsGrid
                  posts={currentPosts}
                  panTo={panTo}
                />

                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}
                />
              </div>
            )}
          </div>
          <div className="col-7">
            {loadingPosts && <LoadingSpinner />}
            <div>
              <Map
                width={55}
                height={50}
                posts={posts}
                labels={labels}
                mapRef={mapRef}
                panTo={panTo}
              ></Map>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
