import React from "react";
import { connect } from "react-redux";
import { getTest } from "../store/store";

interface LinkStateProps {
  state: Array<string>;
}

interface LinkDispatchProps {
  testDispatch: () => void;
}

type Props = LinkStateProps & LinkDispatchProps;

class Index extends React.Component<Props> {
  render() {
    return (
      <div>
        <p>Hello!</p>
        <button onClick={() => this.props.testDispatch()}>TESTSCRIPT</button>
      </div>
    );
  }
}

const mapStateToProps = (state: Array<string>) => ({
  state: state
});

const mapDispatchToProps = (dispatch: any) => ({
  testDispatch: () => dispatch(getTest())
});
export default connect(mapStateToProps, mapDispatchToProps)(Index);
