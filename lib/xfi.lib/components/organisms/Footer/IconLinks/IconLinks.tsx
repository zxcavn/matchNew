import { FC } from 'react';

import { StyledLinks } from './styles';

export const TEST_ID = 'icon-link-test-id';
export const LINK_TEST_ID = 'icon-link-link-test-id';

export type LinkContent = {
  target?: string;
  Icon?: FC;
  href?: string;
};

export type Props = {
  links: LinkContent[];
};

/**
 * A component that renders a list of links with associated icons.
 *
 * The `IconLinks` component is used to display a list of links, each with an optional associated icon. It is often used to create social media or external links in a user interface.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {LinkContent[]} props.links - An array of link content objects, each defining a link's properties.
 *
 * @returns {FC} The IconLinks component displaying the list of links.
 */
const IconLinks = ({ links }: Props) => {
  const filteredLinks = links.filter(link => Boolean(link.Icon));

  if (!filteredLinks.length) return null;

  return (
    <StyledLinks data-testid={TEST_ID}>
      {filteredLinks.map(({ Icon, href, target }, index) => {
        return (
          <a
            href={href}
            key={`IconLinks-${index}`}
            className="link"
            target={target || '_blank'}
            data-testid={LINK_TEST_ID + index}
          >
            {Icon && <Icon />}
          </a>
        );
      })}
    </StyledLinks>
  );
};

export default IconLinks;
