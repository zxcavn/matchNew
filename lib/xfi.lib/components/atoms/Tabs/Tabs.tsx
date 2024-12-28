import { TabProps, TabsProps } from '@mui/material';
import { useIntl } from 'react-intl';

import { useIntlHelpers } from '../../../i18n';
import { StyledTab, StyledTabs } from './styles';

export const TEST_ID = 'tabs-test-id';
export const TAB_TEST_ID = 'tab-test-id';

export type TabSize = 'large' | 'small';

type CustomTabProps<T> = Omit<TabProps, 'value'> & { value: T };

export type Props<T> = Omit<TabsProps, 'value'> & {
  tabs: CustomTabProps<T>[];
  setTab: (t: T) => void;
  size?: TabSize;
  value: T;
};

const MUITabs = (props: TabsProps & { $size?: TabSize }) => <StyledTabs {...props} />;

/**
 * An individual tab within the `Tabs` component.
 *
 * The `Tab` component represents an individual tab within the `Tabs` component. It is used to configure the appearance and label of a specific tab.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Tab` component.
 * @param {string | React.ReactNode} [props.label] - The label to display for the tab.
 * @param {string | number} props.value - The value associated with the tab.
 * @param {React.ReactNode} [props.icon] - An optional icon to display alongside the label.
 * @param {boolean} [props.disabled] - If `true`, the tab is disabled and cannot be selected.
 * @param {string} [props.className] - Additional CSS classes to be applied to the tab.
 *
 * @returns {FC} The `Tab` component for configuring an individual tab within the `Tabs` component.
 */
const MUITab = (props: TabProps & { $size?: TabSize }) => <StyledTab {...props} />;

MUITabs.displayName = 'Tabs';
MUITabs.Tab = MUITab;

/**
 * A customizable tab navigation component for switching between content sections.
 *
 * The `Tabs` component allows you to create a tabbed navigation system for switching between different content sections. It provides options for specifying the tabs' appearance and labels.
 *
 * @component
 *
 * @param {Props} props - The props for configuring the `Tabs` component.
 * @param {TabProps[]} props.tabs - An array of tab configurations, each containing props for an individual tab.
 * @param {function} props.setTab - A callback function to handle tab selection.
 * @param {TabSize} [props.size='small'] - The size of the tabs. Options are 'small' or 'large'.
 * @param {string} props.value - The value of the currently selected tab.
 *
 * @returns {FC} The `Tabs` component for creating a tabbed navigation system.
 *
 * @template T - The type of the tab values.
 */
const Tabs = <T,>(props: Props<T>) => {
  const { tabs, setTab, size = 'small', ...otherProps } = props;
  const { formatMessage } = useIntl();
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <MUITabs {...otherProps} onChange={(_, tab) => setTab(tab)} $size={size} data-testid={TEST_ID}>
      {tabs.map((tab, i) => {
        const label = isFormattedMessageId(tab.label) ? formatMessage({ id: String(tab.label) }) : tab.label;

        return (
          <MUITab {...tab} key={String(tab.value)} $size={size} label={label} data-testid={`${TAB_TEST_ID}-${i + 1}`} />
        );
      })}
    </MUITabs>
  );
};

export default Tabs;
