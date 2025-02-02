import { Pagination as PaginationButtons, PaginationRenderItemParams, Stack, Typography } from '@mui/material';

import { Icon } from '../../../../../components/atoms/Icon';
import { ArrowRightIcon } from '../../../icons';
import { useMediaQuery } from '../../../theme';
import { PaginationInput } from './PaginationInput/PaginationInput';
import { StyledArrowContainer, StyledNavigationButton, StyledPaginationContainer } from './styles';

export const TEST_ID = 'pagination-test-id';
export const DEFAULT_TEST_ID = 'pagination-default-test-id';
export const PREVIOUS_TEST_ID = 'pagination-previous-test-id';
export const NEXT_TEST_ID = 'pagination-next-test-id';

type CommonProps = {
  page: number;
  onChange: (page: number) => void;
  isDisabled?: boolean;
  className?: string;
};

export type Props = CommonProps &
  (
    | {
        variant?: 'default';
        count: number;
      }
    | {
        variant: 'short';
        hasNext: boolean;
      }
  );

const Pagination = (props: Props) => {
  const isSm = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const elementJustifyPosition = !isSm ? 'flex-end' : 'flex-start';

  if (props.variant === 'short') {
    const { isDisabled, className, page, onChange, hasNext } = props;
    const isDisabledPrev = isDisabled || page === 1;
    const isDisabledNext = isDisabled || !hasNext;

    return (
      <Stack
        justifyContent={'flex-end'}
        direction="row"
        className={className}
        gap="0.5rem"
        alignItems="center"
        data-testid={TEST_ID}
      >
        <StyledNavigationButton
          disabled={isDisabledPrev}
          onClick={() => !isDisabledPrev && onChange(page - 1)}
          data-testid={PREVIOUS_TEST_ID}
        >
          <StyledArrowContainer $rotate>
            <Icon src={ArrowRightIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
          </StyledArrowContainer>
        </StyledNavigationButton>

        <StyledNavigationButton sx={{ cursor: 'default' }} selected>
          <Typography color="background.light" variant="body2">
            {page}
          </Typography>
        </StyledNavigationButton>

        <StyledNavigationButton
          disabled={isDisabledNext}
          onClick={() => !isDisabledNext && onChange(page + 1)}
          data-testid={NEXT_TEST_ID}
        >
          <StyledArrowContainer>
            <Icon src={ArrowRightIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
          </StyledArrowContainer>
        </StyledNavigationButton>
      </Stack>
    );
  }

  const { isDisabled, className, count, page, onChange } = props;

  return (
    <StyledPaginationContainer
      className={className}
      justifyContent={elementJustifyPosition}
      data-testid={DEFAULT_TEST_ID}
      gap={isSm ? '1rem' : '1.5rem'}
    >
      <PaginationInput count={count} onChange={onChange} />
      <PaginationButtons
        disabled={isDisabled}
        className={'paginationControls'}
        siblingCount={isSm ? 0 : 1}
        count={count}
        page={page}
        hideNextButton={page >= count}
        hidePrevButton={page <= 1}
        onChange={(_, page) => onChange(page)}
        renderItem={item => <PaginationItem {...item} />}
      />
    </StyledPaginationContainer>
  );
};

const PaginationItem = ({ page, type, ...restProps }: Partial<PaginationRenderItemParams>) => {
  if (['end-ellipsis', 'start-ellipsis'].includes(type || '')) {
    return (
      <Typography variant={'subtitle1'} color={'neutrals.secondaryText'}>
        . . .
      </Typography>
    );
  }

  if (type === 'page') {
    return (
      <StyledNavigationButton {...restProps}>
        <Typography variant="body2">{page}</Typography>
      </StyledNavigationButton>
    );
  }

  if (['next', 'previous'].includes(type ?? '')) {
    return (
      <StyledNavigationButton {...restProps} data-testid={type === 'previous' ? PREVIOUS_TEST_ID : NEXT_TEST_ID}>
        {type === 'previous' ? (
          <StyledArrowContainer $rotate>
            <Icon src={ArrowRightIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
          </StyledArrowContainer>
        ) : (
          <StyledArrowContainer>
            <Icon src={ArrowRightIcon} sx={{ fontSize: '1.25rem' }} viewBox="0 0 20 20" />
          </StyledArrowContainer>
        )}
      </StyledNavigationButton>
    );
  }

  return null;
};

export default Pagination;
