import { useState } from 'react';
import {SavedPreviewArray} from "@/utils/Types";
import {axiosInstance} from "@/api/AxiosInstance";

export function usePreviews() {
    const [previewLoading, setPreviewLoading] = useState(false);
    const [previewError, setPreviewError] = useState<string | null>(null);
    const [previews, setPreviews] = useState<SavedPreviewArray>([]);

    const fetchSavedPreviews = async () => {
        setPreviewLoading(true);
        setPreviewError(null);

        try {
            const response = await axiosInstance.get("/assets/previews");

            const data: SavedPreviewArray = await response.data;
            console.log(data);
            setPreviews(data);

        } catch (error: any) {
            setPreviewError(error.message);
        } finally {
            setPreviewLoading(false);
        }
    };

    return {
        // States
        previewLoading,
        previewError,
        previews,

        // Methods
        fetchSavedPreviews,
    };
}
