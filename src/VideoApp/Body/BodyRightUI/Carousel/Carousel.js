import React, { useEffect, useState, useRef } from "react";
import "./Carousel.css";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import _ from "lodash";
const Carousel = (props) => {
  const iframeRef = useRef();

  const styleRef = useRef();
  const [direction, setDirection] = useState("");
  const [loading, setLoading] = useState(true);

  const [getTwitchLiveStream, setGetTwitchLiveStream] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:5000/api/v1/twitch");
      setGetTwitchLiveStream(data);
    };
    fetchData();
  }, []);

  const [width, setWidth] = useState([
    { widthSize: "100%" },
    { widthSize: "100%" },
    { widthSize: "1300px" },
    { widthSize: "100%" },
    { widthSize: "100%" },
  ]);

  const determineWidth = (index) => {
    const num = width[index];
    // console.log(num.first);
    return num.widthSize;
  };

  const [cardDisplay, setCardDisplay] = useState([
    { display: "none" },
    { display: "none" },
    { display: "" },
    { display: "none" },
    { display: "none" },
  ]);
  const determineCard = (index, showAnimation) => {
    const num = cardDisplay[index];
    return num.display;
  };

  // const determineAuto = (index) => {
  //   const num = xAuto[index];

  //   return num.autoplay;
  // };
  const [autoPlay, setAutoPlay] = useState([
    { autoplay: "false" },
    { autoplay: "false" },
    { autoplay: "true" },
    { autoplay: "false" },
    { autoplay: "false" },
  ]);

  const determineAutoplay = (index, showAnimation) => {
    const num = autoPlay[index];
    return num.autoplay;
  };
  const determineStyle = (index, showAnimation) => {
    const num = xPos[index];

    if (showAnimation) {
      return {
        transform: `translateX(${num.first}) translateX(${num.second}) scale(${num.third})`,
        zIndex: `${num.fourth}`,
        WebkitTransition: "all 200ms linear",
        MozTransition: "all 200ms linear",
        msTransition: "all 200ms linear",
        OTransition: "all 200ms linear",
      };
    } else {
      return {
        zIndex: `${num.fourth}`,
        transform: `translateX(${num.first}) translateX(${num.second}) scale(${num.third})`,
      };
    }
  };

  const [xPos, setXPos] = useState([
    {
      first: "-528.7px",
      second: "50%",
      third: "0.7",
      fourth: "1",

      width: "600px",
      fitfh: "calc(50% - 375px)",
      img:
        "https://images.unsplash.com/photo-1579130781921-76e18892b57b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      first: "-264.35px",
      second: "25%",
      third: "0.85",
      fourth: "2",

      width: "600px",
      fitfh: "calc(50% - 375px)",
      img:
        "https://images.unsplash.com/flagged/photo-1564918031455-72f4e35ba7a6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      first: "0px",
      second: "0%",
      third: "1",
      fourth: "3",
      fitfh: "calc(50% - 375px)",
      img:
        "https://images.unsplash.com/photo-1566522650166-bd8b3e3a2b4b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
      width: "600px",
    },
    {
      first: "264.35px",
      second: "-25%",
      third: "0.85",
      fourth: "2",
      fifth: "none",
      width: "600px",
      img:
        "https://images.unsplash.com/photo-1581836499506-4a660b39478a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
    {
      first: "528.7px",
      second: "-50%",
      third: "0.7",
      fourth: "1",
      fifth: "none",
      width: "600px",
      img:
        "https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ",
    },
  ]);
  const moveLeft = () => {
    // let autoPlayCopyLeft = autoPlay.slice();
    // autoPlayCopyLeft.unshift(autoPlayCopyLeft.pop());
    // setAutoPlay(autoPlayCopyLeft);

    let cardLeftDisplayCopy = cardDisplay.slice();
    cardLeftDisplayCopy.unshift(cardLeftDisplayCopy.pop());
    setCardDisplay(cardLeftDisplayCopy);

    // let widthLeftCopy = width.slice();
    // widthLeftCopy.unshift(widthLeftCopy.pop());
    // setWidth(widthLeftCopy);

    let xLeftPosition = xPos.slice();
    xLeftPosition.unshift(xLeftPosition.pop());
    setXPos(xLeftPosition);
    setDirection("left");
  };

  const moveRight = () => {
    // let autoPlayCopyRight = autoPlay.slice();
    // autoPlayCopyRight.push(autoPlayCopyRight.shift());
    // setAutoPlay(autoPlayCopyRight);

    let cardRightDisplayCopy = cardDisplay.slice();
    cardRightDisplayCopy.push(cardRightDisplayCopy.shift());
    setCardDisplay(cardRightDisplayCopy);

    // let widthRightCopy = width.slice();
    // widthRightCopy.push(widthRightCopy.shift());
    // setWidth(widthRightCopy);

    let XRightPosition = xPos.slice();
    XRightPosition.push(XRightPosition.shift());
    setXPos(XRightPosition);
    setDirection("right");
  };

  const hideLoading = () => {
    setLoading(false);
  };

  const checkTags = (streams, i) => {
    if (streams.localization_names.length !== 1) {
      let a = _.mapKeys(streams.localization_names, "en-us");
      let b = Object.keys(a);
      return (
        <>
          {b.map((e, i) => {
            return (
              <Link
                style={{ marginLeft: 2, maxWidth: 90 }}
                className="channel__tag__anchor"
                key={i}
              >
                {e}
              </Link>
            );
          })}
        </>
      );
    }
    return (
      <Link
        style={{ marginLeft: 2, maxWidth: 90 }}
        className="channel__tag__anchor"
      >
        {streams.localization_names[0]["en-us"]}
      </Link>
    );
  };

  const checkViewers = (views) => {
    if (views <= 999) {
      return <>{`${views} viewers`}</>;
    } else if (views < 999999) {
      return (
        <>{`${
          Math.sign(views) * (Math.abs(views) / 1000).toFixed(1)
        }K viewers`}</>
      );
    } else if (views <= 9999999) {
      return (
        <>{`${
          Math.sign(views) * (Math.abs(views) / 1000000).toFixed(1)
        }M viewers`}</>
      );
    }
  };
  // console.log(xAuto)
  return (
    <div className="carousel">
      <div className="button">
        <button className="btn left" onClick={moveRight}>
          ‹
        </button>
        <button className="btn right" onClick={moveLeft}>
          ›
        </button>
      </div>

      <div ref={styleRef} className="slides">
        {getTwitchLiveStream.map((streams, i) => {
          const showAnimation = direction === "right" || direction === "left";
          const position = "animate absolute image";
          const imgStyle = determineStyle(i, showAnimation);

          const AutoStyle = determineAutoplay(i);

          const AutoCard = determineCard(i);
          const AutoWidth = determineWidth(i);
          return (
            <div style={imgStyle} key={i} className="slide">
              <iframe
                // autoplay={`${AutoStyle}`}
                onLoad={hideLoading}
                // ref={iframeRef}
                // loading="lazy"
                // rel="preload"
                className="app__iframe app__order__1"
                // className="loading live"
                width="1527.3px"
                // width="100%"
                // width={`${AutoWidth}`}
                height="300px"
                src={`https://player.twitch.tv/?channel=${streams.user_name}&muted=true&autoplay=${AutoStyle}&parent=localhost`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {loading ? <div className="loading"></div> : null}
              <div
                style={{ display: `${AutoCard}` }}
                className="image__card app__order__2"
              >
                <div className="card__display__flex__direction__margin app__card__height app__width">
                  <div
                    className="app__order__1 app__flex__start"
                    // image__card__upper
                  >
                    <div className="app__flex__grow__0 app__flex__shrink__0">
                      {" "}
                      <Link className="">
                        <img
                          src={streams.profile_image_url}
                          alt="streamJPG"
                          className="image__card__upper__image"
                        />
                      </Link>
                    </div>{" "}
                    <div className="app__min__width__0 app__order__2 app__flex__shrink__1 app__flex__grow__1 app__width app__flex__column app__flex app__margin__left__8">
                      <div className="app__margin__negative__bottom">
                        <div className="app__flex__start">
                          <h3 className="app__font__weight ">
                            <Link className="app__font__color app__font__size__0_8">
                              {streams.user_name}
                            </Link>
                          </h3>
                        </div>
                      </div>
                      <div className="app__flex__start">
                        <h5 className=" app__font__size__0_8">
                          <Link to="/" className="app__font__color">
                            {streams.game_name}
                          </Link>
                        </h5>
                      </div>
                      <div className="">
                        <h5>
                          <Link className="app__font__7__color">
                            {checkViewers(streams.viewer_count)}
                          </Link>
                        </h5>{" "}
                      </div>
                    </div>
                  </div>

                  <div className="channel__tag__2 app__order__2 channel__tag__1">
                    <div className="channel__tag__3">{checkTags(streams)}</div>
                  </div>
                  <div style={{ width: "90%" }} className="app__order__3">
                    {/* image__card__bottom */}{" "}
                    <Link>{streams.description}</Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
