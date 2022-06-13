import React, { Component, ReactNode } from 'react';
import { Box, Text, theme } from './theme';
import { FontAwesome5 } from '@expo/vector-icons';


const Header = ({ title, iconName }: { title: string, iconName?: string }) => {
  return (
    <Box >
      <Box marginHorizontal="l" height={60} flexDirection="row" alignItems="center" justifyContent="space-between" >
        <Text color="bright" variant="title1">{title}</Text>
        {iconName ?
          <FontAwesome5 name="spotify" size={24} color="#18D860" />
          : null}
      </Box>
    </Box>
  )
}


export default Header;