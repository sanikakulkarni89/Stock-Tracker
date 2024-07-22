import React, { useEffect, useState } from "react";
import axios from "axios";
import "./search.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom"

function SearchComponent({ history }) {
  // const data = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight'];

  const [stocks, setStocks] = useState([]);
  const [autoCompleteTerm, setAutoCompleteTerm] = useState([]);
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    if (text == "") {
      setAutoCompleteTerm([]);
      // setLoading(false);
    }
    if (text && text.length < 1) {
      setAutoCompleteTerm([]);
      // setLoading(false);
    }
    if (text != "" && text && text.length >= 1) {
      const autoComplete = async () => {
        const res = await axios.get(
          "http://localhost:8080/autocomplete/" + text
        );
        console.log(JSON.parse(res.data));
        setAutoCompleteTerm(JSON.parse(res.data));
        // setLoading(false);
      };
      autoComplete();
    }
  }, [text]);



  const onSuggestHandler = (text) => {
    setText(text);
    setAutoCompleteTerm([]);
  };

  const onChangeHandler = (text) => {
    if (text.length > 0) {
      // loadSuggestions(text);
    }

    setText(text);
  };




  const changePage = () => {
    // Function to be executed when the button is clicked
    console.log('Button clicked!');
    const dynamicPageId = 123; // Replace with the desired dynamic page ID
    // history.push("/details/" + "");
    navigate("/details/" + text)
  };





  return (
    <div className="entire-component" style={{ display: "flex" }}>
      <div className="container mt-5">
        <h1 className="text-center">Search for Stocks</h1>
        <div className="row mt-5">
          {/* <div className="col-md-6 offset-md-3">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter a search query" />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">Search</button>
            </div>
          </div>
        </div> */}

          <div className="container form">

          
            <div className="row justify-content-center">
              {/* <div class="col-md-4 col-md-offset-4"> */}
              <input
                type="text"
                className="inputBox col col-md-6"
                onChange={(e) => onChangeHandler(e.target.value)}
                value={text}
                onBlur={() => {
                  setTimeout(() => {
                    setAutoCompleteTerm([]);
                  }, 100);
                }}
              />

              <div className="row justify-content-center">
              {autoCompleteTerm &&
                autoCompleteTerm.map((term, i) => (
                  <div
                    key={i}
                    onClick={() => onSuggestHandler(term.ticker)}
                    className="suggestion col col-md-6"
                    style={{ marginLeft: '1px' }}
                  >
                    <b>{term.ticker}</b>| {term.name}
                  </div>
                ))}

              </div>
            </div>
            
            <div className="row justify-content-center">
              <div className="col col-auto" style={{marginTop: "20px"}}>
                <Button variant="primary" size="sm" onClick={changePage}>
                  Search Stocks!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
