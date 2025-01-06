import { ViroBox, ViroText } from "@reactvision/react-viro";
import { Pin } from "./Pin";
import React from "react";

const Pins = ({ pins, lines, onClick, onDrag, shouldToggleLines }) => {
  return (
    <React.Fragment>
      {pins.map((pin, index) => (
        <Pin
          key={"pin-" + index}
          pin={pin}
          scale={[0.06, 0.06, 0.06]}
          position={pin.position}
          rotation={pin.rotation}
          material={pin.material}
          onClick={()=>{onClick && onClick(index)}}
          onDrag={(pos, source)=> {
            onDrag && onDrag(pos, source, index)
          }}
        />
      ))}
      {shouldToggleLines && lines.map((line, index) => (
        <React.Fragment key={"line-" + index}>
          <ViroText
            text={line.fenceText}
            position={line.textPosition}
            rotation={line.rotationBack}
            scale={line.textScale}
            style={line.textStyle}
          />
          <ViroText
            text={line.fenceText}
            position={line.textPosition}
            rotation={line.rotation}
            scale={line.textScale}
            style={line.textStyle}
          />
          <ViroBox
            position={line.position}
            scale={line.scale}
            rotation={line.rotation}
            materials={[line.material]}
            opacity={0.5}
          />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default Pins;
