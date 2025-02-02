import NextLink from 'next/link';
import { ElementType, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';

import { Icon } from '../../../../../components/atoms/Icon';
import type { PropsWithTestId } from '../../../helpers/test';
import { LinkIcon } from '../../../icons';
import { StyledLink, StyledLinkContainer } from './styles';

export const NEXT_LINK_TEST_ID = 'link-next-link-test-id';
export const LINK_CONTAINER_TEST_ID = 'link-container-test-id';
export const ICON_TEST_ID = 'link-icon-test-id';

export type Props = PropsWithTestId<{
  children: ReactNode;
  href?: string;
  className?: string;
  target?: string;
  locale?: string | false;
  component?: ElementType;
  onClick?: () => void;
  isShowIcon?: boolean;
}>;

/**
 * A versatile link component that supports routing in Next.js applications.
 *
 * The `Link` component is used to create links in Next.js applications, allowing for client-side navigation. It can render as a simple anchor link or a `NextLink` for improved performance when routing within the application. It accepts various props to customize the link's behavior and appearance.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {ReactNode} props.children - The content of the link, typically text or other elements.
 * @param {string} [props.href=''] - The URL to navigate to when the link is clicked.
 * @param {string} [props.className] - Additional CSS class name to apply to the link.
 * @param {string} [props.target] - The target attribute for the link, which specifies where to open the linked document.
 * @param {string | false} [props.locale] - The locale for the link when using Next.js internationalization. Set to `false` for no localization.
 * @param {keyof HTMLElementTagNameMap} [props.component = 'span'] - The HTML tag that wraps the link.
 * @param {Function} [props.onClick = '()=>{}'] - The optional onClick callback for non href link.
 * @param {boolean} [props.isShowIcon] - The optional prop for show link icon
 *
 * @returns {FC} The Link component, which can be a Next.js `NextLink` or a standard anchor link.
 */
const Link = (props: Props) => {
  const { children, href = '', className, target, locale, component = 'span', onClick, isShowIcon, ...rest } = props;

  if (href) {
    return (
      <NextLink
        href={href}
        locale={locale}
        className={className}
        target={target}
        data-testid={NEXT_LINK_TEST_ID}
        {...rest}
      >
        <LinkContainer isShowIcon={isShowIcon}>
          <StyledLink component={component} variant={'link'}>
            {children}
          </StyledLink>
        </LinkContainer>
      </NextLink>
    );
  }

  return (
    <LinkContainer isShowIcon={isShowIcon} onClick={onClick} {...rest}>
      <StyledLink component={component} variant={'link'} className={className}>
        {children}
      </StyledLink>
    </LinkContainer>
  );
};

type LinkContainerProps = HTMLAttributes<HTMLDivElement> &
  PropsWithChildren<{
    isShowIcon?: boolean;
  }>;

const LinkContainer = ({ children, isShowIcon, ...other }: LinkContainerProps) => {
  return (
    <StyledLinkContainer data-testid={LINK_CONTAINER_TEST_ID} {...other}>
      {children}
      {isShowIcon && (
        <Icon
          className="linkIcon"
          src={LinkIcon}
          viewBox="0 0 20 20"
          sx={{ fontSize: '1.25rem' }}
          data-testid={ICON_TEST_ID}
        />
      )}
    </StyledLinkContainer>
  );
};

export default Link;
