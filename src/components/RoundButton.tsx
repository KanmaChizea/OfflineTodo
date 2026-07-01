import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  onPress: () => void;
};
export const RoundButton = ({ children, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 50,
    padding: 10,
  },
});
