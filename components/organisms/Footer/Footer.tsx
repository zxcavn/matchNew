import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { Divider, Link } from '../../atoms';
import { FOOTER_SOCIAL_LINKS, LEGAL_INFORMATION } from './constants';
import { IconLinks } from './IconLinks';
import { StyledFooter, StyledFooterLinksWrapper } from './styles';

export type LinkSection = {
  /** @type {FormattedMessageId} */
  title: string;
  links: Array<{
    title: string;
    href: string;
    target: string;
  }>;
};

type Props = {
  logoSlot?: ReactNode;
  className?: string;
  linkSections?: LinkSection[];
  onLicenseClick?: () => void;
};

const Footer = ({ className, linkSections = [], onLicenseClick, logoSlot }: Props) => {
  const year = new Date().getFullYear();

  return (
    <StyledFooter className={className}>
      <Stack direction={{ xs: 'column', lg: 'row' }} gap={'2rem'} justifyContent={'space-between'}>
        <Stack gap={'2rem'}>
          {logoSlot}
          <div className="networksWrapper">
            <IconLinks links={FOOTER_SOCIAL_LINKS} />
          </div>
        </Stack>
        <FooterLinks linkSections={linkSections} />
        <Stack gap={'1rem'} maxWidth={'18rem'}>
          <Link component={'span'} onClick={onLicenseClick}>
            <FormattedMessage id={'LIB.SUMMARY.LICENSE'} />:
          </Link>
          <Typography variant="body2" color="neutrals.secondaryText" whiteSpace="pre-wrap">
            {LEGAL_INFORMATION.license}
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mt: '1.5rem' }} />
      <Stack className={'legalInformation'} justifyContent={'space-between'}>
        <Typography variant="subtitle1" color="neutrals.secondaryText">
          © {LEGAL_INFORMATION.companyName} {year}
        </Typography>
        <Typography variant="body1" color="neutrals.secondaryText">
          {LEGAL_INFORMATION.legalAddress}
        </Typography>
        <Typography variant="body1" color="neutrals.secondaryText">
          All rights reserved
        </Typography>
      </Stack>
    </StyledFooter>
  );
};

type FooterLinksProps = {
  linkSections: LinkSection[];
};

const FooterLinks = ({ linkSections }: FooterLinksProps) => {
  return linkSections.map(({ links, title }) => {
    return (
      <StyledFooterLinksWrapper key={`item-${title}`}>
        <div className="item">
          <Typography variant="subtitle1" color="neutrals.secondaryText">
            <FormattedMessage id={title} />
          </Typography>
          <div className="linksWrapper">
            {links?.map(({ title, href, target }) => {
              return (
                <div key={`link-${title}`} className="link">
                  {href ? (
                    <Typography
                      variant="body1"
                      component={'a'}
                      color="neutrals.secondaryText"
                      href={href}
                      target={target || '_blank'}
                    >
                      <FormattedMessage id={title} />
                    </Typography>
                  ) : (
                    <Typography variant="body1" color="neutrals.secondaryText">
                      <FormattedMessage id={title} />
                    </Typography>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </StyledFooterLinksWrapper>
    );
  });
};

export default Footer;
