import React, {useState, useRef} from "react";
import * as calendar from "./calendar.js"
import classnames from "classnames";
import "./style.css"

export default function Calendar(){
  
  const years = [2020, 2021, 2022, 2023, 2024, 2025];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const onChange = Function.prototype;
  
  
  const [dateInfo, setDateInfo] = useState({
    date: new Date(),
    currentDate: new Date(),
    selectedDate: null
  })

  function handlePrevMonthButtonClick(){
    const date = new Date(dateInfo.date.getFullYear(), dateInfo.date.getMonth() - 1);
    setDateInfo(prevState => ({...prevState, date}));
  } 

  function handleNextMonthButtonClick(){
    const date = new Date(dateInfo.date.getFullYear(), dateInfo.date.getMonth() + 1);
    setDateInfo(prevState => ({...prevState, date}));
  }
  

  const selectedYear = useRef();
  const selectedMonth = useRef();

  function handleSelectChange(){
    const year = selectedYear.current.value;
    const month = selectedMonth.current.value;

    const date = new Date(year, month);
    setDateInfo(prevState => ({...prevState, date}));
  }
   

  function handleDayClick(date){
    setDateInfo(prevState => ({...prevState, selectedDate: date}));
    onChange(date);
  }

  function getToday(){
    setDateInfo((prevState => ({...prevState, date: new Date()})));
  }

  const monthData = calendar.getMonthData(dateInfo.date.getFullYear(), dateInfo.date.getMonth())
  
  return (
    <div className="calendar">
      <header>
         <button onClick={handlePrevMonthButtonClick}>{"<"}</button>

         <select value={dateInfo.date.getMonth()} onChange={handleSelectChange} ref={selectedMonth}>
            {monthNames.map((month, index) => <option key={month} value={index}>{month}</option>)}
          </select>

         <select value={dateInfo.date.getFullYear()} onChange={handleSelectChange} ref={selectedYear}> 
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>

         <button onClick={handleNextMonthButtonClick}>{">"}</button>
      </header>

      <table>
        <thead>
          <tr>
            {weekDayNames.map((day) => <th key={day}>{day}</th>)}
          </tr>
        </thead>

        <tbody>
          {monthData.map((week, index) => (
            <tr key={index} className="week">
              {week.map((date, index) => date ? (<td key={index} 
                          className={classnames("day", {
                              "today": calendar.areEqual(date, dateInfo.currentDate),
                              "selected": calendar.areEqual(date, dateInfo.selectedDate)
                          })} 
                          onClick={() => handleDayClick(date)}
                      >
                        {date.getDate()}
                      </td> )
                    : (<td key={index}/>))}
            </tr>))}
        </tbody>
      </table>
      
      <div className="today-btn">
        <button onClick={getToday}>Back to today</button>
      </div>
      
    </div>
  )
}

// Calendar.defaultProp = {
    // years: [2021, 2022, 2023],
    // months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    // days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
//     onChange: Function.prototype
// }