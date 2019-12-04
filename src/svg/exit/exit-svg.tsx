import React, { ReactElement } from 'react';

import Element from './exit-svg-styled';
import PExitSvg from './exit-svg-types';

const ExitSvg = (props: PExitSvg): ReactElement => (
  <Element {...props}>
    <svg width="16" height="16" viewBox="0 0 12 12">
      <defs>
        <path
          id="a"
          d="M9.882.118a.405.405 0 0 0-.572 0L.118 9.292a.403.403 0 1 0 .572.57L9.882.688a.403.403 0 0 0 0-.57zm0 9.174L.69.118a.404.404 0 0 0-.572.57L9.31 9.862a.403.403 0 0 0 .572-.57z"
        />
      </defs>
      <use
        fill="#1f2d3d"
        fillRule="nonzero"
        stroke="#1f2d3d"
        strokeWidth="1"
        transform="translate(1 1)"
        href="#a"
      />
    </svg>
  </Element>
);

export default ExitSvg;
