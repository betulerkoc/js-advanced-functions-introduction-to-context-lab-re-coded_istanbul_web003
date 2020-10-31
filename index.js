// Your code here


const createEmployeeRecord = (employeeData) => {

    const obj = {
        firstName: employeeData[0], 
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return obj;
}

const createEmployeeRecords = (employeeData) => {
    return employeeData.map(singleData => createEmployeeRecord(singleData))
}

const createTimeInEvent = (employeeData, date) => {
    const splittedDate = date.split(" ");
    const data = {
        type: "TimeIn",
        date: splittedDate[0],
        hour: parseInt(splittedDate[1])
    }
    employeeData.timeInEvents.push(data);
    return employeeData;
} 

const createTimeOutEvent = (employeeData, date) => {
    const splittedDate = date.split(" ");
    const data = {
        type: "TimeOut",
        date: splittedDate[0],
        hour: parseInt(splittedDate[1])
    }
    employeeData.timeOutEvents.push(data);
    return employeeData;
} 

const hoursWorkedOnDate = (employeeData, givenDate) => {
    const timeIn = employeeData.timeInEvents.find(i => i.date === givenDate)
    const timeOut = employeeData.timeOutEvents.find(o => o.date === givenDate)
    console.log(timeOut.hour - timeIn.hour)
    const result = (timeOut.hour - timeIn.hour) / 100;
    return result;
} 

const wagesEarnedOnDate = (employeeData, givenDate) => {
    const totalHour = hoursWorkedOnDate(employeeData,givenDate);
    console.log(employeeData.payPerHour*totalHour)
    return employeeData.payPerHour*totalHour
} 

const allWagesFor = (employeeData) => {
    let eligibleDates = employeeData.timeInEvents.map(e => e.date);
    console.log(employeeData)
    let payable = eligibleDates.reduce((acc, curr) => {
        return acc + wagesEarnedOnDate(employeeData, curr)
    }, 0)

    return payable;
} 

const calculatePayroll = (employeeArray) => {
    return employeeArray.reduce((acc, curr) => acc + allWagesFor(curr), 0);
} 

const findEmployeeByFirstName = (employeeArray, firstName) => {
    return employeeArray.find(employee => employee.firstName === firstName);
} 
