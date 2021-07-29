// calendar.js
/*eslint-disable*/
// 파이어베이스
import { firestore } from "../../firebase";

// 파이어베이스
  // console.log(firestore);
  const db = firestore.collection('Calendar');

// db insert function
export const createCalFb = (calendar_list) => {
  return function (dispatch) {
    let calendar = {
      refStart: calendar_list.refStart,
      refText: calendar_list.refText,
      complate:false
    };
    db.add(calendar).then((docRef) => {
    calendar = { ...calendar, id: docRef.id }
    dispatch(createCal(calendar));
  })
  }
}

// db list function
export const loadCalFb = () => {
  return function (dispatch) {
    db.get().then((docRef) => {
      let schedule_data = [];
      docRef.forEach((doc) => {
        schedule_data=[...schedule_data,{id:doc.id,...doc.data()}]
      })
      dispatch(loadCal(schedule_data))
  });
  }
}

// db update function
export const updateCalFb = () => {
  return function (dispatch){
    db.doc(schedule_id).update({completed: true}).then(() => {
      dispatch(updateCal(calendar_list))
    })
  }
}

// db delete function
export const deleteCalFb = (schedule_id) => {
  return function (dispatch){
    db.doc(schedule_id).delete().then(() => {
      dispatch(deleteCal(schedule_id))
    })
  }
}

  // 비동기작업으로 파이어베이스에 연동확인 작업 및 안에 데이터가 들어갔는지 확인
  // 단일 데이터확인
  // calendar.doc("bucket_item1").get().then((doc) => {
  //   if (doc.exists) {
  //     console.log(doc.id);
  //     console.log(doc.data());
  //   }
  //   console.log(doc.exists);
    
  // });

  // 전체데이터확인
  // calendar.get().then((docs) => {
  //   let calendar_data = [];
  //   docs.forEach((doc) => {
  //     // // doc 객체확인
  //     // console.log(doc);
  //     // // doc 데이터가져오기
  //     // console.log(doc.data());
  //     // // doc id가져오기
  //     // console.log(doc.id);

  //     if (doc.exists) {
  //       calendar_data = [...calendar_data, { id: doc.id, ...doc.data() }];
  //     }
  //   });
  //   console.log(calendar_data);
  // });

  // db insert
  // calendar.add({ refText: "자고싶ㄷ어어어어", refStart: "2021-03-17T02:26", refEnd: "2021-03-25T02:26", compalte: false }).then((docRef) => {
  //   console.log(docRef);
  //   console.log(docRef.id);
  // })

  // db update
  // calendar.doc("bucket_item1").update({ refText: "잔다잔다 뿅잔다" });

  // db delete
  // calendar.doc("bucket_item1").delete().then(docRef => {
  //   console.log("꺄르르륵!!!");
  // });


// Actions
// 캘린더의 데이터값을 가져온다
const LOAD = "calendar/LOAD";
// 캘린더의 일정 값 추가
const CREATE = "calendar/CREATE";
// 수정
const UPDATE = "calendar/UPDATE"
// 삭제
const DELETE = "calendar/DELETE"
const initialState = {
  // 리스트
  calendar:[]
};

// Action Creators
export const loadCal = (calendar_list) => {
  return { type: LOAD, calendar_list };
}
export const createCal = (calendar_list) => {
  return { type: CREATE ,calendar_list};
}
export const updateCal = (calendar_list) => {
  return { type: UPDATE ,calendar_list};
}
export const deleteCal = () => {
  return { type: DELETE };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    // do reducer stuff
    case "calendar/LOAD": {
      return { ...state, calendar: action.calendar_list };
    }
    case "calendar/CREATE": {
      return { ...state, calendar: [...state.calendar, action.calendar_list] };
    }
    // 컴플리트 true 값으로 바꾸기
    case "calendar/UPDATE": {
      const schedule_list = state.schedule.map((l, idx) => {
        console.log(state.schedule)
        if(l.id === action.schedule_id){
          console.log(l)
          return {...l, completed: true};
        }
        return l
      })
      return {schedule: schedule_list}
    }
    case "calendar/DELETE": {
      let calendar_list = []
      state.schedule.map((r, idx) => {
        if(r.id !== action.calendar_list){
          calendar_list = [...calendar_list, r ]
        } 
      })
      console.log(action.calendar_list)
      return { schedule: schedule_data }
      
    }
    default:
      return state;
  }
}

