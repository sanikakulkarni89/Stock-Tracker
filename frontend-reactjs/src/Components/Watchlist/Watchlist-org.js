import React, { useEffect, useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

function WatchlistComponent() {
  const [favoriteStocks, setFavoriteStocks] = useState([]);
  const [noStocks, setNoStocks] = useState(true);
  const [tickerData, setTickerData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const existingFav = localStorage.getItem("fav");
    console.log(existingFav);
    
    if (existingFav) {
      const fav = JSON.parse(existingFav);
      const sortedFav = fav.sort((a, b) => a.symbol.localeCompare(b.symbol));
      
      if (sortedFav.length == 0) setNoStocks(true);
      else setNoStocks(false);

      sortedFav.forEach((stock) => {
        // stock.iexData = null;
        fetch(`http://localhost:8080/iex/${stock.symbol}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log("IEX Data: ");
            // console.log(data);
            stock.iexData = data;
            console.log("Stock Data: ");
            console.log(stock.iexData);
        });
        // http://localhost:8080/ticker/NVDA
        fetch(`http://localhost:8080/ticker/${stock.symbol}`)
          .then((response) => response.json())
          .then((data) => {

            setTickerData(data);
            stock.tickerData = data;
            console.log("Data: ");
            console.log(data);
          });
      });

      setFavoriteStocks(sortedFav);
    } 

    console.log("No Stocks: " + noStocks);
  }, []);


  const handleDelete = (symbol) => {
    const existingFav = localStorage.getItem("fav");
    if (existingFav) {
      const fav = JSON.parse(existingFav);
      const updatedFav = fav.filter((stock) => stock.symbol !== symbol);
      localStorage.setItem("fav", JSON.stringify(updatedFav));
      setFavoriteStocks(updatedFav);

      if (updatedFav.length == 0) setNoStocks(true);
      else setNoStocks(false);
    }
  };

  const handleCardClick = (symbol) => {
    console.log("Card Clicked: " + symbol);
    navigate(`/details/${symbol}`);
  };

  return (
    <div>

      {noStocks && (
        <div>
          <Card
            style={{
              marginRight: "20px",
              marginLeft: "20px",
              marginTop: "10px",
              maxWidth: "70%",
            }}
          >
            <Card.Body>No stocks in watchlist</Card.Body>
          </Card>
        </div>
      )}

                
            <Card
                style={{
                  marginRight: "20px",
                  marginLeft: "20px",
                  marginTop: "10px",
                  maxWidth: "70%",
                }}
                className="mx-auto"
              >
                <Card.Body>
                  {/* bootstrap data into 3 columns */}
                  <div className="container">
                    <div className="row">
                      <div className="col d-flex flex-column align-items-center">
                        <h1>"NVDA</h1>
                        
                        <h6>NVIDIA Corp</h6>
                        
                      </div>
                      <div className="col d-flex flex-column align-items-center">
                        <>
                            <h1>470.77</h1>
                            <h2>-4.170 (-0.878%)</h2>
                        </>
                        {stock.iexData && (
                            <>
                             { stock.iexData[0]['last'] - stock.iexData[0]['prevClose'] > 0 &&
                             (
                               <>
                             <div className="row justify-content-start"
                             style={{color:"green"}}>
                               <h1>
                                 {stock.iexData[0]['last']}
                               </h1>
                             </div>
                             <div className="row"
                             style={{color:"green"}}>
                               <div className="col-2">
                               <BiSolidUpArrow
                                 style={{
                                   fill: "green",
                                 }}
                                 size={"15px"}
                               />
                               </div>
                               <div className="col-10">
                                <h5>
                                 {/* Stock Points */}
                                 {(stock.iexData[0]['last'] - stock.iexData[0]['prevClose']).toFixed(3)} {' '}
                                 ({((stock.iexData[0]['last'] - stock.iexData[0]['prevClose']) / stock.iexData[0]['prevClose'] * 100).toFixed(3)}%)
                               </h5>
                               </div>
                             </div>
                             </>)}
               
                             {/* if in loss */}
                             { stock.iexData[0]['last'] - stock.iexData[0]['prevClose'] < 0 &&
                             (
                               <>
                             <div className="row justify-content-start"
                             style={{color:"red"}}>
                               <h1>
                                 {/* Stock Value */}
                                 {stock.iexData[0]['last']}
                               </h1>
                             </div>
                             <div className="row "
                             style={{color:"red"}}
                             >
                               <div className="col-2">
                               <BiSolidDownArrow
                                 style={{
                                   fill: "red",
                                 }}
                                 size={"15px"}
                               />
                               </div>
                               <div className="col-10">
                                 <h5>
                                   {/* Stock Points */}
                                   {(stock.iexData[0]['last'] - stock.iexData[0]['prevClose']).toFixed(3)} {' '}
                                   {/* find percent reduction */}
                                   ({((stock.iexData[0]['last'] - stock.iexData[0]['prevClose']) / stock.iexData[0]['prevClose'] * 100).toFixed(3)}%)
                                 </h5>
                               </div>
               
                             </div>
                             </>)}
                             </>
                            )}


                      </div>
                      <div className="col d-flex flex-column align-items-center">
                        <div className="row d-flex flex-column align-items-center"
                        style={{maxWidth:"100px"}}>
                          <Button
                            variant="primary"
                            onClick={() => handleCardClick(stock.symbol)}
                            style={{ marginBottom: "10px" }}
                          >
                            Open
                          </Button>
                        </div>
                        <div className="row d-flex flex-column align-items-center"
                        style={{maxWidth:"100px"}}>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(stock.symbol)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>


      {!noStocks && tickerData && (
        <ListGroup>
          {favoriteStocks.map((stock) => (
            <ListGroup.Item
              key={stock.id}
              style={{ border: "none", alignItems: "center" }}
            >
              <Card
                style={{
                  marginRight: "20px",
                  marginLeft: "20px",
                  marginTop: "10px",
                  maxWidth: "70%",
                }}
                className="mx-auto"
              >
                <Card.Body>
                  {/* bootstrap data into 3 columns */}
                  <div className="container">
                    <div className="row">
                      <div className="col d-flex flex-column align-items-center">
                        <h1>{stock.symbol}</h1>
                        {stock.tickerData && (
                        <h6>{stock.tickerData.name}</h6>
                        )}
                        {!stock.tickerData && (
                            <h2>abc</h2>
                        )}
                      </div>
                      <div className="col d-flex flex-column align-items-center">
                        
                        {!stock.iexData && (
                        <>
                            <h1>Ticker Score</h1>
                            <h2>Up and Down </h2>
                        </>
                        )}

                        {stock.iexData && (
                            <>
                             { stock.iexData[0]['last'] - stock.iexData[0]['prevClose'] > 0 &&
                             (
                               <>
                             <div className="row justify-content-start"
                             style={{color:"green"}}>
                               <h1>
                                 {stock.iexData[0]['last']}
                               </h1>
                             </div>
                             <div className="row"
                             style={{color:"green"}}>
                               <div className="col-2">
                               <BiSolidUpArrow
                                 style={{
                                   fill: "green",
                                 }}
                                 size={"15px"}
                               />
                               </div>
                               <div className="col-10">
                                <h5>
                                 {/* Stock Points */}
                                 {(stock.iexData[0]['last'] - stock.iexData[0]['prevClose']).toFixed(3)} {' '}
                                 ({((stock.iexData[0]['last'] - stock.iexData[0]['prevClose']) / stock.iexData[0]['prevClose'] * 100).toFixed(3)}%)
                               </h5>
                               </div>
                             </div>
                             </>)}
               
                             {/* if in loss */}
                             { stock.iexData[0]['last'] - stock.iexData[0]['prevClose'] < 0 &&
                             (
                               <>
                             <div className="row justify-content-start"
                             style={{color:"red"}}>
                               <h1>
                                 {/* Stock Value */}
                                 {stock.iexData[0]['last']}
                               </h1>
                             </div>
                             <div className="row "
                             style={{color:"red"}}
                             >
                               <div className="col-2">
                               <BiSolidDownArrow
                                 style={{
                                   fill: "red",
                                 }}
                                 size={"15px"}
                               />
                               </div>
                               <div className="col-10">
                                 <h5>
                                   {/* Stock Points */}
                                   {(stock.iexData[0]['last'] - stock.iexData[0]['prevClose']).toFixed(3)} {' '}
                                   {/* find percent reduction */}
                                   ({((stock.iexData[0]['last'] - stock.iexData[0]['prevClose']) / stock.iexData[0]['prevClose'] * 100).toFixed(3)}%)
                                 </h5>
                               </div>
               
                             </div>
                             </>)}
                             </>
                            )}


                      </div>
                      <div className="col d-flex flex-column align-items-center">
                        <div className="row d-flex flex-column align-items-center"
                        style={{maxWidth:"100px"}}>
                          <Button
                            variant="primary"
                            onClick={() => handleCardClick(stock.symbol)}
                            style={{ marginBottom: "10px" }}
                          >
                            Open
                          </Button>
                        </div>
                        <div className="row d-flex flex-column align-items-center"
                        style={{maxWidth:"100px"}}>
                          <Button
                            variant="danger"
                            onClick={() => handleDelete(stock.symbol)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default WatchlistComponent;
