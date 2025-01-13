import { openNewSource } from '@xfi/helpers';
import { useIntl } from 'react-intl';

import { getFooterLinkSections } from '@/helpers';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { Footer } from '@/lib/xfi.lib/components/organisms';
import { LogoIcon } from '@/public/icons';

type Props = {
  className?: string;
};

const AppFooter = ({ className }: Props) => {
  const { locale } = useIntl();

  const onLicenseClick = () => {
    openNewSource('docs/license.pdf', '_blank');
  };

  return (
    <Footer
      className={className}
      logoSlot={
        <Icon viewBox="0 0 157 44" src={LogoIcon} sx={{ height: 'auto', width: { md: '10rem', xs: '8rem' } }} />
      }
      onLicenseClick={onLicenseClick}
      linkSections={getFooterLinkSections(locale)}
    />
  );
};

export default AppFooter;
