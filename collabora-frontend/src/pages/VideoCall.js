import React, { useState, useEffect, useRef } from "react";
import "firebase/firestore";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  addDoc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import PropTypes from "prop-types";
import MicOn from "../assets/ion_mic-on.svg";
import MicOff from "../assets/ion_mic-off.svg";
import HeadphoneOn from "../assets/mingcute_headphone-on.svg";
import HeadphoneOff from "../assets/mingcute_headphone-off.svg";
import VideoOn from "../assets/mynaui_video-on.svg";
import VideoOff from "../assets/mynaui_video-off.svg";
import { Link } from "react-router-dom";

const servers = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
const pc = new RTCPeerConnection(servers);

const VideoCall = () => {
  const [webcamActive, setWebcamActive] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [callId, setCallId] = useState("");
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState("");
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  // Fetch available cameras
  useEffect(() => {
    const getCameras = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setCameras(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId); // Set the first camera as default
      }
    };
    getCameras();
  }, []);

  const setupSources = async (mode) => {
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
      },
      audio: true,
    });
    const remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {
      pc.addTrack(track, localStream);
    });

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    localRef.current.srcObject = localStream;
    remoteRef.current.srcObject = remoteStream;

    setWebcamActive(true);

    if (mode === "create") {
      const callDoc = doc(collection(db, "calls"));
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      setRoomId(callDoc.id);
      setCallId(callDoc.id);

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { offer });

      onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer) {
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    } else if (mode === "join") {
      const callDoc = doc(db, "calls", callId);
      const offerCandidates = collection(callDoc, "offerCandidates");
      const answerCandidates = collection(callDoc, "answerCandidates");

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
      };

      const callData = (await getDoc(callDoc)).data();

      const offerDescription = callData.offer;
      await pc.setRemoteDescription(
        new RTCSessionDescription(offerDescription)
      );

      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };

      await updateDoc(callDoc, { answer });

      onSnapshot(offerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });
    }

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "disconnected") {
        hangUp();
      }
    };
  };

  const hangUp = async () => {
    pc.close();

    if (roomId) {
      const roomRef = doc(db, "calls", callId);
      const answerCandidatesRef = collection(roomRef, "answerCandidates");
      const offerCandidatesRef = collection(roomRef, "offerCandidates");

      // Delete all answer candidates
      const answerCandidatesSnapshot = await getDocs(answerCandidatesRef);
      answerCandidatesSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Delete all offer candidates
      const offerCandidatesSnapshot = await getDocs(offerCandidatesRef);
      offerCandidatesSnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Delete the room document
      await deleteDoc(roomRef);
    }

    window.location.reload();
  };

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isHeadphoneOn, setIsHeadphoneOn] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);

  return (
    <div>
      {!hideButtons && (
        <div>
      <div>
        <label htmlFor="cameraSelector">Select Camera:</label>
        <select
          id="cameraSelector"
          value={selectedCamera}
          onChange={(e) => setSelectedCamera(e.target.value)}
          className="text-black"
        >
          {cameras.map((camera) => (
            <option key={camera.deviceId} value={camera.deviceId}>
              {camera.label || `Camera ${camera.deviceId}`}
            </option>
          ))}
        </select>
      </div>
        <div>
          <button onClick={() => setupSources("create")}>Create Call</button>
          <input
            value={callId}
            onChange={(e) => setCallId(e.target.value)}
            placeholder="Enter Call ID"
            className="text-black"
          />
          <button onClick={() => setupSources("join")}>Join Call</button>
          <Link to="/">
            <button
              onClick={hangUp}
              disabled={!webcamActive}
              className="hangup button"
            >
              Hang up
            </button>
          </Link>
        </div>
        </div>
      )}
      <button
        onClick={() => setHideButtons((prev) => !prev)}
        className="toggle-hide-button"
      >
        {hideButtons ? "." : "."}
      </button>

      <div>
        <div>
          <div className="w-full h-full p-4 px-6">
            <div className="bg-slate-400 h-60 mb-2 w-[335px]">
              <video ref={remoteRef} autoPlay playsInline></video>
            </div>
          </div>
        </div>
        <div className="p-3 px-6 flex justify-between border border-x-0 border-y-grayBorder">
          <div className="flex space-x-4">
            <div className="flex flex-col justify-center">
              <p className="font-medium text-sm px-2">Elydhore</p>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            {/* Microphone Toggle */}
            <button
              onClick={() => setIsMicOn((prev) => !prev)}
              className={"opacity-50 cursor-not-allowed"}
            >
              <img
                src={isMicOn ? MicOn : MicOff}
                alt={isMicOn ? "Microphone On" : "Microphone Off"}
                className="h-5 w-5"
              />
            </button>
            {/* Headphone Toggle */}
            <button
              onClick={() => setIsHeadphoneOn((prev) => !prev)}
              className={"opacity-50 cursor-not-allowed"}
            >
              <img
                src={isHeadphoneOn ? HeadphoneOn : HeadphoneOff}
                alt={isHeadphoneOn ? "Headphone On" : "Headphone Off"}
                className="h-5 w-5"
              />
            </button>
            {/* Video Toggle */}
            <button
              onClick={() => setIsVideoOn((prev) => !prev)}
              className={"opacity-50 cursor-not-allowed"}
            >
              <img
                src={isVideoOn ? VideoOn : VideoOff}
                alt={isVideoOn ? "Video On" : "Video Off"}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="w-full h-full p-4 px-6">
            <div className="bg-slate-400 h-60 mb-2 w-[335px]">
              <video ref={localRef} autoPlay playsInline></video>
            </div>
          </div>
        </div>
        <div className="p-3 px-6 flex justify-between border border-x-0 border-y-grayBorder">
          <div className="flex space-x-4">
            <div className="flex flex-col justify-center">
              <p className="font-medium text-sm px-2">Keiru</p>
            </div>
          </div>
          <div className="flex space-x-4 items-center">
            {/* Microphone Toggle */}
            <button
              onClick={() => setIsMicOn((prev) => !prev)}
              className={"opacity-50 cursor-not-allowed"}
            >
              <img
                src={isMicOn ? MicOn : MicOff}
                alt={isMicOn ? "Microphone On" : "Microphone Off"}
                className="h-5 w-5"
              />
            </button>
            {/* Headphone Toggle */}
            <button
              onClick={() => setIsHeadphoneOn((prev) => !prev)}
              className={"opacity-50 cursor-not-allowed"}
            >
              <img
                src={isHeadphoneOn ? HeadphoneOn : HeadphoneOff}
                alt={isHeadphoneOn ? "Headphone On" : "Headphone Off"}
                className="h-5 w-5"
              />
            </button>
            {/* Video Toggle */}
            <button
              onClick={() => setIsVideoOn((prev) => !prev)}
              className={"opacity-50 cursor-not-allowed"}
            >
              <img
                src={isVideoOn ? VideoOn : VideoOff}
                alt={isVideoOn ? "Video On" : "Video Off"}
                className="h-5 w-5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

VideoCall.propTypes = {
  name: PropTypes.string,
};

export default VideoCall;
