import { useARContext } from "@/contexts/ARContext";
import {
  Viro3DObject,
  ViroBox,
  ViroNode,
  ViroText,
} from "@reactvision/react-viro";
import React from "react";

const Gate = ({ gate, opacity, path }) => {
  if (!path) return null;
  return (
    <Viro3DObject
      source={{ uri: path }}
      type="GLB"
      position={gate.position}
      scale={gate.scale}
      rotation={gate.rotation}
      opacity={opacity}
    />
  );
};

const FenceUnit = ({ unit, opacity, onPress, index, path }) => {
  return (
    <ViroNode
      position={unit.position}
      scale={unit.scale}
      rotation={unit.rotation}
      opacity={opacity}
      onClickState={() => {
        console.log("click click");
        onPress && onPress(unit.fenceIndex, index);
      }}
    >
      <Viro3DObject
        source={{ uri: path }}
        type="GLB"
        position={[0,0,0]}
        scale={[1,1,1]}
      />
    </ViroNode>
  );
};

const Fence = ({ fence, opacity, onPress, gatePath, unitPath }) => {
  return (
    <React.Fragment>
      {fence?.units?.map((unit, index) => (
        <React.Fragment key={"unit-" + index}>
          {unit.type == "gate" ? (
            <Gate opacity={1} gate={unit} path={gatePath} />
          ) : (
            <FenceUnit
              unit={unit}
              opacity={1}
              onPress={onPress}
              index={index}
              path={unitPath}
            />
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

const Fences = ({ fences, opacity, onPress, fenceObject }) => {
  return (
    <React.Fragment>
      {fences.map((fence, index) => (
        <React.Fragment key={"fence-" + index}>
          <ViroText
            text={fence.fenceText}
            position={fence.textPosition}
            rotation={fence.rotation}
            scale={fence.textScale}
            style={fence.textStyle}
          />
          <ViroText
            text={fence.fenceText}
            position={fence.textPosition}
            rotation={fence.rotationBack}
            scale={fence.textScale}
            style={fence.textStyle}
          />
          <Fence
            fence={fence}
            opacity={opacity}
            onPress={onPress}
            unitPath={fenceObject.unitPath}
            gatePath={fenceObject.gatePath}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Fences;
