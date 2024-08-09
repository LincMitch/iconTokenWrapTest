// pages/_app.tsx
import React from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { MaterialSymbol, MaterialSymbolProps } from 'react-material-symbols';
import { wrapTokens, ModifierProvider } from './tokensCtx'; // Adjust the path as necessary

// Define the props type for the Icon component
export type IconProps = {
  iconName: MaterialSymbolProps['icon'];
  iconWeight?: MaterialSymbolProps['weight'];
  iconGrade?: MaterialSymbolProps['grade'];
  iconFill?: MaterialSymbolProps['fill'];
  iconSize?: MaterialSymbolProps['size'];
  iconColor?: MaterialSymbolProps['color'];
  className?: string; // Allow className for styling
};

// Define the Icon component using MaterialSymbol
const MaterialSymbolIcon: React.FC<IconProps> = ({
  iconName,
  iconWeight = 'regular',
  iconGrade = '0',
  iconFill = false,
  iconSize = 24,
  iconColor = 'currentColor',
  className,
  ...props
}) => {
  if (!iconName) {
    console.warn('Icon name is required but not provided.');
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
const WrappedIcon = wrapTokens(MaterialSymbolIcon, 'icon');

function MyApp({ Component, pageProps }: AppProps) {
  // Define modifiers for the application
  const modifiers = {
    type: 'default',
    color: 'blue',
  };

  return (
    <ModifierProvider modifiers={{ color: 'light' }}>
      <WrappedIcon iconName="home" size={32} color="blue" weight="bold" fill={true} />
      <Component {...pageProps} />
    </ModifierProvider>
  );
}

export default MyApp;
