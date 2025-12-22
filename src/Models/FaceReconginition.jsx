import React, { useEffect, useRef, useState, useContext } from "react";
import * as faceapi from "face-api.js";
import { ContextApi } from "../context/ContextProvider";

const FaceRecognition = ({
  mode = "verify", // "register" | "verify"
  userId = "emp_101",
  onSuccess,
}) => {
  const { setMarked } = useContext(ContextApi);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);

  const [loaded, setLoaded] = useState(false);

  // 🛡 Anti-spoof refs
  const blinkCountRef = useRef(0);
  const eyeClosedRef = useRef(false);
  const verifiedRef = useRef(false);

  /* -------------------- CAMERA -------------------- */
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };
   const stopCamera = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
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

  /* -------------------- STORAGE -------------------- */
  const saveDescriptor = (descriptor) => {
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
    console.log("✅ Face registered for", userId);
  };

  const getMatcher = () => {
    const data = JSON.parse(localStorage.getItem("faces")) || [];
    const labeled = data.map(
      (u) =>
        new faceapi.LabeledFaceDescriptors(
          u.userId,
          u.descriptors.map((d) => new Float32Array(d))
        )
    );
    return new faceapi.FaceMatcher(labeled, 0.5);
  };

  /* -------------------- BLINK DETECTION -------------------- */
  const eyeAspectRatio = (eye) => {
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
    return (
      (dist(eye[1], eye[5]) + dist(eye[2], eye[4])) / (2 * dist(eye[0], eye[3]))
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
      blinkCountRef.current += 1;
      eyeClosedRef.current = false;
      console.log("👁 Blink detected");
    }

    return blinkCountRef.current >= 1;
  };

  /* -------------------- MAIN LOOP -------------------- */
  const handlePlay = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    canvas.width = displaySize.width;
    canvas.height = displaySize.height;
    faceapi.matchDimensions(canvas, displaySize);

    intervalRef.current = setInterval(async () => {
      if (verifiedRef.current) return;

      const detection = await faceapi
        .detectSingleFace(
          video,
          new faceapi.TinyFaceDetectorOptions({
            inputSize: 416,
            scoreThreshold: 0.5,
          })
        )
        .withFaceLandmarks()
        .withFaceDescriptor();

      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (!detection) return;

      /* -------- REGISTER -------- */
      if (mode === "register") {
        saveDescriptor(detection.descriptor);
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
        console.log("✅ Verified:", result.label);
        verifiedRef.current = true;
        setMarked(true);
        onSuccess?.(result.label);
        stopCamera();
      } else {
        console.log("❌ Face not matched");
      }
    }, 600);

   
  };

  return (
    <div className="relative">
      {!loaded && <p className="text-white">Loading models...</p>}

      <video
        ref={videoRef}
        autoPlay
        muted
        onLoadedMetadata={handlePlay}
        className="rounded-xl"
        width="800"
        height="300"
      />

      <canvas ref={canvasRef} className="absolute top-0 left-0" />
    </div>
  );
};

export default FaceRecognition;
