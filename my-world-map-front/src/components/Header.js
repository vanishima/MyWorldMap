import { React } from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { Routes, Route, Link } from "react-router-dom";
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import MyBlogs from "../pages/MyBlogs";
// import MyGallery from "../pages/MyGallery";
// import MyMap from "../pages/Map";
import myAuth from "../authStatus";

const Header = () => {
  myAuth.verifyAuth();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);

  const logoutClick = () => {
    myAuth.logout();
    document.location.href = "/";
  };

  // <Navbar.Collapse id="basic-navbar-nav">
  //   <Nav className="me-auto">
  //     <Nav.Link href="/map">Map</Nav.Link>
  //     {user && <Nav.Link href="/myblogs">Blogs</Nav.Link>}
  //     {user && <Nav.Link href="/myphotos">Gallery</Nav.Link>}
  //   </Nav>
  // </Navbar.Collapse>

  // <Routes>
  //   <Route path="/login" element={<Login />} />
  //   <Route path="/register" element={<Register />} />
  //   <Route path="/myblogs" element={<MyBlogs />} />
  //   <Route path="/myphotos" element={<MyGallery />} />
  //   <Route path="/map" element={<MyMap />} />
  // </Routes>

  return (
    <header className="header">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link className="none-style" to="/">
              MyWorldMap
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />



          <Navbar.Collapse className="justify-content-end">
            {user ? (
              <div>
                <Navbar.Text className="me-2">
                  Welcom, <a href="./user">{user.name}</a>
                </Navbar.Text>
                <Button
                  className="me-2"
                  variant="primary"
                  onClick={logoutClick}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div>
                <Button className="me-2" variant="primary" href="/login">
                  Login
                </Button>
                <Button className="me-2" variant="primary" href="/register">
                  Register
                </Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
