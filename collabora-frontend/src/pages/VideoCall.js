import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase'; // Adjust the path if firebase.js is in a different folder
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  onSnapshot,
  addDoc,
  getDoc,
} from 'firebase/firestore';

const VideoCall = () => {
  const pc = new RTCPeerConnection({
    iceServers: [
      {
        urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
      },
    ],
    iceCandidatePoolSize: 10,
  });

  // eslint-disable-next-line no-unused-vars
  const [localStream, setLocalStream] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [remoteStream, setRemoteStream] = useState(new MediaStream());
  // eslint-disable-next-line no-unused-vars
  const [callId, setCallId] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [cameraDevices, setCameraDevices] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedCamera, setSelectedCamera] = useState('');

  const webcamVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const fetchCameraDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((device) => device.kind === 'videoinput');
      setCameraDevices(videoDevices);
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    };

    fetchCameraDevices();
  }, []);
  // eslint-disable-next-line no-unused-vars
  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: selectedCamera ? { exact: selectedCamera } : undefined },
      audio: true,
    });
    setLocalStream(stream);
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };

    if (webcamVideoRef.current) webcamVideoRef.current.srcObject = stream;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
  };
  // eslint-disable-next-line no-unused-vars
  const createCall = async () => {
    const callDocRef = doc(collection(db, 'calls'));
    const offerCandidates = collection(callDocRef, 'offerCandidates');
    const answerCandidates = collection(callDocRef, 'answerCandidates');

    setCallId(callDocRef.id);

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
    };

    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await setDoc(callDocRef, { offer });

    onSnapshot(callDocRef, (snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    onSnapshot(answerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };
  // eslint-disable-next-line no-unused-vars
  const answerCall = async () => {
    const callDocRef = doc(db, 'calls', callId);
    const answerCandidates = collection(callDocRef, 'answerCandidates');
    const offerCandidates = collection(callDocRef, 'offerCandidates');

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDocRef)).data();
    const offerDescription = callData.offer;

    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
      type: answerDescription.type,
      sdp: answerDescription.sdp,
    };

    await updateDoc(callDocRef, { answer });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6', margin: '20px', backgroundColor: '#f9f9f9', color: '#333' }}>
       <h2 style={{ color: '#007BFF' }}>Study With Me</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ marginBottom: '10px' }}>Local Stream</h3>
          <video ref={webcamVideoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '1000px', height: '700px', backgroundColor: '#000', border: '2px solid #007BFF' }}></video>
        </div>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3 style={{ marginBottom: '10px' }}>Remote Stream</h3>
          <video ref={remoteVideoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '1000px', height: '700px', backgroundColor: '#000', border: '2px solid #28A745' }}></video>
        </div>
      </div>
      <button onClick={startWebcam} style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>Start Webcam</button>
      <label htmlFor="cameraSelect">Choose Camera:</label>
      <select id="cameraSelect" onChange={(e) => setSelectedCamera(e.target.value)}>
        {cameraDevices.map((device, index) => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Camera ${index + 1}`}
          </option>
        ))}
      </select>
      <h2 style={{ color: '#007BFF' }}>Manually create a call first</h2>
      <button onClick={createCall} style={{ padding: '10px 20px', backgroundColor: '#28A745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}>Create Call (offer)</button>

      <h2 style={{ color: '#007BFF' }}>Join a call</h2>
      <p style={{ marginBottom: '10px' }}>Answer the call from a different browser window or device</p>
      <input
        value={callId}
        onChange={(e) => setCallId(e.target.value)}
        style={{ padding: '10px', width: 'calc(100% - 24px)', maxWidth: '300px', border: '1px solid #ccc', borderRadius: '4px', marginRight: '10px' }}
      />
      <button onClick={answerCall} style={{ padding: '10px 20px', backgroundColor: '#FFC107', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Answer</button>

      <h2 style={{ color: '#007BFF' }}>Hangup</h2>
      <button style={{ padding: '10px 20px', backgroundColor: '#DC3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Hangup</button>
    </div>
  );
};

export default VideoCall;
