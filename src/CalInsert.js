/*eslint-disable*/
import React from 'react';
import styled from "styled-components";

import { TextField, Button} from '@material-ui/core';

import moment from 'moment';
import 'moment/locale/ko';

import { useSelector, useDispatch, dispatch, connect } from "react-redux";
import { createCalFb } from "./redux/modules/calendar";

import { withRouter } from 'react-router';

// 이 함수는 스토어가 가진 상태값을 props로 받아오기 위한 함수예요.
const mapStateTopProps = (state) => ({
    // ...state,
});

// 이 함수는 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수예요.
const mapDispatchToProps = (dispatch) => ({
    load: () => {
    },
});

const CalInsert = (props) => {

    // 여기..뭐여 틀린거같은데 잘모르겟음
    const ListCal = useSelector(state => state.calendar.ListCalendar);
    
    // 리덕스에 넣어주기
    const dispatch = useDispatch();


    // 언젠가 쓰고싶으니까 우선 오늘 날짜 킵하기
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss');
    console.log(nowTime);

    // 입력정보 받아오기 (ref)
    // const refAllday = React.useRef();
    const refStart = React.useRef("nowTime");

    const refText = React.useRef();

    return (
        <Container>
            <p>today {nowTime}</p>
            <div>
                <TextField
                    height="auto"
                    margin="1px 0px"
                    id="datetime-local"
                    label="시작"
                    type="datetime-local"
                    defaultValue="yyyy-MM-ddThh:mm"
                    inputRef={refStart}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />

                <TextField
                    height="auto"
                    margin="1px 0px"
                    placeholder="일정을 입력해주세요"
                    rows={4}
                    inputRef={refText}
                />      
            </div>
                <Button type="submit" variant="outlined" size="small" color="primary"
                    onClick={() => {
                        let list = {
                            refStart: refStart.current.value,
                            refText: refText.current.value
                        }
                        dispatch(createCalFb(list));
                        props.history.push('/');
                    }}>
                        submit
                </Button>
            <Button
                type="reset"
                variant="outlined"
                size="small"
                color="primary"
                onClick={() => {
                    // console.log(props.history);
                    props.history.push('/');
                }}>
                back
                </Button>
        </Container>

    );
}

const Container = styled.div`
    margin : 100px;

    height: 50vh;
    width: 50vw;
    top: 50%;
    left: 50%;
`;




export default connect(mapStateTopProps ,mapDispatchToProps)(withRouter(CalInsert));


