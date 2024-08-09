// tokensCtx.tsx
import React, { useMemo, useContext, createContext, ReactNode } from 'react';
import { cx } from '@chakra-ui/shared-utils';

type ModifierObj = Record<string, any>;

export const ModifierContext = createContext<ModifierObj>({ modifiers: {} });

export const useModifiers = () => {
  const ctx = useContext(ModifierContext);

  if (!ctx) {
    throw new Error('useModifiers must be used within a ModifierProvider');
  }

  return ctx;
};

interface ModifierProviderProps {
  modifiers: any;
  children: ReactNode;
}

export const ModifierProvider = ({ modifiers, children }: ModifierProviderProps) => {
  const ctx = useContext(ModifierContext);
  const mergedModifiers = useMemo(() => {
    return {
      ...ctx?.modifiers,
      ...modifiers,
    };
  }, [ctx?.modifiers, modifiers]);

  return (
    <ModifierContext.Provider value={{ modifiers: mergedModifiers, rawModifiers: modifiers }}>
      {children}
    </ModifierContext.Provider>
  );
};

export const wrapTokens = <P extends object>(
  Element: React.ComponentType<P>,
  selector?: string
): React.FC<P> => {
  const WrappedElement: React.FC<P> = (props) => {
    const { children, className, ...rest } = props as any;
    const { name, map } = useContext(ModifierContext);

    const selectorClass = map ? map[`${name}__${selector}`] : '';
    const propsClasses = Object.keys(rest)
      .map((key) => typeof rest[key] === 'string' && `${name}__${rest[key]}`)
      .join(' ');

    const klass = cx(selectorClass, `${name}__${selector}`, propsClasses, className);

    return (
      <Element className={klass} {...(rest as P)}>
        {children}
      </Element>
    );
  };

  WrappedElement.displayName = `WrappedElement(${Element.displayName || Element.name || 'Component'})`;

  return (props: P) => (
    <ModifierProvider modifiers={{}}>
      <WrappedElement {...props} />
    </ModifierProvider>
  );
};
