/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let wagesEarnedOnDate = function (stamp) {
    const pay = this.payPerHour;
    const hours = hoursWorkedOnDate.call(this, stamp);
    return parseInt(pay * hours);
}

let calculatePayroll = function (array) {
    let total = 0;
    array.forEach(employee => {
        employee.timeOutEvents.forEach(event => { 
            total += wagesEarnedOnDate.call(employee, event.date)
        })
    })
    return total;
}

let createEmployeeRecord = function (array) {
    return  {firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function (array) {
    return array.map(element => {
        return createEmployeeRecord(element);
    })
}

let createTimeInEvent = function (stamp) {
    this.timeInEvents.push({type: "TimeIn", hour: parseInt(stamp.substr(-4)), date: stamp.substr(0, 10)})
    return this;  
}

let createTimeOutEvent = function (stamp) {
    this.timeOutEvents.push({type: "TimeOut", hour: parseInt(stamp.substr(-4)), date: stamp.substr(0, 10)})
    return this;  
}

let hoursWorkedOnDate = function (stamp) {
    const timeOutDate = this.timeOutEvents.find(element => {
        return element.date === stamp;
    });
    const timeOut = timeOutDate.hour;
    const timeInDate = this.timeInEvents.find(element => {
        return element.date === stamp;
    })
    const timeIn = timeInDate.hour;
    return (timeOut - timeIn) / 100;
}

let findEmployeeByFirstName = function (array, name) {
    return array.find(person => {
        return person.firstName === name;
    })
}
