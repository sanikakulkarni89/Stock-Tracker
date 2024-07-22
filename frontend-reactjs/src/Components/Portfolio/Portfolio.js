import React, { useState, useEffect } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function PortfolioComponent() {
  const [noStocks, setNoStocks] = useState(true);
  const [portfolioStocks, setPortfolioStocks] = useState([]);
  const [showBuySuccess, setShowBuySuccess] = useState(false);
  const [stockQuantity, setQuantity] = useState("");

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const [buyShow, setBuyShow] = useState(false);
  const handleBuyClose = () => setBuyShow(false);
  const handleBuyShow = () => setBuyShow(true);
  const onBuyClick = () => {
    console.log("Buy button clicked");
    handleBuyShow();
  };

  const [sellShow, setSellShow] = useState(false);
  const handleSellClose = () => setSellShow(false);
  const handleSellShow = () => setSellShow(true);
  
  const onSellClick = () => {
    console.log("Sell button clicked");
    handleSellShow();

    };

  const addToPortfolio = (ticker_id, stockQuantity) => {
    
    if (stockQuantity === "") {
      console.log("Please enter a valid quantity.");
      // clear stocks
      // localStorage.removeItem("portfolio");
      return;
    }

    console.log(
      "Add to portfolio button clicked: " + ticker_id + " " + stockQuantity
    );

    const existingStocks = localStorage.getItem("portfolio");
    const stocks = existingStocks ? JSON.parse(existingStocks) : [];
    const isStockPresent = stocks.some((stock) => stock.symbol === ticker_id);

    if (isStockPresent) {
      // Handle the case when the stock is already present
      console.log(`Stock ${ticker_id} is already present in the portfolio.`);
      
      // Update the quantity of the stock
      const updatedStocks = stocks.map((stock) => {
        if (stock.symbol === ticker_id) {
          stock.quantity = parseInt(stock.quantity) + parseInt(stockQuantity);
          stock.totalCost = parseInt(stock.totalCost) + parseInt(stockQuantity) * 10;
        }
        return stock;
      });

      // Save the updated stocks array back to the local storage
      localStorage.setItem("portfolio", JSON.stringify(updatedStocks));
    } 
    else 
    {
      // Add the new stock to the array
      const newStock = {
        symbol: ticker_id,
        quantity: stockQuantity,
        totalCost: stockQuantity * 10
      };
      stocks.push(newStock);

      // Save the updated stocks array back to the local storage
      localStorage.setItem("portfolio", JSON.stringify(stocks));

      // Optionally, you can perform any additional actions after adding the stock to the local storage
      handleBuyClose();
      setShowBuySuccess(true);
    }

    // Fetch and print out the stocks from local storage
    const updatedPortfolio = localStorage.getItem("portfolio");
    console.log("Updated Portfolio: " + updatedPortfolio);
  };

  useEffect(() => {
    const existingPortfolio = localStorage.getItem("portfolio");
    console.log("Existing Portfolio: " + existingPortfolio);
    

    if (existingPortfolio) {
      const portfolio = JSON.parse(existingPortfolio);

      if (portfolio.length === 0) {
        setNoStocks(true);
      } else {
        setNoStocks(false);

        setPortfolioStocks(portfolio);
        portfolio.forEach((stock) => {
            stock.iexData = null;
            // Promise.all([
            //     fetch(`http://localhost:8080/ticker/${stock.symbol}`).then((response) => response.json()),
            //     fetch(`http://localhost:8080/iex/${stock.symbol}`).then((response) => response.json()),
            // ])
            //     .then(([tickerData, iexData]) => {
            //     console.log("Ticker Data: ", tickerData);
            //     console.log("IEX Data: ", iexData);
            //     stock.tickerData = tickerData;
            //     stock.iexData = iexData;
            //     const updatedStock = { ...stock, tickerData, iexData };
            //     return updatedStock;
            //     })
            //     .then((updatedStock) => {
            //     console.log("Updated Stock: ", updatedStock);
            //     setPortfolioStocks(updatedStock);
            //     })
            //     .catch((error) => {
            //     console.log("Error fetching portfolio stocks:", error);
            //     });
            // 
            fetch(`http://localhost:8080/iex/${stock.symbol}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log("IEX Data: ");
                // console.log(data);
                stock.iexData = data;
                console.log("Stock Data: ");
                console.log(stock.iexData);
            });

        });
      }
    }
  }, []);

  return (
    <div>
        <Row>
        <Col>
          <Toast
            onClose={() => setShowBuySuccess(false)}
            show={showBuySuccess}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Congrats!</strong>
            </Toast.Header>
            <Toast.Body>You bought {stockQuantity} stocks!</Toast.Body>
          </Toast>
        </Col>
      </Row>

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
                  <Card.Header>
                    <Card.Title>NVDA</Card.Title>
                  </Card.Header>
                  
                  <Card.Body>
                    <div className="container">
                      <div className="row">
                        <div className="col">
                          <div className="row">
                            <div className="col left-align">
                              <div className="text-start">Quantity:</div>
                            </div>
                            <div className="col right-align">
                              <div className="text-end">10</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col left-align">
                              <div className="text-start">Avg. Cost/Share:</div>
                            </div>
                            <div className="col right-align">
                              <div className="text-end">474.94</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col left-align">
                              <div className="text-start">Total Cost:</div>
                            </div>
                            <div className="col right-align">
                              <div className="text-end">
                                {/* <script>alert({stock})</script> */}
                                {/* {stock.totalCost} */}
                                4749.4
                                </div>


                            </div>
                          </div>
                        </div>

                        
                        <div className="col">
                          <div className="row">
                            <div className="col left-align">
                              <div className="text-start">Change:</div>
                            </div>
                            <div className="col right-align">
                              <div className="text-end">+0.153
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col left-align">
                              <div className="text-start">Current Price:</div>
                            </div>
                            <div className="col right-align">
                              <div className="text-end">475.039</div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col left-align">
                              <div className="text-start">Market Value:</div>
                            </div>
                            <div className="col right-align">
                              <div className="text-end">475.039</div>
                            </div>
                          </div>
                        </div>
                       
                      </div>
                    </div>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      onClick={() => onBuyClick()}
                      style={{ marginRight: "10px" }}
                    >
                      Buy
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => onSellClick()}
                      // onClick={() => handleDelete(stock.symbol)}
                    >
                      Sell
                    </Button>
                  </Card.Footer>
                </Card>

      

      {/* Modal for buying stocks */}
      <Modal show={buyShow} onHide={handleBuyClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {id} */}
            ID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col curr">Current Price:</div>
            <div className="col price">10</div>
          </div>
          <div className="row">
            <div className="col quan">Quantity:</div>
            <div className="col">
              <input
                type="number"
                value={stockQuantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="container">
            <div className="row footer">
              <div className="col total_cost" style={{ paddingLeft: "0px" }}>
                <div className="row">
                  <div className="col cost">Total Cost:</div>
                  <div className="col cost">{stockQuantity * 10}</div>
                </div>
              </div>
              <div className="col buy_button d-flex justify-content-end">
                <Button
                  variant="primary"
                  color="success"
               //   onClick={() => addToPortfolio(id, stockQuantity)}
                >
                  BUY
                </Button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>



      {/* Modal for selling stocks */}
      <Modal show={sellShow} onHide={handleSellClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {id} */}
            ID
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col curr">Current Price:</div>
            <div className="col price">10</div>
          </div>
          <div className="row">
            <div className="col quan">Quantity:</div>
            <div className="col">
              <input
                type="number"
                value={stockQuantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="container">
            <div className="row footer">
              <div className="col total_cost" style={{ paddingLeft: "0px" }}>
                <div className="row">
                  <div className="col cost">Total Cost:</div>
                  <div className="col cost">{stockQuantity * 10}</div>
                </div>
              </div>
              <div className="col buy_button d-flex justify-content-end">
                <Button
                  variant="danger"
                  color="success"
               //   onClick={() => addToPortfolio(id, stockQuantity)}
                >
                  SELL
                </Button>
              </div>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PortfolioComponent;
