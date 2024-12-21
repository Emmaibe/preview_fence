import {
    ActivityIndicator,
    Animated,
    Image,
    ImageBackground, Keyboard,
    KeyboardAvoidingView, Platform,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity, TouchableWithoutFeedback,
    View
} from "react-native";
import {useState} from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useModalAnimation} from "@/hooks/useModalAnimation";
import {useModalContext} from "@/contexts/ModalContext";
import { useRouter } from "expo-router";
import {useAuthContext} from "@/contexts/AuthContext";
import {emailRegex} from "@/utils/Constants";
import OTPModal from "@/components/OTPModal";

export default function Index() {
  const { isVisible, translateYAnim } = useModalAnimation();
  const { setIsModalOpen } = useModalContext();
  const { onLogin } = useAuthContext();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formValidated, setFormValidated] = useState<boolean | null>(null);

  const [email, setEmail] = useState("");

    const handleTextChange = (value: string) => {
        setEmail(value);
        setFormValidated(emailRegex.test(value));
    };

  const handleLogin = async () => {
      setLoading(true);

      if (onLogin) {
          const result = await onLogin(email);

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
                style={{ flex: 1 }}
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
                            transform: [{ translateY: translateYAnim }],
                            position: "absolute",
                            top: "30%",
                            left: 0,
                            bottom: 0,
                            right: 0,
                            zIndex: 100,
                        }}
                    >
                        <OTPModal type={"login"} email={email} />
                    </Animated.View>

                    <StatusBar
                        backgroundColor="transparent"
                        barStyle="dark-content"
                        translucent={true}
                    />

                    <View className="p-[10px] w-full">
                        <View className="p-[10px] bg-neutral-200 rounded-[26px]">
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
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1.05 }}
                                />
                            </View>

                            <View className="px-[10px] py-[20px] space-y-3">
                                <View>
                                    <Text className="text-2xl">👋</Text>
                                    <Text className="text-2xl font-intermedium text-primary-text">
                                        Welcome back to
                                    </Text>
                                    <Text className="text-2xl font-intermedium text-primary-text">
                                        <Text className="text-2xl font-interbold text-primary-gray">
                                            PreviewFence,
                                        </Text>{' '}
                                        Login
                                    </Text>
                                </View>

                                <Text className="text-[14px] font-intermedium text-primary-text">
                                    Email Address
                                </Text>

                                <Text className="text-[14px] font-intermedium text-primary-gray-light">
                                    Enter your email address and five (5) digit OTP will
                                    be sent to your email address to authenticate this account
                                </Text>

                                <TextInput
                                    className={`font-intermedium text-primary-text p-5 rounded-[12px] w-full border 
                                        ${!formValidated && formValidated !== null ? 
                                            "border-primary-danger" :
                                            "border-primary-gray-light"
                                        }
                                    `}
                                    value={email}
                                    onChangeText={(value) => handleTextChange(value)}
                                    placeholder="Enter email address"
                                    placeholderTextColor={"#CECFCF"}
                                    keyboardType={"email-address"}
                                />

                                <TouchableOpacity
                                    onPress={() => handleLogin()}
                                    disabled={loading || !formValidated}
                                    className="border border-primary-gray-light p-[1px] rounded-[17px] relative top-5"
                                >
                                    <View className="bg-neutral-800 h-[50px] rounded-[16px] flex-row items-center justify-center">
                                        {
                                            loading ? (
                                                <ActivityIndicator color={"#F6F8FA"}/>
                                            ) : (
                                                <Text className="text-white text-center text-[16px] font-intermedium">
                                                    Login
                                                </Text>
                                            )
                                        }
                                    </View>
                                </TouchableOpacity>

                                <View className="flex flex-row justify-between top-4">
                                    <Text className="text-[14px] font-intermedium text-primary-text">
                                        Don't have an account?
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => router.push("/auth/register")}
                                    >
                                        <Text className="text-[14px] font-intermedium text-primary-gray-light">
                                            Create an account
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

