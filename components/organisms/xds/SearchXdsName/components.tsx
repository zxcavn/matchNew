import { Stack, Theme, Typography } from '@mui/material';

import { XdsNameAvailabilityStatus } from '@/hooks/xds';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { ArrowRightIcon } from '@/lib/xfi.lib/icons';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';
import { ROOT_XDS_DOMAIN } from '@/services/xds/constants';

import { StyledSearchResultItemContainer, StyledSpinner } from './styles';

type SearchResultItemProps = {
  name: string;
  isLoading: boolean;
  status: XdsNameAvailabilityStatus | null;
  hasError?: boolean;
  onClick: (name: string) => void;
};

export const SearchResultItem = ({
  name,
  isLoading,
  status,
  hasError,
  onClick: onClickProp,
}: SearchResultItemProps) => {
  const isAvailable = status === XdsNameAvailabilityStatus.AVAILABLE && !isLoading && !hasError;

  const onClick = () => {
    if (isAvailable) {
      onClickProp(name);
    }
  };

  return (
    <StyledSearchResultItemContainer onClick={onClick} $isCursorPointer={isAvailable}>
      <Stack minHeight="2rem" justifyContent="center">
        <Typography textTransform="lowercase" sx={{ wordBreak: 'break-all' }} variant="body2" color="background.light">
          {name}.{ROOT_XDS_DOMAIN}
        </Typography>
      </Stack>
      {isLoading ? (
        <Stack justifyContent="center" alignItems="center" minHeight="2rem">
          <StyledSpinner />
        </Stack>
      ) : (
        <Stack gap="0.25rem" direction="row" alignItems="center" justifyContent="space-between">
          {isAvailable && <Icon src={ArrowRightIcon} viewBox="0 0 20 20" sx={getArrowSxProps} />}
        </Stack>
      )}
    </StyledSearchResultItemContainer>
  );
};

const getArrowSxProps = (theme: Theme) => ({
  fontSize: '0.75rem',
  path: {
    stroke:
      theme.palette.mode === AppThemeVariant.light
        ? theme.palette.neutrals.secondaryText
        : theme.palette.neutrals.label,
  },
});
