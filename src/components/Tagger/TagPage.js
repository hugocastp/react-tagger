import React, { useState, useEffect } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { Card, CardGroup } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import { TopBar } from "../Navbar/TopBar";
import styles from "./Card/Card.module.scss";
import Button from "@mui/material/Button";
import DropdownTags from "../Dropdown/DropdownTags";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const TagPage = () => {
  const [testTaken, setTestTaken] = useState(false);
  const [texts, setTexts] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [handleTag, setHandleTag] = useState(false);
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState(["tag1", "tag2", "tag3"]);
  var myHeaders = new Headers();
  const token = localStorage.getItem("USER_TOKEN");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");
  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const requestCollection = async () =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/collection/id/${process.env.REACT_APP_COLLECTION_ID}`,
      requestOptions
    ).then((response) => {
      return response.json();
    });

  const requestCollectionTest = async () =>
    await fetch(
      `${process.env.REACT_APP_API_URL}/collection/id/${process.env.REACT_APP_COLLECTION_TEST_ID}`,
      requestOptions
    ).then((response) => {
      return response.json();
    });

  const getCollectionTags = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/collection/info/${process.env.REACT_APP_COLLECTION_ID}`,
      requestOptions
    ).then((response) => {
      response
        .json()
        .then((response) => {
          localStorage.setItem("localTags", response?.tags)
          setTags(response?.tags);
        });
    });

  };
  const cleanTags = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/collection/clean/${process.env.REACT_APP_COLLECTION_TEST_ID}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
        },
      }
    ).then((response) => {
      response.json();
    });
  };

  const addTag = async () => {
    if (selectedTag === "" || selectedTag === undefined) {
      confirmAlert({
        title: "No tag selected",
        message: "Text was not tagged",
        buttons: [
          {
            label: "Accept",
            onClick: () => { },
          },
        ],
      });
    } else {
      let raw = JSON.stringify({
        tag: selectedTag,
      });
      try {
        if (texts.length !== 0) {
          await fetch(
            `${process.env.REACT_APP_API_URL}/texts/${texts[0]._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("USER_TOKEN")}`,
              },
              body: raw,
            }
          );
          setHandleTag(!handleTag);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getCollectionTags();
    console.log("TEST TAKEN ", testTaken);
    if (testTaken) {
      requestCollection().then((response) => {
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
        array = array.filter((y) => y.tag === undefined || y.tag === "");
        if (JSON.stringify(texts) !== JSON.stringify(array)) {
          setTexts(array);
        }
      });
    } else {
      setMessage("Por favor, tome el test primero.");
      requestCollectionTest().then((response) => {
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
        array = array.filter((y) => y.tag === undefined || y.tag === "");
        if (array.length === 0) {
          setMessage("");
          alert("Test finalizado satisfactoriamente.");
          cleanTags();
          setTestTaken(true);
        }
        if (JSON.stringify(texts) !== JSON.stringify(array)) {
          setTexts(array);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(texts),
    testTaken,
    process.env.REACT_APP_COLLECTION_ID,
    process.env.REACT_APP_COLLECTION_TEST_ID,
    handleTag,
    selectedTag,
    message
  ]);

  return (
    <>
      <TopBar />
      <div className={`${styles.pDetails}`}>
      <CardGroup>
          <Card
            className="text-center"
            style={{
              margin: "10px 1%",
              border: "0.1px gray",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Title>
                <h2> {message} </h2>
                <h5>Guía de anotación </h5>
              </Card.Title>
              <ul>
                <li>
                  <Card.Text>
                    Seleccione la categoría correspondiente al texto utilizando
                    la lista desplegable.
                  </Card.Text>
                </li>
                <li>
                  <Card.Text>
                    Una vez seleccionada la categoría pulse el botón ETIQUETAR.
                  </Card.Text>
                </li>
              </ul>
            </Card.Body>
          </Card>

          <Card
            className="text-center"
            style={{
              margin: "10px 1%",
              border: "0.1px solid gray",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <Card.Text style={{ height: "600px", overflowY: "scroll" }}>
                {texts[0]?.content}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className="text-center"
            style={{
              margin: "10px 1%",
              border: "0.1px  gray",
              borderRadius: "10px",
            }}
          >
            <Card.Body>
              <div className={`${styles.row}`}>
                <DropdownTags
                  tags={tags}
                  setSelectedTag={setSelectedTag}
                />
              </div>
              <br />
              <div className={`${styles.row}`}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={addTag}
                  startIcon={<LocalOfferIcon />}
                >
                  ETIQUETAR
                </Button>
              </div>
              <div className={`${styles.row}`}>
                Textos restantes:{texts.length}
              </div>
            </Card.Body>
          </Card>
        </CardGroup>
      </div>
    </>
  );
};

export default TagPage;
