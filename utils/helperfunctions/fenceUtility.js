export const fenceDimension = {
  unit: InchesToM(111.75),
  gate: InchesToM(111.75),
  gateHeight: InchesToM(72),
  gateThickness: 1,
  thickness: 1,
  height: InchesToM(72),
  maxUnit: ftToM(8),
  minUnit: ftToM(6),
};

export function getFenceDimension(fenceObject) {
  if (!fenceObject) return fenceDimension;
  return {
    unit: InchesToM(fenceObject.unitWidth),
    gate: InchesToM(fenceObject.gateWidth),
    height: InchesToM(fenceObject.unitHeight),
    gateHeight: InchesToM(fenceObject.gateHeight),
    minUnit: InchesToM(fenceObject.minUnitWidth),
    maxUnit: InchesToM(fenceObject.maxUnitWidth),
  };
}

export const fenceLineAnalysisResultOptions = [
  "unit and gate",
  "unit or gate",
  "unit",
  "gate",
  "none",
];

export const getPointBetween = (p1, p2, t) => {
  return [
    p1[0] + t * (p2[0] - p1[0]),
    p1[1] + t * (p2[1] - p1[1]),
    p1[2] + t * (p2[2] - p1[2]),
  ];
};

export const getDistanceBetween = (p1, p2) => {
  let dSqr =
    Math.abs(p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2;
  return Math.sqrt(dSqr);
};

export const radToDeg = (rad) => {
  return rad * (180 / Math.PI);
};

export const getRotationYAngle = (p1, p2) => {
  return radToDeg(Math.atan2(p2[2] - p1[2], p2[0] - p1[0]));
};

export const buildLine = (pointA, pointB, fenceDimension) => {
  const position = getPointBetween(pointA, pointB, 0.5);
  const rotationY = getRotationYAngle(pointA, pointB);
  const length = getDistanceBetween(pointA, pointB);
  const line = {
    length,
    position: position.map((pos, index) =>
      index == 1 ? pos + fenceDimension?.height / 2 : pos
    ),
    fenceText: Math.round(length * 100) / 100 + "m",
    textPosition: [...position],
    rotation: [0, -rotationY, 0],
    rotationBack: [0, 180 - rotationY, 0],
    scale: [length, fenceDimension?.height || 0.001, 0.001],
    textStyle: { fontSize: 20 },
    material: "",
  };

  if (fenceDimension) {
    line.fenceAnalyis = analyzeFenceLine(line, fenceDimension);
    line.material = fenceLineAnalysisResultOptions[line.fenceAnalyis];
  }

  line.textPosition[1] = line.textPosition[1] + fenceDimension.height;

  return line;
};

export const analyzeFenceLine = (line, fenceDimension) => {
  let unit;
  const obj = getFenceUnitMargin(
    fenceDimension.unit,
    line.length,
    fenceDimension.maxUnit,
    fenceDimension.minUnit
  );

  if (!obj) return 4;

  unit = obj.unit;

  if (line.length >= unit + fenceDimension.gate) return 0;
  else if (line.length >= unit && line.length >= fenceDimension.gate) return 1;
  else if (line.length >= unit) return 2;
  else if (line.length >= fenceDimension.gate) return 3;
  else return 4;
};

export const getFenceUnitMargin = (unit, l, maxUnit, minUnit) => {
  minUnit = 0.3;
  if (unit < minUnit) throw new Error("Unit is less than minimum unit");

  if (l / unit < 1) return { numberOfUnits: 1, unit: l };

  // Calculate the range of possible unit counts based on length constraints
  let minUnits = Math.floor(l / maxUnit); // Minimum number of units (using largest allowed unit)
  let maxUnits = Math.floor(l / minUnit); // Maximum number of units (using smallest allowed unit)

  let obj;

  for (let i = minUnits; i <= maxUnits; i += 0.1) {
    let newUnit = l / i;
    if (newUnit > maxUnit || newUnit < minUnit) continue;
    obj = { numberOfUnits: i, unit: newUnit };
  }

  return obj;
};

export const buildFenceSingle = (
  pin,
  nextPin,
  fenceDimension,
  fenceIndex,
  gateIndex
) => {
  const position = getPointBetween(pin, nextPin, 0.5);
  const length = getDistanceBetween(pin, nextPin);
  const rotateY = getRotationYAngle(pin, nextPin);
  let obj = getFenceUnitMargin(
    fenceDimension.unit,
    typeof gateIndex == "number" ? length - fenceDimension.gate : length,
    fenceDimension.maxUnit,
    fenceDimension.minUnit
  );

  let numberOfUnits, unit;

  const fenceUnits = [];

  if (obj) {
    numberOfUnits = obj.numberOfUnits;
    unit = obj.unit;
    numberOfUnits =
      typeof gateIndex == "number" ? numberOfUnits + 1 : numberOfUnits;

    let lengthCovered = 0;

    for (let i = 0; i < numberOfUnits; i++) {
      let [_unit, height] =
        gateIndex === i
          ? [fenceDimension.gate, fenceDimension.gateHeight]
          : [unit, fenceDimension.height];

      const position = getPointBetween(
        pin,
        nextPin,
        (_unit / 2 + lengthCovered) / length
      );

      lengthCovered += _unit;

      fenceUnits.push({
        position: position.map((pos, index) =>
          index == 1 ? pos + height / 2 : pos
        ),
        length,
        unit: _unit,
        width: _unit,
        height: fenceDimension.height,
        fenceIndex,
        scale: [
          scaleSize(
            _unit,
            gateIndex == i ? fenceDimension.gate : fenceDimension.unit
          ),
          1,
          1,
        ],
        type: gateIndex == i ? "gate" : "unit",
        rotation: [0, -rotateY, 0],
        material: gateIndex === i ? "detected" : "wood",
        opacity: gateIndex === i ? 0.6 : 1,
      });
    }
  }

  const fence = {
    length,
    pin1: pin,
    pin2: nextPin,
    type: obj ? "fence" : "line",
    height: fenceDimension.height,
    unit,
    position,
    textPosition: position.map((pos, index) =>
      index == 1 ? pos + fenceDimension?.height : pos
    ),
    textRotation: [0, -rotateY, 0],
    fenceText: Math.round(length * 100) / 100 + "m",
    rotation: [0, -rotateY, 0],
    rotationBack: [0, 180 - rotateY, 0],
    units: fenceUnits,
    numberOfUnits,
  };

  fence.fenceAnalyis = analyzeFenceLine(fence, fenceDimension);

  return fence;
};

export const buildFences = (pins, fenceDimension) => {
  const fences = [];
  pins.forEach((pin, index) => {
    const nextPin = index == pins.length - 1 ? pins[0] : pins[index + 1];
    const fence = buildFenceSingle(pin, nextPin, fenceDimension, index);
    fences.push(fence);
  });
  if (pins.length <= 3) fences.pop();
  return fences;
};

export const addGate = (fence, fenceDimension, fenceIndex, gateIndex) => {
  console.log("fence", fenceIndex, gateIndex);
  return buildFenceSingle(
    fence.pin1,
    fence.pin2,
    fenceDimension,
    fenceIndex,
    gateIndex
  );
};

export function replotPins(originalPins_, newFirstPin_) {
  const originalPins = originalPins_.map((pin) => pin.transform.position);
  const newFirstPin = newFirstPin_.transform.position;

  if (originalPins.length === 0) {
    throw new Error("Original pins set cannot be empty.");
  }

  const originalFirstPin = originalPins[0];
  const translation = [
    newFirstPin[0] - originalFirstPin[0],
    newFirstPin[1] - originalFirstPin[1],
    newFirstPin[2] - originalFirstPin[2],
  ];

  const transformPin = (pin, index) => {
    const position = [
      pin[0] + translation[0],
      pin[1] + translation[1],
      pin[2] + translation[2],
    ];

    const _pin = { ...originalPins_[index] };
    _pin.transform.position = [...position];
    return _pin;
  };

  const pins = originalPins.map(transformPin);
  console.log(pins.map((pin) => pin.transform.position));
  console.log(originalPins);
  console.log(translation);
  console.log(newFirstPin);
  return pins;
}

export function ftToM(ft) {
  return ft * 0.3048;
}

export function InchesToM(inches) {
  return inches * 0.0254;
}

export function MToInches(m) {
  return m * 39.3700787;
}

export function scaleSize(desiredSize, originalSize) {
  return desiredSize / originalSize;
}
