declare module '*.svg' {
  import * as React from 'react';

  // React Component export
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  // Default export (URL string)
  const src: string;
  export default src;
}
