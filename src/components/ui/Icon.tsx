import React from 'react';
import {
  MaterialIcons,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Feather,
  AntDesign,
  Entypo,
  EvilIcons,
  Fontisto,
  Foundation,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import { iconSizes } from '@theme/iconSizes';

type AnyIcon = React.ComponentType<{
  name: string;
  size?: number;
  color?: string;
  style?: object;
}>;

const families: Record<string, AnyIcon> = {
  MaterialIcons: MaterialIcons as AnyIcon,
  MaterialCommunityIcons: MaterialCommunityIcons as AnyIcon,
  Ionicons: Ionicons as AnyIcon,
  FontAwesome: FontAwesome as AnyIcon,
  Feather: Feather as AnyIcon,
  AntDesign: AntDesign as AnyIcon,
  Entypo: Entypo as AnyIcon,
  EvilIcons: EvilIcons as AnyIcon,
  Fontisto: Fontisto as AnyIcon,
  Foundation: Foundation as AnyIcon,
  Octicons: Octicons as AnyIcon,
  SimpleLineIcons: SimpleLineIcons as AnyIcon,
  Zocial: Zocial as AnyIcon,
};

type IconFamily = keyof typeof families;

type IconProps = {
  family?: IconFamily;
  name: string;
  size?: keyof typeof iconSizes | number;
  color?: string;
  style?: object;
};

const IconComponent = ({
  family,
  name,
  size,
  color,
  style,
}: IconProps) => {
  const resolvedFamily = family ?? 'MaterialIcons';
  const Component = families[resolvedFamily];

  const iconSize = typeof size === 'number' ? size : iconSizes[size ?? 'md'];

  return (
    <Component
      name={name}
      size={iconSize}
      color={color}
      style={style}
    />
  );
};

export const Icon = React.memo(IconComponent);
