import React, { useMemo, useContext, createContext, ReactNode, ComponentType } from 'react';
import { cx } from '@chakra-ui/shared-utils';
import root from 'react-shadow/emotion';

type ModifierObj = Record<string, any>;

export const ModifierContext = createContext<ModifierObj>({ modifiers: {} });

export const useModifiers = () => {
  const ctx = useContext(ModifierContext);

  if (!ctx) {
    throw new Error('useModifiers must be used within a ModifierProvider');
  }

  return ctx;
};

const useRootCtx = (): ModifierObj => {
  const ctx = useContext(ModifierContext);

  if (!ctx) {
    return {} as ModifierObj;
  }

  return ctx;
};

interface ModifierProviderProps {
  modifiers: any;
  children: ReactNode;
}

export const ModifierProvider = ({ modifiers, children }: ModifierProviderProps) => {
  const ctx = useRootCtx();
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

interface ComponentCtx {
  name: string;
  map: Record<string, any>;
}

export const ComponentContext = createContext<ComponentCtx>({
  name: '',
  map: {},
});

export const useComponentCtx = (): ComponentCtx => {
  return useContext(ComponentContext);
};

export interface ComponentProviderProps {
  name: string;
  children: any;
  className?: string;
}

export const ComponentProvider = ({
  name,
  children,
  className,
}: ComponentProviderProps) => {
  const { modifiers } = useModifiers();
  const { type = '', color = '' } = modifiers || {};

  const [styleSheets, setStyleSheets] = React.useState<CSSStyleSheet[]>([]);
  let cssSync = null;

  console.log(name);
  const css = useMemo(async () => {
    if (typeof window !== 'undefined') {
      // const { default: compSheet } = await import(`./${name}/${name}.tokens`, {
        const { default: compSheet } = await import(`./icon/icon.tokens`, {
        assert: { type: 'css' },
      });

      const { default: colorSheet } = await import(
        // `./${name}/tokens/${name}-${color}.tokens`,
        `./icon/tokens/icon-${color}.tokens`,
        {
          assert: { type: 'css' },
        }
      );

      const stylesheet = new CSSStyleSheet();
      stylesheet.replaceSync(colorSheet + compSheet);

      setStyleSheets([stylesheet]);
      return compSheet;
    }
  }, [type, color, name, setStyleSheets]);

  return (
    <ComponentContext.Provider value={{ name, map: cssSync || css }}>
      <root.div styleSheets={styleSheets} className={className}>
        {children}
      </root.div>
    </ComponentContext.Provider>
  );
};

export const wrapTokens = <P extends object>(
  Element: ComponentType<P>,
  selector?: string
): ComponentType<P> => {
  const WrappedElement = (props: P) => {
    const { children, className, ...rest } = props as any;
    const { name, map } = useComponentCtx();

    const selectorClass = map[`${name}__${selector}`];

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

  // Assign a displayName to WrappedElement for better debugging and readability
  WrappedElement.displayName = `WrappedElement(${Element.displayName || Element.name || 'Component'})`;

  const elName = Element.displayName?.toLowerCase() || 'component';
  return (props: P) => (
    <ComponentProvider name={elName} className={(props as any).className}>
      <WrappedElement {...props} />
    </ComponentProvider>
  );
};
