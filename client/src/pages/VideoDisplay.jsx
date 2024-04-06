// import React, { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/contant";

// function VideoDisplay() {
//   useEffect(() => {
//     getVideos();
//   }, []);

//   const getVideos = async () => {
//     await axios
//       .get(`${BASE_URL}/api/videos`)
//       .then((response) => {
//         console.log(response);
//         setVideos(response.data.urls);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const [videos, setVideos] = useState([]);
//   return (
//     <>
//       <div className="d-flex flex-wrap ">
//         {videos.map((url) => {
//           return (
//             <div className="aspect-video">
//               <video
//                 class="w-full aspect-video object-cover"
//                 controls
//                 src={url}
//                 type="video/mp4"
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default VideoDisplay;

// import React, { useState, useRef } from "react";
// import { useEffect } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/contant";

// function VideoDisplay() {
//   useEffect(() => {
//     getVideos();
//   }, []);

//   const getVideos = async () => {
//     await axios
//       .get(`${BASE_URL}/api/videos`)
//       .then((response) => {
//         console.log(response);
//         setVideos(response.data.urls);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   const [videos, setVideos] = useState([]);
//   const videoRefs = useRef([]);

//   const handleTimeUpdate = (index) => {
//     const currentVideo = videoRefs.current[index];
//     if (currentVideo) {
//       console.log("Played duration:", currentVideo.currentTime);
//       // You can do further processing with the played duration here
//     }
//   };

//   return (
//     <>
//       <div className="d-flex flex-wrap ">
//         {videos.map((url, index) => {
//           return (
//             <div key={index} className="aspect-video">
//               <video
//                 className="w-full aspect-video object-cover"
//                 controls
//                 src={url}
//                 type="video/mp4"
//                 ref={(el) => (videoRefs.current[index] = el)}
//                 onTimeUpdate={() => handleTimeUpdate(index)}
//               >
//                 Your browser does not support the video tag.
//               </video>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default VideoDisplay;

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contant";

function VideoDisplay() {
  const [videos, setVideos] = useState([]);
  const [playedDurations, setPlayedDurations] = useState([]);
  const videoRefs = useRef([]);

  useEffect(() => {
    getVideos();
    getQuestines();
  }, []);

  const getVideos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/videos`);
      setVideos(response.data.urls);
      setPlayedDurations(new Array(response.data.urls.length).fill(0));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTimeUpdate = (index) => {
    const currentVideo = videoRefs.current[index];
    if (currentVideo) {
      const newPlayedDurations = [...playedDurations];
      newPlayedDurations[index] = currentVideo.currentTime;
      setPlayedDurations(newPlayedDurations);
    }
  };

  const getTotalDuration = () => {
    return videos.reduce((total, url, index) => {
      const video = videoRefs.current[index];
      return total + (video ? video.duration : 0);
    }, 0);
  };

  const getTotalPlayedDuration = () => {
    return playedDurations.reduce((total, duration) => {
      return total + duration;
    }, 0);
  };

  const getQuestines = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/questons`);
      console.log(response.data.questines);
      setQuestines(response.data.questines);
    } catch (error) {
      console.log(error);
    }
  };

  const answersClick = (index) => {
    if (index === 0) {
      setScore(score + 10);
    }
  };

  const [questines, setQuestines] = useState([]);
  const [score, setScore] = useState(null);
  return (
    <>
      <div className="d-flex flex-wrap ">
        {videos.map((url, index) => {
          return (
            <div key={index} className="aspect-video">
              <video
                className="w-full aspect-video object-cover"
                controls
                src={url}
                type="video/mp4"
                ref={(el) => (videoRefs.current[index] = el)}
                onTimeUpdate={() => handleTimeUpdate(index)}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          );
        })}
      </div>
      {/* <div>Total Duration: {getTotalDuration()} seconds</div>
      <div>Total Played Duration: {getTotalPlayedDuration()} seconds</div> */}
      <div>Score : {score}</div>
      <div>
        {getTotalDuration() === getTotalPlayedDuration() ? (
          <>
            {questines.map((val) => {
              return (
                <>
                  <h2>{val.questine}</h2>
                  <div class="container twidth make-flex">
                    <p id="question"></p>
                    <div class="optnContainer make-flex">
                      {val.answers.map((ans, index) => {
                        return (
                          <p
                            id="optn1"
                            class="answer"
                            style={{ cursor: "pointer" }}
                            onClick={() => answersClick(index)}
                          >
                            {ans}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </>
              );
            })}
          </>
        ) : (
          "Total duration does not equal total played duration"
        )}
      </div>
    </>
  );
}

export default VideoDisplay;
