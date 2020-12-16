import React, { Component } from 'react'

type StateType = {
  [propName: string]: any;
};
type PropType = {
  [propName: string]: any;
};

interface MsgChannel {
  state: StateType;
  props: PropType;
}


class MsgChannel extends Component {

  componentDidMount() {
    this.props.history.push('/Activity');
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}

export default MsgChannel;