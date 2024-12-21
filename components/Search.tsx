import { AntDesign } from "@expo/vector-icons";
import {TextInput, View } from "react-native";

interface SearchProps {
    placeholder: string;
    search: string;
    setSearch: (value: string) => void;
    className?: string;
}

const Search: React.FC<SearchProps>  = ({ placeholder, search, setSearch, className }) => {

    return (
        <View className="relative">
            <View className="absolute top-4 left-3">
                <AntDesign name="search1" size={24} color={"#000"} />
            </View>

            <TextInput
                className={`${className} font-intermedium text-primary-text p-5 pl-11 rounded-[12px] w-full border border-primary-gray-light`}
                value={search}
                onChangeText={(value) => setSearch(value)}
                placeholder={placeholder}
                placeholderTextColor={"#CECFCF"}
            />
        </View>
    );
};

export default Search;
