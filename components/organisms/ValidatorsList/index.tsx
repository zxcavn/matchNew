import { Box, Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { usePageParam } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { UnbondStatusDto } from '@/crud';
import { useCheckUnbondStatus, useDelegations, useWallet } from '@/hooks';
import { Delegation } from '@/hooks/useDelegations';
import { Icon, Pagination } from '@/lib/xfi.lib/components/atoms';
import { ColumnTypesEnum, DesktopTable, TableBlock } from '@/lib/xfi.lib/components/molecules';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { RefreshIcon, SearchIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { Coin, WalletType } from '@/shared/types';

import { ValidatorName } from '@/components/atoms';

import { RedelegateWidget, UndelegateWidget, WithdrawRewardWidget } from '../operationWidgets';
import {
  StyledListContainer,
  StyledListItem,
  StyledRefreshButton,
  StyledRewardContainer,
  StyledSearchInput,
  StyledStakingButtonsContainer,
  StyledStakingContainer,
  StyledTitleWrapper,
} from './styles';

const VALIDATORS_PER_PAGE = 10;

type Props = {
  walletType: WalletType;
  /** @type {FormattedMessageId} */
  title?: string;
};

const ValidatorsList = ({ walletType, title = 'SUMMARY.MY_VALIDATORS' }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { currentWallet } = useWallet({ walletType });
  const { fetch, delegationList, isLoading } = useDelegations(currentWallet.address);
  const { isLoading: isLoadingStatus, data: unbondStatus } = useCheckUnbondStatus();

  const [searchValue, setSearchValue] = useState('');

  const page = usePageParam();
  const { query, replace } = useRouter();

  const handleSearch = (value: SetStateAction<string>) => {
    setSearchValue(value);
  };

  const delegationListToRender = useMemo(() => {
    const startIndex = page === 1 ? 0 : (page - 1) * VALIDATORS_PER_PAGE;
    const endIndex = page * VALIDATORS_PER_PAGE;
    const validatorsPerPage = delegationList.slice(startIndex, endIndex);

    const filteredDelegations = searchValue
      ? validatorsPerPage.filter(delegation =>
          delegation.validator.moniker.toLowerCase().includes(searchValue.toLowerCase())
        )
      : validatorsPerPage;

    return filteredDelegations;
  }, [delegationList, searchValue, page]);

  const onChangePage = (page: number) => {
    replace({
      query: { ...query, page },
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const onRefreshValidatorsData = () => fetch();

  const renderTable = () => (
    <DesktopTable<Delegation>
      rows={delegationListToRender}
      columns={[
        {
          id: 'validator',
          label: {
            text: (
              <Typography textAlign={'start'} color={'neutrals.secondaryText'} variant="body2">
                <FormattedMessage id="SUMMARY.NAME" />
              </Typography>
            ),
          },
          type: ColumnTypesEnum.jsx,
          render: ({ validator }) => {
            const { viewBox, iconSrc, moniker, picture } = validator;

            return <ValidatorName viewBox={viewBox} iconSrc={iconSrc} name={moniker} picture={picture} />;
          },
        },
        {
          id: 'delegation',
          label: {
            text: (
              <Typography textAlign={'end'} color={'neutrals.secondaryText'} variant="body2">
                <FormattedMessage id="SUMMARY.STAKING" />
              </Typography>
            ),
            align: 'right',
          },
          type: ColumnTypesEnum.jsx,
          render: delegationData => (
            <Staking walletType={walletType} unbondStatus={unbondStatus} delegation={delegationData} />
          ),
        },
        {
          id: 'reward',
          label: {
            text: (
              <Typography textAlign={'end'} color={'neutrals.secondaryText'} variant="body2">
                <FormattedMessage id="SUMMARY.REWARD" />
              </Typography>
            ),
            align: 'right',
          },
          type: ColumnTypesEnum.jsx,
          render: delegationData => <Reward walletType={walletType} delegation={delegationData} />,
        },
      ]}
    />
  );

  const renderList = () => (
    <StyledListContainer>
      {delegationListToRender.map((delegation, index) => {
        const { picture, iconSrc, viewBox, moniker } = delegation.validator;

        return (
          <StyledListItem key={index} $isFill={Boolean(index % 2)}>
            <ValidatorName name={moniker} viewBox={viewBox} iconSrc={iconSrc} picture={picture} />
            <Staking walletType={walletType} delegation={delegation} unbondStatus={unbondStatus} />
            <Reward walletType={walletType} delegation={delegation} />
          </StyledListItem>
        );
      })}
    </StyledListContainer>
  );

  return (
    <TableBlock
      isLoading={(isLoading && !delegationListToRender.length) || isLoadingStatus}
      hasData={Boolean(delegationListToRender.length)}
      notFound={{ text: 'VALIDATORS.NO_VALIDATORS' }}
      title={
        <StyledTitleWrapper>
          <Typography variant="h4">
            <FormattedMessage id={title} />
          </Typography>
          <StyledRefreshButton
            variant="transparent"
            startIcon={
              <Icon
                sx={theme => ({
                  path: { stroke: theme.palette.primary.main },
                })}
                style={{
                  width: '1.25rem',
                  height: '1.25rem',
                }}
                src={RefreshIcon}
                viewBox="0 0 20 20"
              />
            }
            onClick={onRefreshValidatorsData}
            isDisabled={!delegationList.length}
          >
            <FormattedMessage id="SUMMARY.REFRESH_DATA" />
          </StyledRefreshButton>
          <StyledSearchInput
            placeholder={{ type: 'intl', id: 'TOKENS.SEARCH_VALIDATOR' }}
            prefix={<Icon src={SearchIcon} />}
            value={searchValue}
            onChange={e => handleSearch(e.target.value)}
          />
        </StyledTitleWrapper>
      }
    >
      {isMobile ? renderList() : renderTable()}

      <Box sx={{ margin: { md: '1.5rem', xs: '1.5rem 1rem' } }}>
        <Pagination
          variant={'default'}
          count={Math.ceil(delegationList.length / VALIDATORS_PER_PAGE)}
          page={page}
          onChange={onChangePage}
        />
      </Box>
    </TableBlock>
  );
};

type AmountProps = Coin & {
  decimals?: number;
};

const Amount = ({ amount, denom, decimals }: AmountProps) => {
  const formattedAmount = MxNumberFormatter.formatUnitsToDisplay(amount, {
    maxFractionalLength: decimals || CURRENCIES[denom].formatDecimals,
  });

  return (
    <Stack flexWrap="nowrap" direction="row" alignItems="center" gap="0.25rem">
      <Typography whiteSpace="nowrap" color="background.light" variant="body1">
        {formattedAmount}
      </Typography>
      <Typography textTransform="uppercase" color="background.light" variant="body1">
        {denom}
      </Typography>
    </Stack>
  );
};

type StakingProps = {
  delegation: Delegation;
  unbondStatus: UnbondStatusDto;
  walletType: WalletType;
};

const Staking = ({ delegation, unbondStatus, walletType }: StakingProps) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <StyledStakingContainer>
      <Stack gap="0.5rem">
        {isMobile && (
          <Typography variant="body2" color="neutrals.secondaryText">
            <FormattedMessage id="SUMMARY.STAKING" />
          </Typography>
        )}
        <Amount {...delegation.delegation} />
      </Stack>
      <StyledStakingButtonsContainer>
        <RedelegateWidget
          walletType={walletType}
          unbondStatus={unbondStatus}
          delegationAmount={delegation.delegation}
          validator={delegation.validator}
          buttonProps={{ isFullWidth: isMobile, size: 'medium' }}
        />
        <UndelegateWidget
          walletType={walletType}
          unbondStatus={unbondStatus}
          delegation={delegation}
          buttonProps={{ className: 'unbondButton', isFullWidth: isMobile, size: 'medium', variant: 'secondary' }}
        />
      </StyledStakingButtonsContainer>
    </StyledStakingContainer>
  );
};

type RewardProps = {
  delegation: Delegation;
  walletType: WalletType;
};

const Reward = ({ delegation, walletType }: RewardProps) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  return (
    <StyledRewardContainer>
      <Stack gap="0.5rem">
        {isMobile && (
          <Typography variant="body2" color="neutrals.secondaryText">
            <FormattedMessage id="SUMMARY.REWARD" />
          </Typography>
        )}
        <Amount {...delegation.reward} decimals={18} />
      </Stack>
      <WithdrawRewardWidget
        walletType={walletType}
        validator={delegation.validator}
        buttonProps={{ size: 'medium', isDisabled: !Number(delegation.delegation.amount) }}
      />
    </StyledRewardContainer>
  );
};

export default ValidatorsList;
