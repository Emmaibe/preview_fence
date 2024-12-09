import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { useModalContext } from "@/contexts/ModalContext";

export const useModalAnimation = () => {
    const { modal } = useModalContext();

    const [isVisible, setIsVisible] = useState(false);
    const translateYAnim = useRef(new Animated.Value(1000)).current;

    const slideIn = () => {
        setIsVisible(true);

        Animated.timing(translateYAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(translateYAnim, {
            toValue: 1000,
            duration: 1000,
            useNativeDriver: true,
        }).start(() => setIsVisible(false));
    };

    useEffect(() => {
        if (modal) {
            slideIn();
        } else {
            slideOut();
        }
    }, [modal]);

    return { isVisible, translateYAnim };
};
