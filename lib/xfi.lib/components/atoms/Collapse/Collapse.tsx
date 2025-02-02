import { Box } from '@mui/material';
import type { Dispatch, MouseEventHandler, PropsWithChildren, ReactNode, SetStateAction } from 'react';

import { Icon } from '../../../../../components/atoms/Icon';
import { ArrowDownIcon } from '../../../icons';
import { StyledCollapse, StyledCollapseDetails, StyledCollapseSummary } from './styles';

export const COLLAPSE_TEST_ID = 'collapse-test-id';
export const SUMMARY_TEST_ID = 'collapse-summary-test-id';
export const HEADER_TEST_ID = 'collapse-header-test-id';
export const DETAILS_TEST_ID = 'collapse-details-test-id';

type Props = PropsWithChildren<{
  className?: string;
  header: ReactNode;
  isExpanded: boolean;
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
}>;

const Collapse = ({ className, header, children, isExpanded, setIsExpanded }: Props) => {
  const onClickHeaderContent: MouseEventHandler<HTMLDivElement> = event => {
    event.stopPropagation();
  };

  const onClickSummary = () => {
    setIsExpanded(prevState => !prevState);
  };

  return (
    <StyledCollapse data-testid={COLLAPSE_TEST_ID} className={className} disableGutters expanded={isExpanded}>
      <StyledCollapseSummary
        data-testid={SUMMARY_TEST_ID}
        expandIcon={<Icon src={ArrowDownIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />}
        onClick={onClickSummary}
      >
        <Box data-testid={HEADER_TEST_ID} onClick={onClickHeaderContent}>
          {header}
        </Box>
      </StyledCollapseSummary>
      <StyledCollapseDetails data-testid={DETAILS_TEST_ID}>{children}</StyledCollapseDetails>
    </StyledCollapse>
  );
};

export default Collapse;
