export interface UserType {
    id?: string,
    email?: string,
    phoneNumber?: string,
    firstName?: string,
    lastName?: string,
    companyName?: string,
    emailVerified?: boolean,
    role?: string,
    createdAt?: string,
    updatedAt?: string
};

export interface ProductCardProps {
    imageUrl: string;
    title: string;
    company: string;
    aspectRatio: number;
    imageWidth: number;
}

export interface ProductGridProps {
    products: ProductCardProps[];
}

export interface PreviewCardProps {
    title: string;
    subtitle: string;
    iconUrl: string;
}

export interface FenceMetricProps {
    label: string;
    value: string;
}

export interface FenceDetailsProps {
    title: string;
    metrics: FenceMetricProps[];
}

export interface DescriptionCardProps {
    description: string;
    lastEdited: string;
}

export interface SideInfoProps {
    width: string;
    sectionWidth: string;
}

export interface SideProps {
    sideNumber: number;
    sideInfo: SideInfoProps;
}

export interface FenceDimensionProps {
    sides: SideProps[];
    gate: string;
    description: string;
}

export interface FenceData {
    id: string;
    name: string;
    description: string;
    unitGlbUrl: string;
    gateGlbUrl: string;
    unitWidth: number;
    unitHeight: number;
    gateWidth: number;
    gateHeight: number;
    minUnitWidth: number;
    maxUnitWidth: number;
    imageUrls: string[];
    createdAt: string;
}

declare type FenceDataArray = FenceData[];

// Minimal interface for the pins
export interface Pin {
    [key: string]: any;
}

export interface PreviewPayload {
    pins: Pin[];
    fenceId?: string;
    userId: string;
    gateIndex?: number;
    fenceIndex?: number;
    description: string;
    unitWidths?: number[];
}

const data: PreviewPayload = {
    pins: [
        [0,1,3],
        [0,1,3],
        [0,1,3],
        [0,1,3],
        [0,1,3],
    ],
    description: "MR collins house",
    userId: "kjbcbs",
}

export interface SavedPreview extends PreviewPayload {
    id: string;
    createdAt: string;
    updatedAt: string;
}

export type SavedPreviewArray = SavedPreview[];

export interface SavedFence extends FenceData {
    unitPath: string;
    gatePath: string;
}
