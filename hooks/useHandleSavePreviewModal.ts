import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

export const useHandleSavePreviewModal = () => {
    const [isHandleSavePreviewVisible, setIsHandleSavePreviewVisible] = useState(false);
    const translateHandleSavePreviewYAnim = useRef(new Animated.Value(1000)).current;
    const [isHandleSavePreviewModalOpen, setIsHandleSavePreviewModalOpen] = useState<boolean>(false);

    const slideIn = () => {
        setIsHandleSavePreviewVisible(true);

        Animated.timing(translateHandleSavePreviewYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(translateHandleSavePreviewYAnim, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsHandleSavePreviewVisible(false));
    };

    useEffect(() => {
        if (isHandleSavePreviewModalOpen) {
            slideIn();
        } else {
            slideOut();
        }
    }, [isHandleSavePreviewModalOpen]);

    return { isHandleSavePreviewVisible, setIsHandleSavePreviewVisible, translateHandleSavePreviewYAnim, isHandleSavePreviewModalOpen, setIsHandleSavePreviewModalOpen };
};
