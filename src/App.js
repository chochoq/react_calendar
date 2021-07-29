/*eslint-disable*/
import React from 'react';

import CalMain from "./CalMain";
import CalInsert from './CalInsert';

// 라우터
import {  Route} from 'react-router-dom';
import { withRouter } from 'react-router';

const App = (props) => {

  return (
    <div>
      {/* history를 가져오기위한 */}
      <Route path="/" exact render={(props) => (
        <CalMain history={props.history} />)}
      />

      <Route path="/calInsert" exact render={(props) => (
        <CalInsert history={props.history} />)}
      />
    </div>
  );
}

export default (withRouter(App));
