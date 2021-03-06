import "./App4.css";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchVideos, fetchStreams } from "./actions";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import BodyRight from "./Body/BodyRight";
import BodyLeft from "./Body/BodyLeft";
import Modal from "./Modal";
import youtube from "./apis/youtube";
import history from "./history";

import StreamsCreate from "./components/Streams/StreamsCreate";
import StreamsDelete from "./components/Streams/StreamsDelete";
import StreamsEdit from "./components/Streams/StreamsEdit";
import StreamsShow from "./components/Streams/StreamsShow";
import GoogleAuth from "./Header";

import Search from "./components/Search/Search";

import { showModal } from "./actions";
const KEY = "AIzaSyAR4iYaiGT4oNWSkga37lDBzxqJLp0Rg70";
const clientId =
  "979708510452-oa44268dodlk7at65bponsb27c0utgn2.apps.googleusercontent.com";
const App4 = (props) => {
  //fetching videos from redux
  useEffect(() => {
    props.fetchStreams();
  }, []);
  // const [streams, setStreams] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  //Youtube API
  // const onSubmitForm = async (term) => {
  //   const response = await youtube.get("/search", {
  //     params: {
  //       part: "snippet",
  //       type: "video",
  //       maxResults: 20,
  //       key: KEY,
  //       q: term,f
  //     },
  //   });
  //   setVideos(response.data.items);
  // };
  // useEffect(() => {
  //   onSubmitForm("sky");
  // }, []);

  //Json API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("http://localhost:3001/videos");
  //     setVideos(response.data);
  //   };
  //   fetchData();
  // }, []);

  // const onVideoSelect = (streams) => {
  //   console.log(streams);
  //   props.showModal(true);
  //   props.selectVideo(streams);
  // };

  // const onPortalDismiss = () => {
  //   props.closeModal(false);
  //   history.push("/");
  // };

  return (
    <div>
      <Router history={history}>
        <div>
          <Header />
          {props.modal ? <Modal /> : null}

          <Switch>
            <Route exact path="/">
              <div className="app__body">
                <BodyLeft />
                <BodyRight streams={props.streams} />
              </div>
            </Route>
            <Route exact path="/streams/new">
              <div className="app__body">
                <StreamsCreate />
              </div>
            </Route>

            <Route exact path="/search">
              <div className="app__body">
                <BodyLeft />
                <Search />
              </div>
            </Route>
            <Route exact path="/streams/edit/:id" component={StreamsEdit} />
            <Route exact path="/streams/delete/:id" component={StreamsDelete} />
            <Route exact path="/streams/:id" component={StreamsShow} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    modal: state.modal.showModal,
  };
};

export default connect(mapStateToProps, {
  fetchStreams,
  showModal,
})(App4);
