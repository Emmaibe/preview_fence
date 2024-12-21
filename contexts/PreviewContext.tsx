import React, {createContext, useContext, useState, useCallback, useEffect} from "react";
import { SavedFence } from "@/utils/Types";
import {getAllKeysFromAsyncStorage, getObjectFromAsyncStorage} from "@/api/AsynStorage";

interface PreviewContextType {
    savedFences: SavedFence[];
    setSavedFences: (fences: SavedFence[]) => void;
    selectedFence: SavedFence | null;
    setSelectedFence: (fence: SavedFence) => void;
    fetchSavedFences: () => void;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

interface PreviewContextProviderProps {
    children: React.ReactNode;
}

const PreviewContextProvider: React.FC<PreviewContextProviderProps> = ({ children }) => {
    const [savedFences, setSavedFences] = useState<SavedFence[]>([]);
    const [selectedFence, setSelectedFence] = useState<SavedFence | null>(null);

    const fetchSavedFences = useCallback(async () => {
        getAllKeysFromAsyncStorage()
            .then(async(keys)=>{
                console.log("keys are here", keys);
                if(!keys) return;
                for(let key of keys) {
                    const savedFence: SavedFence = await getObjectFromAsyncStorage(key);
                    console.log(key, savedFence);
                    if(savedFence) {
                        savedFences.push(savedFence);
                    }
                }

                const uniqueFences = savedFences.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i);

                console.log("savedFences:", uniqueFences);
                setSavedFences([...uniqueFences]);
            })
            .catch((error)=> console.error("error:", error));
    }, []);

    const value = { savedFences, setSavedFences, selectedFence, setSelectedFence, fetchSavedFences };

    return (
        <PreviewContext.Provider value={value}>
            {children}
        </PreviewContext.Provider>
    );
};

export default PreviewContextProvider;

export const usePreviewContext = () => {
    const context = useContext(PreviewContext);
    if (context === undefined) {
        throw new Error("usePreviewContext must be used within a FenceDataContextProvider");
    }
    return context;
};
