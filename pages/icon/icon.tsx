import React from "react";
import { MaterialSymbol, MaterialSymbolProps } from "react-material-symbols";
import { wrapTokens } from "../tokensCtx"; // Ensure this path matches your directory structure

// Define the props type for the Icon component
export type IconProps = {
  iconName: MaterialSymbolProps["icon"];
  iconWeight?: MaterialSymbolProps["weight"];
  iconGrade?: MaterialSymbolProps["grade"];
  iconFill?: MaterialSymbolProps["fill"];
  iconSize?: MaterialSymbolProps["size"];
  iconColor?: MaterialSymbolProps["color"];
  className?: string; // Allow className for styling
};

// Define the Icon component using MaterialSymbol
const MaterialSymbolIcon: React.FC<IconProps> = ({
  iconName,
  iconWeight = "regular",
  iconGrade = "0",
  iconFill = false,
  iconSize = 24,
  iconColor = "currentColor",
  className,
  ...props
}) => {
  if (!iconName) {
    console.warn("Icon name is required but not provided.");
    return null; // Return null if no icon name is provided
  }

  return (
    <MaterialSymbol
      icon={iconName}
      weight={iconWeight}
      grade={iconGrade}
      fill={iconFill}
      size={iconSize}
      color={iconColor}
      className={className}
      {...props}
    />
  );
};

// Wrap the MaterialSymbolIcon with tokens for theming
const WrappedIcon = wrapTokens(MaterialSymbolIcon, "icon");

export default WrappedIcon;
