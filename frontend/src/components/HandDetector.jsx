import React, { useEffect, useRef, useState } from "react";

export default function HandDetector({ onLandmarksDetected }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setupCamera();
  }, []);

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: 640,
          height: 480,
          facingMode: "user"
        }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsLoading(false);
          loadMediaPipe();
        };
      }
    } catch (err) {
      setError(
        "Camera access denied. Please allow camera permission."
      );
      setIsLoading(false);
    }
  };

  const loadMediaPipe = async () => {
    const { Hands } = await import("@mediapipe/hands");
    const { Camera } = await import("@mediapipe/camera_utils");

    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    hands.onResults((results) => {
      drawResults(results);
      if (results.multiHandLandmarks?.length > 0) {
        onLandmarksDetected(results.multiHandLandmarks[0]);
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await hands.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();
    setIsDetecting(true);
  };

  const drawResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame
    ctx.drawImage(
      results.image, 0, 0,
      canvas.width, canvas.height
    );

    // Draw hand landmarks
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {

        // Draw connections
        drawConnections(ctx, landmarks);

        // Draw landmark points
        for (const landmark of landmarks) {
          const x = landmark.x * canvas.width;
          const y = landmark.y * canvas.height;

          ctx.beginPath();
          ctx.arc(x, y, 5, 0, 2 * Math.PI);
          ctx.fillStyle = "#00D4AA";
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, 7, 0, 2 * Math.PI);
          ctx.strokeStyle = "#6C3FC5";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }
  };

  const drawConnections = (ctx, landmarks) => {
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8],       // Index
      [0, 9], [9, 10], [10, 11], [11, 12],  // Middle
      [0, 13], [13, 14], [14, 15], [15, 16], // Ring
      [0, 17], [17, 18], [18, 19], [19, 20], // Pinky
      [5, 9], [9, 13], [13, 17],             // Palm
    ];

    ctx.strokeStyle = "#4A90E2";
    ctx.lineWidth = 2;

    for (const [start, end] of connections) {
      const startPoint = landmarks[start];
      const endPoint = landmarks[end];

      ctx.beginPath();
      ctx.moveTo(
        startPoint.x * canvasRef.current.width,
        startPoint.y * canvasRef.current.height
      );
      ctx.lineTo(
        endPoint.x * canvasRef.current.width,
        endPoint.y * canvasRef.current.height
      );
      ctx.stroke();
    }
  };

  return (
    <div className="relative w-full aspect-video 
      bg-black rounded-2xl overflow-hidden">

      {/* Hidden Video */}
      <video
        ref={videoRef}
        className="hidden"
        playsInline
        muted
      />

      {/* Canvas with landmarks */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="w-full h-full object-cover 
          scale-x-[-1]"
      />

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80
          flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-4 animate-pulse">
              📷
            </div>
            <p className="text-white font-semibold">
              Loading Camera...
            </p>
            <p className="text-gray-400 text-sm mt-1">
              Please allow camera permission
            </p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="absolute inset-0 bg-black/80
          flex items-center justify-center">
          <div className="text-center px-6">
            <div className="text-5xl mb-4">❌</div>
            <p className="text-red-400 font-semibold">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* Detecting Badge */}
      {isDetecting && !isLoading && (
        <div className="absolute top-4 left-4
          bg-[#00D4AA]/20 text-[#00D4AA] px-3 py-1
          rounded-full text-xs font-bold
          border border-[#00D4AA]/30
          flex items-center gap-1">
          <div className="w-2 h-2 rounded-full
            bg-[#00D4AA] animate-pulse" />
          Hand Detection Active
        </div>
      )}

      {/* Mirror Label */}
      {!isLoading && !error && (
        <div className="absolute bottom-4 right-4
          bg-black/50 text-gray-400 px-3 py-1
          rounded-full text-xs">
          🤟 Show your hands
        </div>
      )}
    </div>
  );
}