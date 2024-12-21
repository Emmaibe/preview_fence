import {
    ActivityIndicator,
    Animated,
    Image,
    ImageBackground,
    Keyboard, KeyboardAvoidingView, Platform,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {useEffect, useRef, useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useRouter} from "expo-router";
import OTPModal from "@/components/OTPModal";
import {useAuthContext} from "@/contexts/AuthContext";
import useFormValidation from "@/hooks/useFormValidation";
import {emailRegex, fullNameRegex, phoneRegex} from "@/utils/Constants";

export default function Index() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

    const {onRegister} = useAuthContext();

    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const {
        formState,
        validityState,
        isFormValid,
        handleChange,
    } = useFormValidation(
        {
            email: "",
            phoneNumber: "",
            fullName: "",
            companyName: "",
        },
        {
            email: (value) => emailRegex.test(value),
            phoneNumber: (value) => phoneRegex.test(value),
            fullName: (value) => fullNameRegex.test(value),
            companyName: (value) => value.trim().length > 0,
        }
    );

    const handleRegister = async () => {
        setLoading(true);

        if (onRegister) {
            const names = formState.fullName.split(" ");
            const firstName = names[0];
            const lastName = names.length > 1 ? names[1] : "";

            const result = await onRegister(formState.email, formState.phoneNumber, firstName, lastName, formState.companyName);

            if (result?.error) {
                alert("An error occurred, please try again");
            } else {
                setIsModalOpen(true);
            }

            setLoading(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ImageBackground
                    source={require("../../assets/images/overlay.png")}
                    className="flex-1 justify-center items-center"
                >
                    {isVisible && (
                        <View className="absolute top-0 left-0 bottom-0 right-0 z-[100] bg-neutral-800 opacity-80">

                        </View>
                    )}

                    <Animated.View
                        style={{
                            transform: [{translateY: translateYAnim}],
                            position: "absolute",
                            top: "30%",
                            left: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 100,
                        }}
                    >
                        <OTPModal type={"register"} email={formState.email}/>
                    </Animated.View>

                    <StatusBar
                        backgroundColor="transparent"
                        barStyle="dark-content"
                        translucent={true}
                    />

                    <ScrollView className="pt-10">
                        <View className="p-[10px] pb-[80px] w-full">
                            <View className="p-[10px] pb-5 bg-neutral-200 rounded-[26px]">
                                <View className="relative">
                                    <Image
                                        source={require("../../assets/images/images.png")}
                                        className="w-full rounded-[16px]"
                                    />

                                    <LinearGradient
                                        colors={['transparent', '#F6F8FA']}
                                        style={{
                                            position: 'absolute',
                                            bottom: 0,
                                            height: '50%',
                                            width: '100%',
                                            borderBottomRightRadius: 16,
                                            borderBottomLeftRadius: 16,
                                        }}
                                        start={{x: 0.5, y: 0}}
                                        end={{x: 0.5, y: 1.05}}
                                    />
                                </View>

                                <View className="px-[10px] py-[20px] space-y-3">
                                    <View className="space-y-3">
                                        <Text className="text-[14px] font-intermedium text-primary-text">Email
                                            Address</Text>

                                        <Text className="text-[14px] font-intermedium text-primary-gray-light">
                                            Enter your email address and five (5) digit OTP will
                                            be sent to your email address to authenticate this account
                                        </Text>

                                        <TextInput
                                            className={`font-intermedium text-primary-text p-5 rounded-[12px] w-full border 
                                                ${!validityState.email && formState.email !== "" ?
                                                "border-primary-danger" :
                                                "border-primary-gray-light"
                                            }
                                            `}
                                            value={formState.email}
                                            onChangeText={(value) => handleChange("email", value)}
                                            placeholder="Enter email address"
                                            placeholderTextColor={"#CECFCF"}
                                            keyboardType={"email-address"}
                                        />
                                    </View>

                                    <View className="space-y-3">
                                        <Text className="text-[14px] font-intermedium text-primary-text">Full
                                            name</Text>

                                        <TextInput
                                            className={`font-intermedium text-primary-text p-5 rounded-[12px] w-full border 
                                                ${!validityState.fullName && formState.fullName !== "" ?
                                                "border-primary-danger" :
                                                "border-primary-gray-light"
                                            }
                                            `}
                                            value={formState.fullName}
                                            onChangeText={(value) => handleChange("fullName", value)}
                                            placeholder="Enter full name"
                                            placeholderTextColor={"#CECFCF"}
                                        />
                                    </View>

                                    <View className="space-y-3">
                                        <Text className="text-[14px] font-intermedium text-primary-text">Company
                                            Name</Text>

                                        <TextInput
                                            className={`font-intermedium text-primary-text p-5 rounded-[12px] w-full border 
                                                ${!validityState.companyName && formState.companyName !== "" ?
                                                "border-primary-danger" :
                                                "border-primary-gray-light"
                                            }
                                            `}
                                            value={formState.companyName}
                                            onChangeText={(value) => handleChange("companyName", value)}
                                            placeholder="Enter your company name"
                                            placeholderTextColor={"#CECFCF"}
                                        />
                                    </View>

                                    <View className="space-y-3">
                                        <Text className="text-[14px] font-intermedium text-primary-text">Phone
                                            number</Text>

                                        <TextInput
                                            className={`font-intermedium text-primary-text p-5 rounded-[12px] w-full border 
                                                ${!validityState.phoneNumber && formState.phoneNumber !== "" ?
                                                "border-primary-danger" :
                                                "border-primary-gray-light"
                                            }
                                            `}
                                            value={formState.phoneNumber}
                                            onChangeText={(value) => handleChange("phoneNumber", value)}
                                            placeholder="Enter phone number"
                                            placeholderTextColor={"#CECFCF"}
                                            keyboardType={"phone-pad"}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => handleRegister()}
                                        disabled={loading || !isFormValid}
                                        className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
                                    >
                                        <View
                                            className="bg-neutral-800 h-[50px] rounded-[16px] flex-row items-center justify-center">
                                            {
                                                loading ? (
                                                    <ActivityIndicator color={"#F6F8FA"}/>
                                                ) : (
                                                    <Text
                                                        className="text-white text-center text-[16px] font-intermedium">
                                                        Create account
                                                    </Text>
                                                )
                                            }
                                        </View>
                                    </TouchableOpacity>

                                    <View className="flex flex-row justify-between top-4">
                                        <Text className="text-[14px] font-intermedium text-primary-text">Already have an
                                            account?</Text>

                                        <TouchableOpacity onPress={() => router.push("/auth/login")}>
                                            <Text
                                                className="text-[14px] font-intermedium text-primary-gray-light">Login</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}
