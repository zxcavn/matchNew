import { createContext, PropsWithChildren, useCallback, useContext } from 'react';

type Helpers = {
  isFormattedMessageId: (id: unknown) => id is string;
};

const HelpersContext = createContext<Helpers>({
  isFormattedMessageId: (id: unknown): id is string => typeof id === 'string',
});

type Props = PropsWithChildren<{
  messages: Record<string, string>;
}>;

const IntlHelpersProvider = ({ children, messages }: Props) => {
  const isFormattedMessageId = useCallback(
    (id: unknown): id is string => typeof id === 'string' && Boolean(messages[id]),
    [messages]
  );

  return <HelpersContext.Provider value={{ isFormattedMessageId }}>{children}</HelpersContext.Provider>;
};

export const useIntlHelpers = () => {
  const context = useContext(HelpersContext);

  if (context === undefined) {
    throw new Error('useIntlHelpers must be used within a IntlHelpersProvider');
  }

  return context;
};

export default IntlHelpersProvider;
