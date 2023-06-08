import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";

export class ReactDropdownTreeSelectContainer extends React.Component {
  static getDerivedStateFromProps(props) {
    return {
      data: props.data
    };
  }

  shouldComponentUpdate() {
    return this.props.data !== this.state.data;
  }

  render() {
    return <DropdownTreeSelect {...this.props} {...this.state} />;
  }
}

export const ReactDropdownTreeSelectMemoized = React.memo(props => {
  return <DropdownTreeSelect {...props}  />;
});
