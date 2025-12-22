import React, { useEffect, useRef, useState, useContext } from "react";
import * as faceapi from "face-api.js";
import { ContextApi } from "../context/ContextProvider";

const FaceRecognition = ({ mode = "register", onSuccess }) => {
  const { currentUser, setMarked } = useContext(ContextApi);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  // 🛡 Anti-spoofing refs
  const blinkCountRef = useRef(0);
  const eyeClosedRef = useRef(false);
  const verifiedRef = useRef(false);

  /* -------------------- CAMERA -------------------- */
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: 480,
        height: 360,
        frameRate: { ideal: 15 },
      },
    });
    videoRef.current.srcObject = stream;
  };

  const stopCamera = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const video = videoRef.current;
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
  };

  /* -------------------- MODELS -------------------- */
  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      ]);

      setLoaded(true);
      startVideo();
    };

    loadModels();
    return () => stopCamera();
  }, []);

  /* -------------------- FACE STORAGE -------------------- */
  const saveDescriptor = (descriptor, userId) => {
    const data = JSON.parse(localStorage.getItem("faces")) || [];
    const user = data.find((u) => u.userId === userId);

    if (user) {
      user.descriptors.push(Array.from(descriptor));
    } else {
      data.push({
        userId,
        descriptors: [Array.from(descriptor)],
      });
    }

    localStorage.setItem("faces", JSON.stringify(data));
  };

  const getMatcher = () => {
    const data = JSON.parse(localStorage.getItem("faces")) || [];

    return new faceapi.FaceMatcher(
      data.map(
        (u) =>
          new faceapi.LabeledFaceDescriptors(
            u.userId,
            u.descriptors.map((d) => new Float32Array(d))
          )
      ),
      0.5
    );
  };

  /* -------------------- BLINK DETECTION -------------------- */
  const eyeAspectRatio = (eye) => {
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    return (
      (dist(eye[1], eye[5]) + dist(eye[2], eye[4])) /
      (2 * dist(eye[0], eye[3]))
    );
  };

  const detectBlink = (landmarks) => {
    const leftEAR = eyeAspectRatio(landmarks.getLeftEye());
    const rightEAR = eyeAspectRatio(landmarks.getRightEye());
    const avgEAR = (leftEAR + rightEAR) / 2;

    if (avgEAR < 0.22 && !eyeClosedRef.current) {
      eyeClosedRef.current = true;
    }

    if (avgEAR > 0.25 && eyeClosedRef.current) {
      blinkCountRef.current++;
      eyeClosedRef.current = false;
    }

    return blinkCountRef.current >= 1;
  };

  /* -------------------- BACKEND CALL -------------------- */
  const markAttendance = async (userId) => {
    await fetch("http://localhost:5000/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
  };

  /* -------------------- MAIN LOOP -------------------- */
  const handlePlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    intervalRef.current = setInterval(async () => {
      if (verifiedRef.current || !currentUser) return;

      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 224,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      if (!detection) return;

      /* -------- REGISTER -------- */
      if (mode === "register") {
        saveDescriptor(detection.descriptor, currentUser.id);
        verifiedRef.current = true;
        stopCamera();
        return;
      }

      /* -------- VERIFY -------- */
      const blinked = detectBlink(detection.landmarks);
      if (!blinked) return;

      const matcher = getMatcher();
      const result = matcher.findBestMatch(detection.descriptor);

      if (result.label !== "unknown") {
        verifiedRef.current = true;

        await markAttendance(currentUser.id);

        setMarked(true);
        onSuccess?.(currentUser.id);

        stopCamera();
      }
    }, 1000);
  };

  return (
    <div className="relative">
      {!loaded && <p className="text-white">Loading camera…</p>}

      <video
        ref={videoRef}
        autoPlay
        muted
        onLoadedMetadata={handlePlay}
        className="rounded-xl"
      />

      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  );
};

export default FaceRecognition;
