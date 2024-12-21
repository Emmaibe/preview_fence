import FenceUnitDetail from "@/components/FenceUnitDetail";
import {useFenceDataContext} from "@/contexts/FenceDataContext";

const FenceUnit = () => {
    const { selectedFence } = useFenceDataContext();

    return (
        <FenceUnitDetail fence={selectedFence} />
    );
};

export default FenceUnit;
