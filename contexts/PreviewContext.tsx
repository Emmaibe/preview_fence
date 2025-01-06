import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { SavedFence, SavedPreview } from "@/utils/Types";
import {
  getAllKeysFromAsyncStorage,
  getObjectFromAsyncStorage,
} from "@/api/AsynStorage";

interface PreviewContextType {
  savedFences: SavedFence[];
  setSavedFences: React.Dispatch<React.SetStateAction<SavedFence[]>>;
  selectedFence: SavedFence | null;
  setSelectedFence: React.Dispatch<React.SetStateAction<SavedFence | null>>;
  selectedPreview: SavedPreview | null;
  setSelectedPreview: React.Dispatch<React.SetStateAction<SavedPreview | null>>;
  fetchSavedFences: () => Promise<void>;
  selectedPreviewForPreview: SavedPreview | null;
  setSelectedPreviewForPreview: React.Dispatch<React.SetStateAction<SavedPreview | null>>;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

interface PreviewContextProviderProps {
  children: React.ReactNode;
}

const PreviewContextProvider: React.FC<PreviewContextProviderProps> = ({
  children,
}) => {
  const [savedFences, setSavedFences] = useState<SavedFence[]>([]);
  const [selectedFence, setSelectedFence] = useState<SavedFence | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<SavedPreview | null>(
    null
  );
  const [selectedPreviewForPreview, setSelectedPreviewForPreview] = useState<SavedPreview | null>(null)

  const fetchSavedFences = useCallback(async () => {
    getAllKeysFromAsyncStorage()
      .then(async (keys) => {
        console.log("keys are here", keys);
        if (!keys) return;
        for (let key of keys) {
          const savedFence: SavedFence = await getObjectFromAsyncStorage(key);
          console.log(key, savedFence);
          if (savedFence) {
            savedFences.push(savedFence);
          }
        }

        const uniqueFences = savedFences.filter(
          (v, i, a) => a.findIndex((t) => t.id === v.id) === i
        );

        console.log("savedFences:", uniqueFences);
        setSavedFences([...uniqueFences]);
        // setSelectedFence(uniqueFences[0] || null);
      })
      .catch((error) => console.error("error:", error));
  }, []);

  const value = {
    savedFences,
    setSavedFences,
    selectedFence,
    setSelectedFence,
    fetchSavedFences,
    selectedPreview,
    setSelectedPreview,
    setSelectedPreviewForPreview,
    selectedPreviewForPreview
  };

  return (
    <PreviewContext.Provider value={value}>{children}</PreviewContext.Provider>
  );
};

export default PreviewContextProvider;

export const usePreviewContext = () => {
  const context = useContext(PreviewContext);
  if (context === undefined) {
    throw new Error(
      "usePreviewContext must be used within a FenceDataContextProvider"
    );
  }
  return context;
};
