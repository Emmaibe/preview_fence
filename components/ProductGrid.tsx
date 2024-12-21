import * as React from "react";
import { View } from "react-native";
import { ProductCard } from "./ProductCard";

const productData = [
    {
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/18cc097ca5a913c3db2bace5e7089f24a54e8ae8e4c70b56b18a60645828e86a?placeholderIfAbsent=true&apiKey=1415a67a21f046adbe116b8e2d2edb68",
        title: "High quality mesh",
        company: "Company name",
        aspectRatio: 0.63,
        imageWidth: 193,
    },
    {
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/5fb74125975a333708bc99be99b51a67b2a14004d6f1e0fc632f8dd7c55736ba?placeholderIfAbsent=true&apiKey=1415a67a21f046adbe116b8e2d2edb68",
        title: "Steel brushed c...",
        company: "Company name",
        aspectRatio: 0.74,
        imageWidth: 193,
    },
    {
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/9253a0c79bfecde06dd0a52991391d94af20455ec6a54c19339fc99c85abd8f4?placeholderIfAbsent=true&apiKey=1415a67a21f046adbe116b8e2d2edb68",
        title: "Cross pattern w...",
        company: "Company name",
        aspectRatio: 1.15,
        imageWidth: 193,
    },
    {
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/110231d269958ea5d7e552d9c819eb1e7dc1ce695ac76094d171aea4c8455525?placeholderIfAbsent=true&apiKey=1415a67a21f046adbe116b8e2d2edb68",
        title: "Steel vertical bars",
        company: "Company name",
        aspectRatio: 0.74,
        imageWidth: 193,
    },
    {
        imageUrl: "https://cdn.builder.io/api/v1/image/assets/TEMP/b3bc092ec053995e06385fded4f3a1261e5791cbab02b07ffd69b62748463ae7?placeholderIfAbsent=true&apiKey=1415a67a21f046adbe116b8e2d2edb68",
        title: "",
        company: "",
        aspectRatio: 1.09,
        imageWidth: 193,
    },
];

export const ProductGrid: React.FC = () => {
    return (
        <View className="flex gap-2.5 max-w-[398px] bg-red-500">
            <View className="flex flex-col self-start">
                {productData.slice(0, 2).map((product, index) => (
                    <View key={index} className={index > 0 ? "mt-2.5" : ""}>
                        <ProductCard {...product} />
                    </View>
                ))}
            </View>
            <View className="flex flex-col">
                {productData.slice(2).map((product, index) => (
                    <View key={index} className={index > 0 ? "mt-2.5" : ""}>
                        <ProductCard {...product} />
                    </View>
                ))}
            </View>
        </View>
    );
};
