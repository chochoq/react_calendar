/*eslint-disable*/
import React,{useState} from 'react';

import CalRead from './CalRead';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { Fab, Button, ButtonGroup, List,StylesProvider } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";

import { loadCalFb  } from "./redux/modules/calendar";

const calMain = (props) => {

  const ListCal = useSelector(state => state.calendar.calendar);

  const dispatch = useDispatch()

  const [todo_info, setTodo] = useState()
  const [time_info, setTime] = useState()
  const [day_info, setDay] = useState()
  const [date_info, setDate] = useState()
  const [id_info, setId] = useState()
  const [status, isModalOpen] = useState(false)

  let calendar_list = []

  React.useEffect(() => {
    dispatch(loadCalFb());
  }, [])

  calendar_list = ListCal.map((r, idx) => {
    return {
      start: r.refStart,

      title: r.refText,
      id: r.id
    }
  })

  // 모달 오픈 & 클로즈
  const openModal = (id) => {

    // 끝나는 날짜도 추가하고시퍼어어어
    let daily_schedule = ListCal.filter((schedule) => {
      if(schedule.id == id){
        return schedule
      }
    })

    let time = daily_schedule[0].refStart.split('T')[1]
    let hour = time.split(':')[0] 
    let minute = time.split(':')[1]
    let day = "오전"
    if (hour >= 12){
      day = "오후"
    }
    if(hour > 12){
      hour = "0"+(hour-12)
    }
    setTodo(daily_schedule[0].refText)
    setTime(hour+":"+minute)
    setDay(day)
    setDate(daily_schedule[0].refStart.split('T')[0])
    setId(id)
    isModalOpen(true)
  }
  
  const closeModal = () => {
    isModalOpen(false)
  }
  
    return (
    <StylesProvider>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendar_list}
            eventClick={(info) => {
              openModal(info.event.id)
            }    //함수를 만들어서 모달창을 뜰 수 있게한다.
            }
          />
        
        <Buttons>
          {/* 추가버튼 클릭시 쓰기페이지로 이동 */}
          <Fab color="secondary" aria-label="edit" onClick={() => {
              // console.log(props.history)
              props.history.push('/calInsert');
          }}>
            <EditIcon />
          </Fab>
          <ButtonGroup color="secondary" aria-label="outlined secondary button group">
            <Button>완료된 일정</Button> 
            <Button>전체 일정 </Button>
              {/* if문으로 완료 전체 보이게 만들기 */}
        </ButtonGroup>
        </Buttons>

        {/* 모달창 정보보내기 */}
        <CalRead id ={id_info} date = {date_info} day = {day_info} time = {time_info} todo = {todo_info}  status = {status} close={closeModal} />
    </StylesProvider>
  );
}

// 플로팅 버튼 고정위치로 만들기
const Buttons = styled.div`
  position: fixed;
  right: 10px;
  bottom: 100px;
  z-index: 10;
`;

export default calMain;

