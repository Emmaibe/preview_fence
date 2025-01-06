import {
  ViroBox,
  ViroMaterials,
  ViroNode,
  ViroSphere,
} from "@reactvision/react-viro";
import React from "react";

export const Pin = ({ scale, position, rotation, material, onDrag, onClick }) => {
  return (
    <ViroNode
      scale={scale}
      position={position}
      rotation={rotation}
      onDrag={(pos, source) => {
        onDrag && onDrag(pos, source);
      }}
      // onClick={() => {
      //   onClick && onClick();
      // }}

      onClickState={()=>{
        onClick && onClick();
      }}
    >
      {/* <ViroSphere
        position={[0, 0, 0]}
        scale={[0.5, 0.5, 0.5]}
        materials={[material]}
      /> */}
      <ViroBox
        position={[0, 0, 1]}
        scale={[0.5, 0.5, 1]}
        rotation={[0, 0, 0]}
        materials={[material]}
      />
      <ViroBox
        position={[0, 0, -1]}
        scale={[0.5, 0.5, 1]}
        rotation={[0, 0, 0]}
        materials={[material]}
      />
      <ViroBox
        position={[1, 0, 0]}
        scale={[0.5, 0.5, 1]}
        rotation={[0, 90, 0]}
        materials={[material]}
      />
      <ViroBox
        position={[-1, 0, 0]}
        scale={[0.5, 0.5, 1]}
        rotation={[0, 90, 0]}
        materials={[material]}
      />
    </ViroNode>
  );
};
