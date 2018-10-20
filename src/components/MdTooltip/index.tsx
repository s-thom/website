import React from 'react';
import Svg from 'react-svg-inline';

import svgInfo from '../../include/info.svg';
import svgWarn from '../../include/warning.svg';
import svgError from '../../include/error.svg';

import './index.css';

enum TooltipTypes {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DEFAULT = 'default',
}

interface Props {
  type: TooltipTypes;
  children: React.ReactChild;
}

const svgMap = {
  [TooltipTypes.INFO]: svgInfo,
  [TooltipTypes.WARN]: svgWarn,
  [TooltipTypes.ERROR]: svgError,
  [TooltipTypes.DEFAULT]: svgInfo,
};

// tslint:disable-next-line function-name
export default function TooltipIcon(props: Props) {
  const svgContent = svgMap[props.type || TooltipTypes.DEFAULT];

  return (
    <span className="Tooltip">
      <Svg svg={svgContent} className="Tooltip-svg" cleanup></Svg>
      <div className="Tooltip-content">
        {props.children}
      </div>
    </span>
  );
}
