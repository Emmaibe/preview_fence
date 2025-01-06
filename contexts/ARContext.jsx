import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addGate,
  buildFences,
  buildLine,
  getFenceDimension,
  MToInches,
  replotPins,
} from "../utils/helperfunctions/fenceUtility";
import * as FileSystem from "expo-file-system";
import { usePreviewContext } from "./PreviewContext";
import { useAuthContext } from "./AuthContext";
import { axiosInstance } from "@/api/AxiosInstance";

const ARContext = createContext();

export const AR_MODES = {
  editPin: "editPin",
  addGate: "addGate",
  fence: "fence",
};

const defaultModes = {
  editPin: false,
  addGate: false,
  fence: false,
};

const ARProvider = ({ children }) => {
  const { user } = useAuthContext();
  const {
    selectedPreviewForPreview: selectedPreview,
    setSelectedPreviewForPreview,
    selectedFence: fenceObject,
    savedFences,
    setSelectedFence,
  } = usePreviewContext();
  const [gatePosition, setGatePosition] = useState(null);
  const [fences, setFences] = useState([]);
  const [pins, setPins] = useState([]);
  const [lines, setLines] = useState([]);
  const [plane, setPlane] = useState(null);
  const [modes, setModes] = useState({ ...defaultModes });
  const [reprev, setReprev] = useState(false);

  useEffect(() => {
    if (!fenceObject) {
      setSelectedFence(savedFences[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedPreview && pins.length > 1 && !reprev) {
      console.log(typeof selectedPreview);
      setPins(replotPins(selectedPreview.pins, pins[0]));
      if (selectedPreview.fenceId) {
        setSelectedFence(
          savedFences.find(
            (fence) => fence.id === selectedPreview.fenceIndex
          ) || handleNoSavedFenceWithId(selectedPreview.fenceId) || fenceObject
        );

        if (selectedPreview.gateIndex && selectedPreview.fenceId) {
          setGatePosition([
            selectedPreview.fenceIndex,
            selectedPreview.gateIndex,
          ]);
        }
      }
      setReprev(true);
    } else buildARFencing();
  }, [pins, fenceObject]);

  useEffect(() => {
    return () => {
      setSelectedPreviewForPreview(null);
    };
  }, []);

  function handleNoSavedFenceWithId(id) {
    // maybe a way to notify the user on the session
    return null;
  }

  function isFindPlaneMode() {
    return Object.values(modes).every((value) => value == false);
  }

  function setARModes(mode, value) {
    if (mode == "fence") {
      setModes({ ...modes, fence: value });
    } else if (mode == "addGate" && modes.fence) {
      setModes({ ...modes, addGate: value });
    } else if (mode == "editPin") {
      setModes({ ...modes, editPin: value });
    } else setModes({ ...defaultModes });
  }

  function setPlaneFromARHitTest(event) {
    if (isFindPlaneMode()) {
      const length = event.hitTestResults.length;
      length > 0 && setPlane(event.hitTestResults[length - 1]);
    }
  }

  function buildARFencing() {
    const newLines =
      pins.length < 2
        ? []
        : pins.map((pin, index) => {
            const nextPin =
              index == pins.length - 1 ? pins[0] : pins[index + 1];
            const line = buildLine(
              pin.transform.position,
              nextPin.transform.position,
              getFenceDimension(fenceObject)
            );
            return line;
          });
    // if (pins.length <= 2) newLines.pop();
    setLines(newLines);

    if (fenceObject) {
      const newFences = buildFences(
        pins.map((pin) => pin.transform.position),
        getFenceDimension(fenceObject)
      );

      if (gatePosition) {
        const newFence = addGate(
          fences[gatePosition[0]],
          getFenceDimension(fenceObject),
          gatePosition[0],
          gatePosition[1]
        );
        newFences[gatePosition[0]] = newFence;
      }

      setFences(newFences);
    }
  }

  function addGateToFence(fenceIndex, gateIndex) {
    console.log("clicked");
    const newFences = buildFences(
      pins.map((pin) => pin.transform.position),
      getFenceDimension(fenceObject)
    );
    // if (pins.length <= 3) newFences.pop();

    const newFence = addGate(
      newFences[fenceIndex],
      getFenceDimension(fenceObject),
      fenceIndex,
      gateIndex
    );

    newFences[fenceIndex] = newFence;
    setFences([...newFences]);
    setGatePosition([fenceIndex, gateIndex]);
  }

  function editPinPosition(pinIndex, position) {
    const newPins = pins.map((pin, index) => {
      const position =
        index == pinIndex ? [...position] : pin.transform.position;
      return { ...pin, transform: { position } };
    });
    setPins(newPins);
  }

  //   export interface PreviewPayload {
  //     pins: Pin[];
  //     fenceId?: string;
  //     userId: string;
  //     gateIndex?: number;
  //     fenceIndex?: number;
  //     description: string;
  //     unitWidths?: number[];
  // }

  async function savePreviewPayload(description) {
    const previewPayload = {
      pins: pins,
      description,
      userId: user.id,
    };

    if (fenceObject && modes.fence) {
      if (gatePosition) {
        previewPayload.fenceIndex = gatePosition[0];
        previewPayload.gateIndex = gatePosition[0];
      }
      previewPayload.fenceId = fenceObject.id;
      previewPayload.unitWidths = fences.map((fence) => MToInches(fence.unit));
    }

    console.log(previewPayload);
    return previewPayload;
  }

  function resetAR() {
    setPins([]);
    setFences([]);
    setLines([]);
    setModes({ ...defaultModes });
  }

  const value = {
    fences,
    pins,
    setPins,
    lines,
    plane,
    modes,
    setARModes,
    isFindPlaneMode,
    setPlaneFromARHitTest,
    editPinPosition,
    resetAR,
    addGateToFence,
    fenceObject,
    savePreviewPayload,
  };

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
};

export default ARProvider;

export const useARContext = () => {
  const context = useContext(ARContext);
  if (context === undefined) {
    throw new Error("usePreview must be used within a PreviewProvider");
  }
  return context;
};
