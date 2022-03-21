let date = new Date();
let month = date.getMonth()
let displayMonth = date.getMonth() + 1
let day = date.getDate()
let displayDay = date.getDate()
let week = date.getDay()
let year = date.getFullYear()

function string(data){
  return data.toString().split('')
}

let newMonth = string(displayMonth)
let newDay = string(displayDay)

function checkLength(data){
  data.length === 1 && data.unshift(0)
}

checkLength(newMonth)
checkLength(newDay)

displayMonth = newMonth.join('')
displayDay = newDay.join('')

export default {
  displayMonth, day, date, displayDay, month, week, year
}