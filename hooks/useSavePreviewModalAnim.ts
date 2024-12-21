import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useSavePreviewModalAnim = () => {
    const [isSavePreviewVisible, setIsSavePreviewVisible] = useState(false);
    const translateSavePreviewYAnim = useRef(new Animated.Value(1000)).current;
    const [isSavePreviewModalOpen, setIsSavePreviewModalOpen] = useState<boolean>(false);

    const slideIn = () => {
        setIsSavePreviewVisible(true);

        Animated.timing(translateSavePreviewYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(translateSavePreviewYAnim, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsSavePreviewVisible(false));
    };

    useEffect(() => {
        if (isSavePreviewModalOpen) {
            slideIn();
        } else {
            slideOut();
        }
    }, [isSavePreviewModalOpen]);

    return { isSavePreviewVisible, setIsSavePreviewVisible, translateSavePreviewYAnim, isSavePreviewModalOpen, setIsSavePreviewModalOpen };
};
