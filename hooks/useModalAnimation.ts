import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useModalContext } from "@/contexts/ModalContext";

export const useModalAnimation = () => {
    const { isModalOpen } = useModalContext();

    const [isVisible, setIsVisible] = useState(false);
    const translateYAnim = useRef(new Animated.Value(1000)).current;

    const slideIn = () => {
        setIsVisible(true);

        Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(translateYAnim, {
            toValue: 1000,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setIsVisible(false));
    };

    useEffect(() => {
        if (isModalOpen) {
            slideIn();
        } else {
            slideOut();
        }
    }, [isModalOpen]);

    return { isVisible, translateYAnim };
};
