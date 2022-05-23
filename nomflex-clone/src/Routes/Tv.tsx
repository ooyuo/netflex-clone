import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useState } from "react";
import {useQuery} from "react-query"
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, getLatestMovies, getTopRatedMovies, upcomingMovies, getLatestTVShows, getAiringTVShows, getPopularTVShows, getTopRatedTVShows } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
    background: black;
    padding-bottom: 200px;
`;

const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Banner = styled.div<{bgphoto: string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,1)),
        url(${props=> props.bgphoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;

const Overview = styled.p`
    font-size: 30px;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{bgphoto: string}>`
  background-color: white;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  color: red;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

const MovieThema = styled.span`
    color: white;
    font-weight: bold;
    font-size: 20px;
`;

const rowVariants = {
    hidden: {
      x: window.outerWidth + 5,
    },
    visible: {
      x: 0,
    },
    exit: {
      x: -window.outerWidth - 5,
    },
  };

  const boxVariants = {
      nomal:{
          scale: 1,
      },
      hover:{
          scale: 1.3,
          y: -80,
          transition: {
              delay: 0.5,
              duration: 0.1,
              type: "tween",
          },
      },
  };

  const infoVariants = {
      hover :{
          opacity: 1,
          transition: {
              delay: 0.5,
              duration: 0.1,
              type: "tween",
          }
      }
  }

  const offset = 6;

function Tv() {
    const {data: latestTvData, isLoading: latestTvLoading} = useQuery(["tv", "latest"], getLatestTVShows);
    const {data: airingData, isLoading: airingTvLoading} = useQuery(["tv", "airing"], getAiringTVShows);
    const {data: popularData, isLoading: popularTvLoading} = useQuery(["tv", "popular"], getPopularTVShows);
    const {data: topRatedData, isLoading: topRatedLoading} = useQuery(["tv", "toprated"], getTopRatedTVShows);

    console.log(popularData)
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => setLeaving((prev) => !prev);
    const incraseIndex = () => {
        if(airingData) {
            if(leaving) return;
            toggleLeaving();
            const totalMovies = airingData.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };

    const navigate = useNavigate();
    const bigTvMatch = useMatch("/netflex-clone/tv/:tvId");
    console.log(bigTvMatch);

    const onTvBoxClicked = (tvId: number) => {
        navigate(`/netflex-clone/tv/${tvId}`);
    };

    const {scrollY} = useViewportScroll();
    const onOverlayClick = () => navigate(`/netflex-clone/tv`);


    const clickedAiringTv = bigTvMatch?.params.tvId &&
    airingData?.results.find((tv: { id: any; }) => String(tv.id) === bigTvMatch?.params.tvId);

    const clickedPopularTv = bigTvMatch?.params.tvId &&
    popularData?.results.find((tv: { id: any; }) => String(tv.id) === bigTvMatch?.params.tvId);

    const clickedTopRatedTv = bigTvMatch?.params.tvId &&
    topRatedData?.results.find((tv: { id: any; }) => String(tv.id) === bigTvMatch?.params.tvId);
    
        return (
        <Wrapper>
      {popularTvLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            onClick={incraseIndex}
            bgphoto={makeImagePath(airingData?.results[0].backdrop_path || "")}
          >
            <Title>{airingData?.results[0].title}</Title>
            <Overview>{airingData?.results[0].overview}</Overview>
          </Banner>
          
          <Slider>
          <MovieThema>yun님이 시청중인 콘텐츠</MovieThema>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                >
                    {airingData?.results
                        .slice(1)
                        .slice(offset*index, offset*index+offset)
                        .map((tv: any) => (
                            <Box
                                layoutId={tv.id + ""}
                                key={tv.id}
                                variants={boxVariants}
                                whileHover="hover"
                                onClick={() => onTvBoxClicked(tv.id)}
                                initial="normal"
                                transition={{type: "tween"}}
                                bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{tv.title}</h4>
                                </Info>
                            </Box>
                        ))
                    }
                </Row>
              </AnimatePresence>
              <div style={{paddingBottom: 250}}></div>
              <MovieThema>Popular Shows</MovieThema>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                >
                    {popularData?.results
                        .slice(1)
                        .slice(offset*index, offset*index+offset)
                        .map((tv: any) => (
                            <Box
                                layoutId={tv.id + ""}
                                key={tv.id}
                                variants={boxVariants}
                                whileHover="hover"
                                onClick={() => onTvBoxClicked(tv.id)}
                                initial="normal"
                                transition={{type: "tween"}}
                                bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{tv.title}</h4>
                                </Info>
                            </Box>
                        ))
                    }
                </Row>
              </AnimatePresence>
              <div style={{paddingBottom: 250}}></div>
              <MovieThema>Toprated Shows</MovieThema>
              <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
                <Row
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ type: "tween", duration: 1 }}
                    key={index}
                >
                    {topRatedData?.results
                        .slice(1)
                        .slice(offset*index, offset*index+offset)
                        .map((tv: any) => (
                            <Box
                                layoutId={tv.id + ""}
                                key={tv.id}
                                variants={boxVariants}
                                whileHover="hover"
                                onClick={() => onTvBoxClicked(tv.id)}
                                initial="normal"
                                transition={{type: "tween"}}
                                bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                            >
                                <Info variants={infoVariants}>
                                    <h4>{tv.title}</h4>
                                </Info>
                            </Box>
                        ))
                    }
                </Row>
              </AnimatePresence>
          
              </Slider>
              <AnimatePresence>
              {bigTvMatch ? (
              <>
                <Overlay
                    onClick={onOverlayClick}
                    exit={{opacity: 0}}
                    animate={{opacity:1}}
                />
                <BigMovie
                    style={{top: scrollY.get() + 100}}
                    layoutId={bigTvMatch.params.tvId}
                >
                    {clickedAiringTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedAiringTv.backdrop_path || clickedAiringTv.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedAiringTv.original_name}</BigTitle>
                      <BigOverview>{clickedAiringTv.overview}</BigOverview>
                    </>
                  )}
                  {clickedPopularTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedPopularTv.backdrop_path || clickedPopularTv.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedPopularTv.original_name}</BigTitle>
                      <BigOverview>{clickedPopularTv.overview}</BigOverview>
                    </>
                  )}
                  {clickedTopRatedTv && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedTopRatedTv.backdrop_path || clickedTopRatedTv.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedTopRatedTv.original_name}</BigTitle>
                      <BigOverview>{clickedTopRatedTv.overview}</BigOverview>
                    </>
                  )}
                  
                </BigMovie>
              </>  
              
              ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
    );
}
export default Tv;