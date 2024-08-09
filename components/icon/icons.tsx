import { IconProps } from '@chakra-ui/react';
import { MaterialSymbolProps, MaterialSymbol } from 'react-material-symbols';

export type IconName = MaterialSymbolProps['icon'];
export type IconFill = MaterialSymbolProps['fill'];
export type IconWeight = MaterialSymbolProps['weight'];
export type IconGrade = MaterialSymbolProps['grade'];
export type IconSize = MaterialSymbolProps['size'];
export type IconColor = MaterialSymbolProps['color'];


export const getIconComponent = ({
  iconName,
  iconFill,
  iconWeight,
  iconGrade,
  iconSize,
  iconColor
}: {
  iconName?: IconName
  iconWeight?: IconWeight
  iconGrade?: IconGrade
  iconFill?: IconFill
  iconSize?: IconSize
  iconColor?: IconColor
}): React.ComponentType<IconProps> | string | undefined => {
  const fullIconName = iconName;
  const fullIconWeight = iconWeight;
  const fullIconGrade = iconGrade;
  const fullIconFill= iconFill;
  const fullIconSize= iconSize;
  const fullIconColor= iconColor;

  if (fullIconName == null) {
    return undefined;
  }

  return () => <MaterialSymbol 
  icon={fullIconName}
  weight={fullIconWeight}
  grade={fullIconGrade}
  fill={fullIconFill}
  size={fullIconSize}
  color={fullIconColor}
   />
}

