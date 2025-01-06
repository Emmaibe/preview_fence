import * as React from "react";
import { FenceDimension } from "@/components/FenceDimension";
import { FenceData, SavedFence, SavedPreview } from "@/utils/Types";
import {
  getDistanceBetween,
  MToInches,
} from "@/utils/helperfunctions/fenceUtility";
import { inchesToFeet } from "@/utils/helperfunctions/HelperFunctions";

export const FenceDimensionDetailsContainer: React.FC<{
  preview: SavedPreview;
  fence?: FenceData | SavedFence | null;
}> = ({ preview, fence }) => {
  const fenceData = {
    sides: (preview.unitWidths as number[]).map((unitWidth, index) => {
      return {
        sideNumber: index + 1,
        sideInfo: {
          width: inchesToFeet(
            MToInches(
              getDistanceBetween(
                preview.pins[index].transform.position,
                preview.pins[index == preview.pins.length - 1 ? 0 : index + 1].transform.position
              )
            )
          ).toString() + "ft",
          sectionWidth: unitWidth ? inchesToFeet(unitWidth) + "ft" : undefined,
        },
      };
    }),
    gate: fence?.name,
    description: fence?.description,
  };
  return <FenceDimension {...fenceData} />;
};
