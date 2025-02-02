export const TEST_ICON_ID = 'icon-test-id';

export const MOCK = {
  links: [
    {
      Icon: () => <svg data-testid={TEST_ICON_ID + '0'}></svg>,
      href: 'https://example.com',
      target: '_blank',
    },
    {
      Icon: () => <svg data-testid={TEST_ICON_ID + '1'}></svg>,
      href: 'https://example2.com',
      target: '_self',
    },
    {
      Icon: () => <p data-testid={TEST_ICON_ID + '2'}></p>,
      href: 'https://example.com',
    },
    {
      Icon: () => <p data-testid={TEST_ICON_ID + '3'}></p>,
      href: 'https://example2.com',
      target: '_self',
    },
  ],
  withoutIcon: [
    {
      href: 'https://example.com',
      target: '_blank',
    },
  ],
  withoutHref: [
    {
      Icon: () => <svg data-testid={TEST_ICON_ID + '0'}></svg>,
    },
  ],
};
