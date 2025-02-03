import React, { useState } from "react";
import SwipeCard from "./SwipeCard";
import "./App.css";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Dummy login logic; later connect to your backend.
    onLogin();
  };
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function Friends() {
  return (
    <div className="friends-container">
      <h2>Friends</h2>
      <p>Friend list functionality coming soon...</p>
    </div>
  );
}

function Filters() {
  return (
    <div className="filters-container">
      <h2>Cuisine Filters</h2>
      <p>Select your favorite cuisines:</p>
      <form>
        <label>
          <input type="checkbox" name="italian" /> Italian
        </label>
        <label>
          <input type="checkbox" name="mexican" /> Mexican
        </label>
        <label>
          <input type="checkbox" name="chinese" /> Chinese
        </label>
        {/* Additional cuisines can be added here */}
      </form>
    </div>
  );
}

function MapArea() {
  return (
    <div className="map-container">
      <h2>Map Area</h2>
      <p>Select your desired area for restaurants:</p>
      <div className="map-placeholder">
        Map placeholder
      </div>
    </div>
  );
}

function SwipeScreen() {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [cardKey, setCardKey] = useState(0);

  const handleSwipe = (direction) => {
    if (direction === "right") {
      setYesCount((prev) => prev + 1);
    } else if (direction === "left") {
      setNoCount((prev) => prev + 1);
    }
    // Increment key to remount SwipeCard (repopulating it)
    setCardKey((prev) => prev + 1);
  };

  return (
    <div>
      <div className="card-container">
        <SwipeCard key={cardKey} onSwipe={handleSwipe} />
      </div>
      <div className="counter-container">
        <p>Yes: {yesCount}</p>
        <p>No: {noCount}</p>
      </div>
    </div>
  );
}

function Navigation({ currentScreen, setScreen, onLogout }) {
  return (
    <nav className="nav-bar">
      <button onClick={() => setScreen("swipe")}>Swipe</button>
      <button onClick={() => setScreen("friends")}>Friends</button>
      <button onClick={() => setScreen("filters")}>Filters</button>
      <button onClick={() => setScreen("map")}>Map</button>
      <button onClick={onLogout}>Logout</button>
    </nav>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState("swipe");

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setScreen("login");
  };

  return (
    <div className="app-container">
      {loggedIn ? (
        <>
          <Navigation currentScreen={screen} setScreen={setScreen} onLogout={handleLogout} />
          {screen === "swipe" && <SwipeScreen />}
          {screen === "friends" && <Friends />}
          {screen === "filters" && <Filters />}
          {screen === "map" && <MapArea />}
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
