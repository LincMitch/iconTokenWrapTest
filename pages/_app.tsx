// App.tsx
import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { wrapTokens, ModifierProvider } from '../components/tokensCtx'; // Adjust path as necessary
import 'react-material-symbols/rounded'; // Place in your root app file. There are also `sharp` and `outlined` variants.

// Wrap MaterialSymbol with wrapTokens
const TokenizedMaterialSymbol = wrapTokens(MaterialSymbol, 'icon');

// Define some sample modifiers
const modifiers = {
  type: 'rounded',
  color: 'red',
};

export default function App() {
  return (
    <div>
    {/* <MaterialSymbol icon="folder" size={24} fill grade={-25} color='red' /> */}

    <ModifierProvider modifiers={modifiers}>
      <TokenizedMaterialSymbol icon="folder" size={24} fill grade={-25} />
    </ModifierProvider>
    </div>
      );
}
