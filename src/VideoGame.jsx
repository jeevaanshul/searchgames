import "./VideoGame1.css";
import { useState, useEffect } from "react";

const VideoGame = () => {
  const [gameTitle, setGameTitle] = useState("");
  const [searchedGame, setSearchedGame] = useState([]);
  const [gameDeals, setGameDeals] = useState([]);
  const [id, setId] = useState(1);

  const searchGame = () => {
    fetch(
      `https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=4`
    ).then((response) => response.json().then((data) => setSearchedGame(data)));
  };

  useEffect(() => {
    fetch(
      `https://www.cheapshark.com/api/1.0/deals?storeID=${id}&upperPrice=10&pageSize=10`
    )
      .then((response) => response.json())
      .then((data) => setGameDeals(data));
  }, [id]);

  return (
    <div className="App">
      <div className="searchSection">
        <h1>Search for a game</h1>
        <input
          onChange={(e) => setGameTitle(e.target.value)}
          type="text"
          placeholder="Grand Theft Auto..."
        />
        <button onClick={searchGame}>Search game title</button>
        <br />
        <button onClick={() => setId((id) => id + 1)}>more deals</button>
        <div className="games">
          {searchedGame.map((game) => (
            <div className="game" key={game.gameID}>
              {game.external}
              <img src={game.thumb} alt={game.external} />
              <h3>{game.cheapest}$</h3>
            </div>
          ))}
        </div>
      </div>
      <div className="dealsSection">
        <h2>Latest Deals</h2>
        {gameDeals.map((deal) => (
          <div className="game" id="deals" key={deal.gameID}>
            <h2>{deal.title}</h2>
            <img src={deal.thumb} alt={deal.title} />
            <h3 style={{ color: "red" }}>
              Meta critic score: {deal.metacriticScore}
            </h3>
            <p>Normal Pricing: {deal.normalPrice}$</p>
            <p>Sale Price: {deal.salePrice}$</p>
            <p>Savings: {deal.savings.substr(0, 2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGame;

// https://www.cheapshark.com/api/1.0/games?title=mine&limit=4

//
