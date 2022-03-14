//you can use redux store like this

import React from "react";
import { Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from ".";

interface USAGEProps {}

const USAGE: React.FC<USAGEProps> = ({}) => {
  const dispatch = useDispatch();
  const { addState, removeState } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const data = useSelector((state: State) => state.data);

  return <Text>{data}</Text>;
};

export default USAGE;
