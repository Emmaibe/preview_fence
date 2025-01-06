import React from "react";
import {ViroAmbientLight, ViroARScene, ViroDirectionalLight, ViroMaterials} from "@reactvision/react-viro"
import {Pin} from "./AR/Pin";
import Pins from "./AR/Pins";
import Fences from "./AR/Fence";
import { AR_MODES, useARContext } from "@/contexts/ARContext";
import { usePreviewContext } from "@/contexts/PreviewContext";
import { useFenceDataContext } from "@/contexts/FenceDataContext";

const FenceScene = () => {
    const {
      pins,
      setPins,
      fences,
      modes,
      lines,
      plane,
      isFindPlaneMode,
      setPlaneFromARHitTest,
      setARModes,
      addGateToFence,
      fenceObject
    } = useARContext();
    const {selectedFence} = usePreviewContext();
  
    ViroMaterials.createMaterials({
      unit: { diffuseColor: "#17a2b8" },
      gate: { diffuseColor: "#ff851b" },
      "unit and gate": { diffuseColor: "#28a745" },
      "unit or gate": { diffuseColor: "#ffc107" },
      none: { diffuseColor: "#dc3545" },
      detected: { diffuseColor: "#00FF00", lightingModel: "Lambert" },
      white: { diffuseColor: "#FFFFFF", lightingModel: "Lambert" },
    });
  
    function abstractPins(pins) {
      return pins.map((pin) => {
        return {
          position: pin.transform.position,
          scale: pin.transform.scale,
          rotation: pin.transform.rotation,
          material: "white",
        };
      });
    }
  
    return (
      <ViroARScene
        displayPointCloud={true}
        onClick={()=>{console.log("working")}}
        onCameraARHitTest={(event) => {
          setPlaneFromARHitTest(event);
        }}
      >
        <ViroAmbientLight color="#ffffff" intensity={100} />
        <ViroDirectionalLight color="#ffffff" direction={[0, -1, -1]} />
        <Pins
          pins={abstractPins(pins)}
          shouldToggleLines={!(modes.fence || modes.addGate)}
          lines={lines}
          onClick={(index) => {
            setARModes(AR_MODES.editPin, true);
          }}
          onDrag={(pos, source, index) => {
            if (modes.editPin) {
              const position = [...pins[index].transform.position];
              position[0] = pos[0];
              position[2] = pos[2];
              pins[index].transform.position = [...position];
              setPins([...pins]);
            }
          }}
        />
        {(modes.fence || modes.addGate) && !modes.editPin && selectedFence && (
          <Fences
            fences={fences}
            fenceObject={selectedFence}
            opacity={1}
            onPress={(fenceIndex, gateIndex) => {
              if (modes.fence) {
                addGateToFence(fenceIndex, gateIndex);
              }
            }}
          />
        )}
        {plane && isFindPlaneMode() && (
          <Pin
            position={plane.transform.position}
            scale={[0.06, 0.06, 0.06]}
            rotation={plane.rotation}
            material={"detected"}
          />
        )}
      </ViroARScene>
    );
  };
  
  export default FenceScene