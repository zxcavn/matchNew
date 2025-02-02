import { Box } from '@mui/material';
import clsx from 'clsx';
import { MouseEventHandler, ReactNode, useState } from 'react';

import { Icon } from '../../../../../components/atoms/Icon';
import { ArrowDownIcon } from '../../../icons';
import { useMediaQuery } from '../../../theme';
import { Divider } from '../Divider';
import { StyledAccordion, StyledAccordionDetails, StyledAccordionSummary, StyledExpandIconContainer } from './styles';

export const TEST_ID = 'accordion-test-id';
export const EXPAND_ICON_TEST_ID = 'expand-icon-test-id';
export const ACCORDION_HEADER_TEST_ID = 'accordion-header-test-id';

export type AccordionVariant = 'default' | 'sidebar';

export type Props = {
  headerSlot: ReactNode;
  detailsSlot?: ReactNode | null;
  unexpandedDetailsSlot?: ReactNode | null;
  backgroundColor?: string;
  isShowDivider?: boolean;
  isExpandedDefault?: boolean;
  variant?: AccordionVariant;
  onChange?: (expanded: boolean) => void;
};

/**
 * A customizable Accordion component for expanding and collapsing content.
 *
 * The `Accordion` component can display a header slot and a details slot that can be expanded and collapsed.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {JSX.Element} props.headerSlot - The element to be displayed in the header section of the Accordion.
 * @param {JSX.Element} props.detailsSlot - The element to be displayed in the details section of the Accordion.
 * @param {JSX.Element|null} [props.unexpandedDetailsSlot] - An optional element to be displayed in the details section when the Accordion is not expanded.
 * @param {string} [props.backgroundColor] - The background color of the Accordion.
 * @param {boolean} [props.isShowDivider = true] - The flag is show divider between header and content.
 * @param {boolean} [props.isExpandedDefault = true] - The flag is show component expanded.
 * @param {'default' | 'sidebar'} [props.variant = 'default'] - The style of accordion.
 * @param {(expanded: boolean) => void} [props.onChange] - Callback function to handle the change of the Accordion's expanded state.
 *
 * @returns {FC} The Accordion component.
 */
const Accordion = ({
  headerSlot,
  detailsSlot,
  unexpandedDetailsSlot,
  backgroundColor,
  isShowDivider = true,
  isExpandedDefault = false,
  variant = 'default',
  onChange,
}: Props) => {
  const [expanded, setExpanded] = useState(isExpandedDefault);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const toggleAccordion: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    const newExpanded = !expanded;

    setExpanded(newExpanded);
    onChange?.(newExpanded);
  };

  return (
    <StyledAccordion
      data-testid={TEST_ID}
      className={clsx({ hasUnexpandedDetails: unexpandedDetailsSlot })}
      $backgroundColor={backgroundColor}
      expanded={expanded}
    >
      <Box data-testid={ACCORDION_HEADER_TEST_ID} onClick={e => !isMobile && toggleAccordion(e)}>
        <StyledAccordionSummary
          expandIcon={
            detailsSlot && (
              <StyledExpandIconContainer data-testid={EXPAND_ICON_TEST_ID} onClick={toggleAccordion}>
                <Icon src={ArrowDownIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
              </StyledExpandIconContainer>
            )
          }
          $variant={variant}
        >
          {headerSlot}
        </StyledAccordionSummary>
        {isShowDivider && <Divider sx={{ mt: '0.75rem' }} />}
        {unexpandedDetailsSlot}
      </Box>
      {detailsSlot && <StyledAccordionDetails>{detailsSlot}</StyledAccordionDetails>}
    </StyledAccordion>
  );
};

export default Accordion;
