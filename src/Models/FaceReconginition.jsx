import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceRecognition = ({ onSuccess }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const lastStatusRef = useRef(null); // "face" | "no-face"

  // 🎥 Start camera
  const startVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  // 📦 Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = "/models";

        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        ]);

        console.log("✅ Models loaded");
        setLoaded(true);
        startVideo();
      } catch (err) {
        console.error("❌ Model load failed", err);
      }
    };

    loadModels();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // 👀 Face detection loop
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

      if (detection) {
        if (lastStatusRef.current !== "face") {
          console.log("✅ FACE");
          lastStatusRef.current = "face";
          onSuccess?.();
        }
      } else {
        if (lastStatusRef.current !== "no-face") {
          console.log("❌ NO FACE");
          lastStatusRef.current = "no-face";
        }
      }
    }, 500);
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
