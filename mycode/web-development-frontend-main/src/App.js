import './App.css';
import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AddReview from "./components/add-review";
import MoviesList from "./components/movies-list";
import Movie from "./components/movie";
import Login from "./components/login";
import { Nav, Navbar } from 'react-bootstrap';
import ContactPage from './components/contactpage';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/movies">Movies</Nav.Link>
            <Nav.Link as={Link} to="/contactpage">Contact</Nav.Link>
            {user ? (
              <Nav.Link onClick={logout}>Logout</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
        {/* Movies List */}
        <Route exact path={["/", "/movies"]} component={MoviesList} />

        {/* Add a Review */}
        <Route path="/movies/:id/review" render={(props) =>
          <AddReview {...props} user={user} />
        } />

        {/* Movie Detail */}
        <Route path="/movies/:id" render={(props) =>
          <Movie {...props} user={user} />
        } />

        {/* Login */}
        <Route path="/login" render={(props) =>
          <Login {...props} login={login} />
        } />

        {/* Contact Page */}
        <Route path="/contactpage" component={ContactPage} />
      </Switch>
    </div>
  );
}

export default App;