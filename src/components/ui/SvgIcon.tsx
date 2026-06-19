import React from 'react';
import Svg, { SvgProps } from 'react-native-svg';

type SvgIconProps = SvgProps & {
  children: React.ReactNode;
};

export const SvgIcon = ({ children, ...props }: SvgIconProps) => {
  return (
    <Svg {...props}>
      {children}
    </Svg>
  );
};
