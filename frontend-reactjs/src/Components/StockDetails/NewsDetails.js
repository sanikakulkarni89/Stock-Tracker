import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import { FaTwitter, FaFacebook } from "react-icons/fa";

function formatDate(dateString) {
  console.log(dateString);
  const dateParts = dateString.substring(0, 10).split("-");
  console.log(dateParts);
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return formattedDate;
}

function NewsDetailsComponent({ newsData }) {
  const [selectedNews, setSelectedNews] = useState(null);

  const cardCloseHandler = () => {
    setSelectedNews(null);
  };

  const cardClickHandler = (news) => {
    setSelectedNews(news);
    console.log(news);
  };

  return (
    <div className="container newsPage">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {newsData.slice(0, 10).map((news, index) => (
          <div className="col-md-6" key={index}>
            <div className="card" onClick={() => cardClickHandler(news)}>
              <div className="row g-0 align-items-center">
                <div className="col-md-4">
                  <img
                    src={news.urlToImage}
                    alt="News"
                    className="img-fluid img-thumbnail rounded-start"
                    style={{
                      height: "80%",
                      width: "80%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h6 className="card-title">{news.title}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={selectedNews !== null} onHide={() => cardCloseHandler()}>
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="container heading"
            style={{marginLeft: "8px"
                }}>
            {selectedNews && <h2>{selectedNews.source.name}</h2>}
            {selectedNews && <h6>{formatDate(selectedNews.publishedAt)}</h6>}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container newsDetailsModal">
            <div className="row">
              {selectedNews && <h5>{selectedNews.title}</h5>}
            </div>
            <div className="row">
              {selectedNews && (
                <p>{selectedNews.content.substring(0, 151)}....</p>
              )}
            </div>
            <div className="row">
              {selectedNews && (
                <h6>
                  For more details click{" "}
                  <a href={`${selectedNews.url}`} target="_blank">
                    HERE
                  </a>
                </h6>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="social-icons">
            {selectedNews && (
              <a
                class="twitter-share-button"
                href={`https://twitter.com/intent/tweet?text=${selectedNews.title}%0A${selectedNews.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  className="twitter-icon"
                  color="#1DA1F2"
                  size={"40px"}
                  style={{ marginRight: "10px" }}
                />
              </a>
            )}

            {selectedNews && (
              <a
                target="_blank"
                href={`https://www.facebook.com/sharer/sharer.php?u=${selectedNews.url}`}
                class="fb-xfbml-parse-ignore"
              >
                <FaFacebook
                  className="facebook-icon"
                  color="#3b5998"
                  size={"40px"}
                  style={{ marginRight: "10px" }}
                />
              </a>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewsDetailsComponent;
