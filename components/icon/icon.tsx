import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import { wrapTokens, ModifierProvider } from '../tokensCtx'; // Adjust the path as necessary

// Wrap MaterialSymbol with wrapTokens
const TokenizedMaterialSymbol = wrapTokens(MaterialSymbol, 'icon');