import { getFooterLinkSections } from '@/helpers';
import { openNewSource } from '@xfi/helpers';
import { useIntl } from 'react-intl';
import { Footer } from '../Footer';

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
