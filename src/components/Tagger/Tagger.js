import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React, { useState, useEffect } from "react";
import Card from "./Card/Card";
import {TopBar} from "../Navbar/TopBar";
import "./Tagger.css";
import { auto } from "@popperjs/core";
import NorthWestIcon from "@mui/icons-material/NorthWest";

function Tagger() {
  const [texts, setTexts] = useState([]);
  const [idCollection, setIdCollection] = useState(
    `${process.env.REACT_APP_COLLECTION_ID}`
  );

  var myHeaders = new Headers();
  const token = localStorage.getItem("USER_TOKEN");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const requestData = async () =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/collection/id/${process.env.REACT_APP_COLLECTION_ID}`,
      requestOptions
    ).then((response) => {
      return response.json();
    });

  const getCollectionTags = () => {
    var myHeaders = new Headers();
    const token = localStorage.getItem("USER_TOKEN");

    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(
      `${process.env.REACT_APP_API_URL}/collection/info/${process.env.REACT_APP_COLLECTION_ID}`,
      requestOptions
    ).then((response) => {
      response
        .json()
        .then(
          (response) => localStorage.setItem("localTags", response?.tags),
        );
    });
  };

  useEffect(() => {
    getCollectionTags();
    requestData().then((response) => {
      let array = [];
      for (let i = 0; i < response.length; i++) {
        let object = {
          _id: response[i]._id,
          filename: `${process.env.REACT_APP_API_URL}/textFiles/${response[i].filename}`,
          content: response[i].content,
          tag: response[i].tag,
        };
        array.push(object);
      }

      if (JSON.stringify(texts) !== JSON.stringify(array)) {
        setTexts(array);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(texts), process.env.REACT_APP_COLLECTION_ID]);

  return (
    <>
      <div>
        <div>
        <TopBar />
          <div className="col-lg-14 col-12">
            <div
              className="row"
              style={{ margin: auto, marginTop: 5, marginLeft: 2 }}
            >
              <Card
                page="/"
                results={texts}
                setIdCollection={setIdCollection}
              />
            </div>
          </div>
        </div>
      </div>
      {idCollection === "" && (
        <div style={{ marginLeft: 400 }}>
          <NorthWestIcon style={{ width: 100, height: 100 }} />
          <h1> Select a collection </h1>
        </div>
      )}
    </>
  );
}

export default Tagger;
