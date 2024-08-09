import { CodeComponentMeta } from "@plasmicapp/host";
import { IconProps } from "./icon";
import { getComponentNameAndImportMeta } from "@/components/chakra/utils";

export const iconWeights = ["100", "200", "300", "400", "500", "600", "700"];
export const iconGrades = ["-25", "0", "200"];
export const iconFills = true;
export const iconSizes = [
  "0px",
  "10px",
  "20px",
  "24px",
  "30px",
  "40px",
  "48px",
  "50px",
  "60px",
  "70px",
  "80px",
  "90px",
  "100px",
  "110px",
  "120px",
  "130px",
  "140px",
  "150px",
  "160px",
  "170px",
  "180px",
  "190px",
  "200px",
];
export const iconColors = [
  "whiteAlpha",
  "blackAlpha",
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "cyan",
  "purple",
  "pink",
  "linkedin",
  "facebook",
  "messenger",
  "whatsapp",
  "twitter",
  "telegram",
];

export const iconProps: CodeComponentMeta<IconProps>["props"] = {
  iconName: {
    type: "string",
  },
  iconWeight: {
    type: "choice",
    options: iconWeights,
  },
  iconGrade: {
    type: "choice",
    options: iconGrades,
  },
  iconFill: {
    type: "boolean",
  },
  iconSize: {
    type: "choice",
    options: iconSizes,
  },
  iconColor: {
    type: "string",
    options: iconColors,
  },
};

export const iconMeta: CodeComponentMeta<IconProps> = {
  ...getComponentNameAndImportMeta("Icon"),
  importPath: "./components/base/icon/icon",
  props: {
    ...iconProps,
    children: {
      type: "code",
      lang: "html",
    },
    // color: {
    //   type: "string"
    // },
    // viewBox: {
    //   type: "string"
    // },
    // boxSize: {
    //   type: "string"
    // },
    // focusable: {
    //   type: "boolean"
    // },
  },
};
