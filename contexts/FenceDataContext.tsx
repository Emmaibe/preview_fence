import React, { createContext, useContext, useState, useCallback } from "react";
import { FenceData } from "@/utils/Types";
import {axiosInstance} from "@/api/AxiosInstance";

interface FenceDataContextType {
    fenceData: FenceData[];
    setFenceData: (data: FenceData[]) => void;
    fetchFenceData: () => Promise<void>;
    fenceLoading: boolean;
    selectedFence: FenceData | null;
    setSelectedFence: (fence: FenceData) => void;
}

const FenceDataContext = createContext<FenceDataContextType | undefined>(undefined);

interface FenceDataContextProviderProps {
    children: React.ReactNode;
}

const FenceDataContextProvider: React.FC<FenceDataContextProviderProps> = ({ children }) => {
    const [fenceData, setFenceData] = useState<FenceData[]>([]);
    const [fenceLoading, setFenceLoading] = useState<boolean>(false);
    const [selectedFence, setSelectedFence] = useState<FenceData | null>(null);

    const fetchFenceData = useCallback(async () => {
        setFenceLoading(true);

        try {
            const response = await axiosInstance.get("/assets/assets");
            console.log(response);
            const data: FenceData[] = await response.data;
            setFenceData(data);
        } catch (error) {
            console.error("Error fetching fence data:", error);
        } finally {
            setFenceLoading(false);
        }
    }, []);

    const value = { fenceData, setFenceData, fetchFenceData, fenceLoading, selectedFence, setSelectedFence };

    return (
        <FenceDataContext.Provider value={value}>
            {children}
        </FenceDataContext.Provider>
    );
};

export default FenceDataContextProvider;

export const useFenceDataContext = () => {
    const context = useContext(FenceDataContext);
    if (context === undefined) {
        throw new Error("useFenceDataContext must be used within a FenceDataContextProvider");
    }
    return context;
};
