import React, {
  useEffect,
  useRef,
  useState,
  useCallback
} from "react";
import { normalizeLandmarks } from "../utils/normalizeHand";

// ASL Alphabet mapping
const SIGNS = [
  "A","B","C","D","E","F","G","H","I","J",
  "K","L","M","N","O","P","Q","R","S","T",
  "U","V","W","X","Y","Z",
  "SPACE","DELETE"
];

const CONFIDENCE_THRESHOLD = 0.85;
const HOLD_TIME = 1500; // 1.5 seconds

export default function SignClassifier({
  landmarks,
  onSignDetected,
}) {
  const [model, setModel] = useState(null);
  const [currentSign, setCurrentSign] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [detectedWord, setDetectedWord] = useState("");
  const [detectedLetters, setDetectedLetters] = useState([]);
  const holdTimer = useRef(null);
  const lastSign = useRef("");

  // Load TensorFlow model
  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      const tf = await import("@tensorflow/tfjs");
      await tf.ready();

      // Use handpose model for now
      // Real ASL model will be loaded here
      console.log("TensorFlow.js ready ✅");
      setIsLoading(false);
    } catch (err) {
      console.error("Model load error:", err);
      setIsLoading(false);
    }
  };

  // Process landmarks when they change
  useEffect(() => {
    if (!landmarks || landmarks.length === 0) {
      clearTimeout(holdTimer.current);
      return;
    }
    processLandmarks(landmarks);
  }, [landmarks]);

  const processLandmarks = useCallback((landmarks) => {
    try {
      // Normalize landmarks
      const normalized = normalizeLandmarks(landmarks);

      // Simple rule-based detection for now
      // This will be replaced with ML model
      const detected = detectSignRuleBased(landmarks);

      if (detected.sign && detected.confidence > CONFIDENCE_THRESHOLD) {
        setCurrentSign(detected.sign);
        setConfidence(detected.confidence);

        // Start hold timer
        if (lastSign.current !== detected.sign) {
          lastSign.current = detected.sign;
          clearTimeout(holdTimer.current);

          holdTimer.current = setTimeout(() => {
            confirmSign(detected.sign);
          }, HOLD_TIME);
        }
      } else {
        setCurrentSign("");
        setConfidence(0);
        clearTimeout(holdTimer.current);
        lastSign.current = "";
      }
    } catch (err) {
      console.error("Processing error:", err);
    }
  }, []);

  // Rule-based sign detection
  const detectSignRuleBased = (landmarks) => {
    const fingers = getFingerStates(landmarks);

    // A: All fingers closed, thumb out
    if (!fingers.index && !fingers.middle &&
        !fingers.ring && !fingers.pinky) {
      return { sign: "A", confidence: 0.9 };
    }

    // B: All fingers open, thumb in
    if (fingers.index && fingers.middle &&
        fingers.ring && fingers.pinky) {
      return { sign: "B", confidence: 0.9 };
    }

    // L: Index up, thumb out
    if (fingers.index && !fingers.middle &&
        !fingers.ring && !fingers.pinky) {
      return { sign: "L", confidence: 0.9 };
    }

    // V: Index and middle up
    if (fingers.index && fingers.middle &&
        !fingers.ring && !fingers.pinky) {
      return { sign: "V", confidence: 0.9 };
    }

    // W: Index, middle, ring up
    if (fingers.index && fingers.middle &&
        fingers.ring && !fingers.pinky) {
      return { sign: "W", confidence: 0.9 };
    }

    // I: Only pinky up
    if (!fingers.index && !fingers.middle &&
        !fingers.ring && fingers.pinky) {
      return { sign: "I", confidence: 0.9 };
    }

    return { sign: "", confidence: 0 };
  };

  // Get finger states (open/closed)
  const getFingerStates = (landmarks) => {
    return {
      index: landmarks[8].y < landmarks[6].y,
      middle: landmarks[12].y < landmarks[10].y,
      ring: landmarks[16].y < landmarks[14].y,
      pinky: landmarks[20].y < landmarks[18].y,
    };
  };

  const confirmSign = (sign) => {
    if (sign === "SPACE") {
      // Space adds word to sentence
      onSignDetected(" ");
      setDetectedLetters([]);
    } else if (sign === "DELETE") {
      // Delete last letter
      setDetectedLetters((prev) => prev.slice(0, -1));
    } else {
      setDetectedLetters((prev) => {
        const newLetters = [...prev, sign];
        onSignDetected(sign);
        return newLetters;
      });
    }
  };

  return (
    <div className="bg-white/5 rounded-2xl p-4
      border border-white/10">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">
          🧠 Sign Classifier
        </h3>
        {isLoading ? (
          <span className="text-yellow-400 text-xs">
            ⏳ Loading AI...
          </span>
        ) : (
          <span className="text-[#00D4AA] text-xs font-bold">
            ✅ AI Ready
          </span>
        )}
      </div>

      {/* Current Sign Detected */}
      <div className="bg-black/30 rounded-xl p-4
        text-center mb-4">
        {currentSign ? (
          <>
            <div className="text-6xl font-bold
              text-[#00D4AA] mb-2">
              {currentSign}
            </div>
            <div className="w-full bg-white/10
              rounded-full h-2 mb-2">
              <div
                className="bg-[#00D4AA] h-2 rounded-full
                  transition-all"
                style={{
                  width: `${confidence * 100}%`
                }}
              />
            </div>
            <p className="text-gray-400 text-xs">
              Confidence: {Math.round(confidence * 100)}%
            </p>
            <p className="text-yellow-400 text-xs mt-1">
              Hold for 1.5 seconds to confirm...
            </p>
          </>
        ) : (
          <div>
            <p className="text-4xl mb-2">🤟</p>
            <p className="text-gray-500 text-sm">
              {landmarks
                ? "Sign detected, analyzing..."
                : "Show your hand to camera"}
            </p>
          </div>
        )}
      </div>

      {/* Detected Letters */}
      {detectedLetters.length > 0 && (
        <div className="bg-[#6C3FC5]/20 rounded-xl p-3
          border border-[#6C3FC5]/30 mb-3">
          <p className="text-gray-400 text-xs mb-1">
            Detected Letters:
          </p>
          <p className="text-white font-bold text-lg
            tracking-widest">
            {detectedLetters.join("")}
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="space-y-1">
        {[
          "✊ Fist = A",
          "🖐 All fingers open = B",
          "☝️ Index only = L",
          "✌️ Index + Middle = V",
          "🤟 Index + Middle + Ring = W",
          "🤙 Pinky only = I",
        ].map((tip, i) => (
          <p key={i} className="text-gray-500 text-xs">
            {tip}
          </p>
        ))}
      </div>
    </div>
  );
}