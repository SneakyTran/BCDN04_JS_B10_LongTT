function EmployeeManagement() {
    this.empList = [];
    this.addNewEmp = function (emp) {
        this.empList.push(emp);
    };
    this.updateEmp = function (index, emp) {
        this.empList[index] = emp;
    };
    this.deleteEmp = function (index) {
        this.empList.splice(index, 1);
    };
    
    EmployeeManagement.prototype.findEmp = function (keyword) {
        var findArr = [];
        this.empList.map(function (emp) {
            var indexFound = emp.fullName
                .toLowerCase()
                .indexOf(keyword.toLowerCase());
            if (indexFound < 0) {
                //not found
            } else {
                findArr.push(emp);
            }
        });
        return findArr;
    };
}
