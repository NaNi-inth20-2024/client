import { FC, type CSSProperties } from "react";

const ImagePreset = {
    AVATAR: "avatar",
    COMMON: "common",
} as const;
type PresetName = (typeof ImagePreset)[keyof typeof ImagePreset];

const avatarPreset: CSSProperties = {
    width: 70,
    height: 70,
    borderRadius: "50px",
    cursor: "pointer",
};

const commonPreset: CSSProperties = {
    width: "100%",
    height: "100%",
};

type Props = {
    src: string;
    preset: PresetName;
    onClick?: () => void;
};

const presetNameToPreset: Record<PresetName, CSSProperties> = {
    [ImagePreset.AVATAR]: avatarPreset,
    [ImagePreset.COMMON]: commonPreset,
};

const Image: FC<Props> = ({ src, preset, onClick }) => (
    <img src={src} onClick={onClick} style={presetNameToPreset[preset] ?? {}} />
);

export default Image;
