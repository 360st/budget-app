let date = new Date();
let month = date.getMonth() + 1
let day = date.getDay()
let dayDecimal = date.getDay()

function string(data){
  return data.toString().split('')
}

let newMonth = string(month)
let newDay = string(dayDecimal)

function checkLength(data){
  data.length === 1 && data.unshift(0)
}

checkLength(newMonth)
checkLength(newDay)

month = newMonth.join('')
dayDecimal = newDay.join('')

export default {
    month, day, date, dayDecimal
}