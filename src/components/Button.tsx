import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Typography } from './Typography';

type Props = {
  title: string;
  onPress: () => void;
};
export const Button = ({ title, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Typography textAlign="center" color="white" weight="700">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
  },
});
