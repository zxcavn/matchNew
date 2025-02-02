import { FormControl, Stack, styled } from '@mui/material';

import { Icon } from '../../../../../../components/atoms/Icon';
import { shouldForwardProp } from '../../../../helpers';
import { Block } from '../../Block';

export const StyledInputFileWrapper = styled(FormControl, { name: 'StyledInputFileWrapper' })(({ theme }) => ({
  width: '100%',
  gap: '0.25rem',

  '& .labelWrapper': {
    paddingLeft: '1.0625rem',
    display: 'flex',
    gap: '0.125rem',

    '& .isRequired': {
      color: theme.palette.alerts.error,
    },
  },
}));

export const StyledInputFile = styled(Block, { name: 'StyledInputFile' })(() => ({
  width: '100%',

  '& .blockChildren': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
}));

export const StyledFileItem = styled(Stack, { name: 'StyledFileItem' })(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'nowrap',
  alignItems: 'center',
  gap: '0.5em',
  width: 'fit-content',
  padding: '0.1875rem 0.375rem',
  borderRadius: '0.5rem',
  background: theme.palette.neutrals.dark,
}));

export const StyledFilesButton = styled(Stack, { name: 'StyledFilesButton', shouldForwardProp })<{
  $disabled?: boolean;
}>(({ theme, $disabled }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.25rem',
  width: '100%',
  paddingBottom: '0.125rem',
  cursor: $disabled ? 'default' : 'pointer',
  span: {
    color: $disabled ? theme.palette.primary.dark : theme.palette.primary.main,
  },
  path: {
    fill: $disabled ? theme.palette.primary.dark : theme.palette.primary.main,
  },
  ':hover': !$disabled && {
    span: {
      color: theme.palette.primary.light,
    },
    path: {
      stroke: theme.palette.primary.light,
    },
  },
  ':active': !$disabled && {
    span: {
      color: theme.palette.primary.lighter,
    },
    path: {
      fill: theme.palette.primary.lighter,
    },
  },
}));

export const StyledDeleteButton = styled(Icon, { name: 'StyledDeleteButton' })(({ theme }) => ({
  fontSize: '1rem',
  cursor: 'pointer',
  g: { stroke: theme.palette.primary.main },

  ':hover': {
    g: { stroke: theme.palette.primary.light },
  },
  ':active': {
    g: { stroke: theme.palette.primary.lighter },
  },
}));
