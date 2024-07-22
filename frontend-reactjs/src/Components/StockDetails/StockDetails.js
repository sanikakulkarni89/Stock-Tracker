import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./StockDetails.css";
import { Tab, Tabs, Box, Button, colors } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import NewsDetailsComponent from "./NewsDetails";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { AiFillStar, AiOutlineStar, AiTwotoneStar} from "react-icons/ai";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

function StockDetailsComponent() {
  const { id } = useParams();
  const [tickerData, setTickerData] = useState(null);
  const [iexData, setIexData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [dailyChart, setDailyChartInfo] = useState(null);
  // const [chartData, setChartData] = useState(null);
  const [value, setValue] = useState("1");
  const [stockQuantity, setQuantity] = useState("");
  const [showBuySuccess, setShowBuySuccess] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const options = {
    title: {
      text: "Tiingo Chart",
    },
    series: [
      {
        name: "Close",
        data: dailyChart,
      },
    ],
  };

  useEffect(() => {
    // Perform API call here and set the data
    // http://localhost:8080/ticker/NVDA
    // fetch(`http://localhost:8080/ticker/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setTickerData(data);
    //     console.log("Data: ");
    //     console.log(data);
    //   });

    // fetch(`http://localhost:8080/iex/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setIexData(data);
    //     console.log("IEX Data: ");
    //     console.log(data);
    //   });

    fetch(`http://localhost:8080/news/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsData(data);
        console.log("News: ");
        console.log(data);
      });

    // fetch(`http://localhost:8080/dailyChart/${id}`)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("Daily Chart: ");
    //     console.log(data);
    //     const chartSeries = data.map((item) => ({
    //       x: formatDate(item.date),
    //       y: item.close,
    //     }));
    //     setDailyChartInfo(chartSeries);

    //   });


      // check if already in fav
      const existingFav = localStorage.getItem("fav");
      console.log("Existing Favs: " + existingFav);
      if (existingFav) {
        const fav = JSON.parse(existingFav);

        // Check if the curr_id already exists in the fav array
        const isAlreadyFav = fav.some((item) => item.symbol === id);
        if (isAlreadyFav) {
          console.log("Stock is already in favorites.");
          setIsFavorite(true);
        }
      }

  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getTime();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onBuyClick = () => {
    console.log("Buy button clicked");
    handleShow();
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
      handleClose();
      setShowBuySuccess(true);
    }

    // Fetch and print out the stocks from local storage
    const updatedPortfolio = localStorage.getItem("portfolio");
    console.log("Updated Portfolio: " + updatedPortfolio);
  };

  // Favorite button
  const addToFav = (curr_id) => {
    setIsFavorite(true);
    console.log("Add to fav button clicked- " + curr_id);
    // add the stock to local storage

    const existingFav = localStorage.getItem("fav");
    console.log("Existing Favs: " + existingFav);
    if (existingFav) {
      const fav = JSON.parse(existingFav);

      // Check if the curr_id already exists in the fav array
      const isAlreadyFav = fav.some((item) => item.symbol === curr_id);

      if (isAlreadyFav) {
        console.log("Stock is already in favorites.");
        // setIsFavorite(false);
        return; // Exit the function if already in favorites
      }
    }

    // Parse the existing fav as an array (or initialize an empty array if there are no existing fav)
    const fav = existingFav ? JSON.parse(existingFav) : [];
    const newFav = {
      symbol: curr_id,
    };

    fav.push(newFav);

    // Save the updated fav array back to the local storage
    localStorage.setItem("fav", JSON.stringify(fav));
    console.log("New Favs: " + fav);
    // setIsFavorite(true);
  };


  const removeFromFav = (curr_id) => {
    setIsFavorite(false);
    console.log("Remove from fav button clicked: " + curr_id);

    const existingFav = localStorage.getItem("fav");
    console.log("Existing Favs: " + existingFav);

    const fav = existingFav ? JSON.parse(existingFav) : [];
    const indexToRemove = fav.findIndex((item) => item.symbol === curr_id);

    if (indexToRemove !== -1) {
      fav.splice(indexToRemove, 1);
      localStorage.setItem("fav", JSON.stringify(fav));
    }
    console.log("New Favs: " + fav);
  };

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

      <div className="container"></div>

      {tickerData && iexData &&(
      <div className="container resultPage">
        <div className="row">
          <div className="col leftCol">
            <div className="container companyData">
              <div className="row">
                <div className="col-5">
                  <h1>
                    {/* ticker */}
                    {tickerData['ticker']}
                  </h1>
                </div>
                <div className="col">
                  <h5>
                    {/* yellow color star button */}
                    {isFavorite && (
                    <AiTwotoneStar
                      style={{
                        fill: "gold",
                      }}
                      size={"40px"}
                      onClick={() => removeFromFav(id)}
                    />)}
                    {!isFavorite && (
                    <AiOutlineStar
                      style={{
                        fill: "black",
                        size: "30px",
                      }}
                      size={"40px"}
                      onClick={() => addToFav(id)}
                    />
                    )}
                  </h5>
                </div>
              </div>

              <div className="row">
                <h3>
                  {/* name */}
                  {tickerData['name']}
                </h3>
              </div>

              <div className="row">
                <h5>
                  {/* exchangecode */}
                  {tickerData['exchangeCode']}
                </h5>
              </div>

              <div className="row">
                <Button
                  variant="contained"
                  color="success"
                  style={{ maxWidth: "10px", marginLeft: "10px" }}
                  onClick={() => onBuyClick()}
                >
                  Buy
                </Button>
              </div>
            </div>
          </div>

          {/* Modal for buying stocks */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{id}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col curr">Current Price:</div>
                <div className="col price">474.94</div>
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
                  <div
                    className="col total_cost"
                    style={{ paddingLeft: "0px" }}
                  >
                    <div className="row">
                      <div className="col cost">Total Cost:</div>
                      {/* <div className="col cost">{stockQuantity * 10}</div> */}
                      <div className="col cost">{474.94 * 10}</div>
                    </div>
                  </div>
                  <div className="col buy_button d-flex justify-content-end">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => addToPortfolio(id, stockQuantity)}
                    >
                      BUY
                    </Button>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </Modal>

          <div className="col rightCol">
            <div className="container stockValues">
              
              {/* if in profit */}
              { iexData[0]['last'] - iexData[0]['prevClose'] > 0 &&
              (
                <>
              <div className="row justify-content-end"
              style={{color:"green"}}>
                <h1>
                  {iexData[0]['last']}
                </h1>
              </div>
              <div className="row justify-content-end"
              style={{color:"green"}}>
                <div className="col">
                <BiSolidUpArrow
                  style={{
                    fill: "green",
                  }}
                  size={"20px"}
                />
                </div>
                <div className="col-4"><h3>
                  {/* Stock Points */}
                  {(iexData[0]['last'] - iexData[0]['prevClose']).toFixed(3)}
                </h3>
                </div>
              </div>
              </>)}

              {/* if in loss */}
              { iexData[0]['last'] - iexData[0]['prevClose'] < 0 &&
              (
                <>
              <div className="row justify-content-end"
              style={{color:"red"}}>
                <h1>
                  {/* Stock Value */}
                  {iexData[0]['last']}
                </h1>
              </div>
              <div className="row justify-content-end"
              style={{color:"red"}}
              >
                <div className="col">
                <BiSolidDownArrow
                  style={{
                    fill: "red",
                  }}
                  size={"20px"}
                />
                </div>
                <div className="col-5">
                  <h3>
                    {/* Stock Points */}
                    {(iexData[0]['last'] - iexData[0]['prevClose']).toFixed(3)} {' '}
                    {/* find percent reduction */}
                    ({((iexData[0]['last'] - iexData[0]['prevClose']) / iexData[0]['prevClose'] * 100).toFixed(3)}%)
                  </h3>
                </div>

              </div>
              </>)}

              <div className="row justify-content-end">
                <h6>
                  {/* {id} */}
                  {new Date().toLocaleDateString()} {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                </h6>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Box sx={{ width: "100%", typography: "body1", marginTop: "40px" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                sx={{
                  justifyContent: "space-evenly",
                  width: "100%",
                  maxWidth: "1000px",
                }}
              >
                <Tab label="Summary" value="1" sx={{ flex: 1 }} />
                <Tab label="Top News" value="2" sx={{ flex: 1 }} />
                <Tab label="Charts" value="3" sx={{ flex: 1 }} />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="container">
                <div className="row summary_content">
                  <div className="col summary_data">
                    <div className="row summary_data_price"
                    style={{marginLeft:"20px"}}>
                    <div className="col col1">
                  <div className="row">
                    High Price: {iexData[0]['high']}
                  </div>
                  <div className="row">
                    Low Price: {iexData[0]['low']}
                  </div>
                  <div className="row">
                    Open Price: {iexData[0]['open']}
                  </div>
                  <div className="row">
                    Close Price: {iexData[0]['prevClose']}
                  </div>
                  <div className="row">
                    Volume: {iexData[0]['volume']}
                  </div>
                </div>

                { iexData[0]['mid'] && (
                <div className="col col2">
                  <div className="row">
                    Mid Price: {iexData[0]['mid']}
                  </div>
                  <div className="row">
                    Ask Price: {iexData[0]['askPrice']}
                  </div>
                  <div className="row">
                    Ask Size: {iexData[0]['askSize']}
                  </div>
                  <div className="row">
                    Bid Price: {iexData[0]['bidPrice']}
                  </div>
                  <div className="row">
                    Bid Size: {iexData[0]['bidSize']}
                  </div>
                </div>
                )}
                    </div>

                    <div className="row summary_data_dec"
                    style={{textAlign:"center", marginTop:"40px"}}>
                      <h2>COMPANY DESCRIPTION</h2>
                      <h4>{tickerData['description']}</h4>
                    </div>
                  </div>

                  <div className="col summary_charts">
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={options}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">
              News
              {newsData && (
                <NewsDetailsComponent
                  // newsData={[
                  //   { id: 1, title: "Article 1" },
                  //   { id: 2, title: "Article 2" },
                  //   { id: 3, title: "Article 3" },
                  // ]}
                  newsData={newsData.articles}
                />
              )}
            </TabPanel>
            <TabPanel value="3">Web Development</TabPanel>
          </TabContext>
        </Box>
      </div>
      )} 
    </div>
  );
}

export default StockDetailsComponent;
