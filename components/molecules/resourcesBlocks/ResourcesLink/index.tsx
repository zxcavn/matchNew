import { Box } from '@mui/material';
import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { RecourseArrowIcon } from '@/public/icons';

import { StyledResourcesLink } from './styles';

type Props = {
  href: string;
  title: string;
  className?: string;
  onMouseEnter?: () => void;
  size?: 'large' | 'small';
  selected?: boolean;
};

const ResourcesLink = ({ href, title, className, onMouseEnter, size = 'large', selected }: Props) => {
  const { isFormattedMessageId } = useIntlHelpers();

  return (
    <StyledResourcesLink
      $selected={selected}
      className={clsx(size, className)}
      href={href}
      target="_blank"
      onMouseEnter={() => onMouseEnter?.()}
    >
      <Box className="linkWrapper">
        {isFormattedMessageId(title) ? <FormattedMessage id={title} /> : title}
        <Icon src={RecourseArrowIcon} viewBox="0 0 28 28" />
      </Box>
    </StyledResourcesLink>
  );
};

export default ResourcesLink;
