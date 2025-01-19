import { getFooterLinkSections } from '@/helpers';
import { Footer } from '@/lib/xfi.lib/components/organisms';
import { openNewSource } from '@xfi/helpers';
import { useIntl } from 'react-intl';

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
        /*лого*/
      onLicenseClick={onLicenseClick}
      linkSections={getFooterLinkSections(locale)}
    />
  );
};

export default AppFooter;
