import {
  Accordion as MUIAccordion,
  accordionClasses,
  AccordionDetails,
  AccordionSummary,
  accordionSummaryClasses,
  styled,
  Typography,
} from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { ArrowDownIcon } from '@/lib/xfi.lib/icons';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

type Props = PropsWithChildren<{
  /** @type {FormattedMessageId} */
  header: string;
}>;

export const ACCORDION_TEST_ID = 'accordion-test-id';
export const ACCORDION_SUMMARY_TEST_ID = 'accordion-summary-test-id';
export const ACCORDION_DETAILS_TEST_ID = 'accordion-details-test-id';

/**
 * A customizable accordion component with a header and expandable details section.
 *
 * The `Accordion` component renders a header and a collapsible details section.
 * It allows for the customization of the header text and provides icons to
 * indicate the expanded/collapsed state.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {FormattedMessageId} props.header - The ID for the header text, used with `FormattedMessage` to display localized text.
 * @param {ReactNode} props.children - The content to be displayed within the expandable details section.
 *
 * @returns {JSX.Element}
 */
const Accordion = ({ header, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const onClickSummary = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <StyledAccordion data-testid={ACCORDION_TEST_ID} disableGutters expanded={isExpanded}>
      <StyledAccordionSummary
        data-testid={ACCORDION_SUMMARY_TEST_ID}
        $isExpanded={isExpanded}
        expandIcon={<Icon src={ArrowDownIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />}
        onClick={onClickSummary}
      >
        <Typography variant="body1" color="neutrals.secondaryText">
          <FormattedMessage id={header} />
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails data-testid={ACCORDION_DETAILS_TEST_ID}>{children}</StyledAccordionDetails>
    </StyledAccordion>
  );
};

export const StyledAccordion = styled(MUIAccordion, { name: 'StyledAccordion' })(({ theme }) => ({
  margin: 0,
  minHeight: 'initial',
  background: 'none',
  boxShadow: 'none',
  overflow: 'hidden',
  border: `1px solid ${theme.palette.neutrals.border}`,
  position: 'relative',

  [`&.${accordionClasses.root}`]: {
    borderRadius: '1rem',
  },
}));

export const StyledAccordionSummary = styled(AccordionSummary, { name: 'StyledAccordionSummary', shouldForwardProp })<{
  $isExpanded: boolean;
}>(({ theme, $isExpanded }) => ({
  padding: '1.25rem 1rem',

  [`& .${accordionSummaryClasses.content}`]: {
    margin: 0,
  },

  ...($isExpanded && {
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0.5rem',
      left: '1rem',
      right: '1rem',
      height: '1px',
      backgroundColor: theme.palette.neutrals.border,
    },
  }),

  ...(theme.palette.mode === AppThemeVariant.light && {
    [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
      path: {
        stroke: theme.palette.background.light,
      },
    },
  }),
}));

export const StyledAccordionDetails = styled(AccordionDetails, { name: 'StyledAccordionDetails' })(() => ({
  position: 'relative',
  overflow: 'hidden',
  padding: '0.625rem 1rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export default Accordion;
