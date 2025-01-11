import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@workspace/ui/components/logo';

export const baseOptions: BaseLayoutProps = {
  nav: {
    title: <Logo />,
  },
  // links: [
  //   {
  //     text: 'Documentation',
  //     url: '/docs',
  //     active: 'nested-url',
  //   },
  // ],
};
