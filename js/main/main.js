var validation = new Validation();
var empManagement = new EmployeeManagement();
const ADD_NEW_STATUS = 0;
const UPDATE_STATUS = 1;

getLocalStorageData();

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo get data from local storage
 * @returns
 */
function getLocalStorageData() {
    if (localStorage.getItem("employees") != undefined) {
        var listObj = JSON.parse(localStorage.getItem("employees"));
        if (listObj.length > 0) {
            empManagement.empList = convertToEmp(listObj);
            displayEmpList(empManagement.empList);
        }
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo convert JSON Obj to Employee
 * @param {List<Object>} listEmp
 * @returns list emp
 */
function convertToEmp(listEmp) {
    return listEmp.map(function (emp) {
        return Object.assign(new Employee(), emp);
    });
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo save list employee to local storage
 */
function setLocalStorage(empList) {
    localStorage.setItem("employees", JSON.stringify(empList));
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Add new employee
 */
function addEmp() {
    var username = querySeletorById("tknv").value;
    var fullName = querySeletorById("name").value;
    var email = querySeletorById("email").value;
    var password = querySeletorById("password").value;
    var dateBeginWork = querySeletorById("datepicker").value;
    var basicSalary = querySeletorById("luongCB").value;
    var role = querySeletorById("chucvu").value;
    var timeWork = querySeletorById("gioLam").value;
    //VALIDATION
    if (
        isValidInput(
            username,
            fullName,
            email,
            password,
            dateBeginWork,
            basicSalary,
            timeWork,
            ADD_NEW_STATUS
        )
    ) {
        //Add new emp
        var employee = new Employee(
            username,
            fullName,
            email,
            password,
            dateBeginWork,
            basicSalary,
            role,
            timeWork
        );
        empManagement.addNewEmp(employee);
        updateData(empManagement.empList);
    }
}

/**
 * Author: Sneaky
 * Date Created: 11/07/2022
 * todo Validate input
 * @returns true || false
 */
function isValidInput(
    username,
    fullName,
    email,
    password,
    dateBeginWork,
    basicSalary,
    timeWork,
    status
) {
    var isValidInput = true;
    //Username
    if (status == UPDATE_STATUS) {
        validation.checkEmpty(username, "tbTKNV", MESSAGE_EMPTY_USERNAME) &&
            validation.isValidUsername(
                username,
                "tbTKNV",
                MESSAGE_LENGTH_USERNAME
            );
    } else {
        isValidInput &=
            validation.checkEmpty(username, "tbTKNV", MESSAGE_EMPTY_USERNAME) &&
            validation.isValidUsername(
                username,
                "tbTKNV",
                MESSAGE_LENGTH_USERNAME
            ) &&
            validation.checkExistUsername(
                username,
                empManagement.empList,
                "tbTKNV",
                MESSAGE_EXIST_USERNAME
            );
    }

    //fullName
    isValidInput &=
        validation.checkEmpty(fullName, "tbTen", MESSAGE_EMPTY_FULLNAME) &&
        validation.isValidFullName(fullName, "tbTen", MESSAGE_INVALID_FULLNAME);

    //email
    isValidInput &=
        validation.checkEmpty(email, "tbEmail", MESSAGE_EMPTY_EMAIL) &&
        validation.isValidEmail(email, "tbEmail", MESSAGE_INVALID_EMAIL);

    //password
    isValidInput &=
        validation.checkEmpty(password, "tbMatKhau", MESSAGE_EMPTY_PASSWORD) &&
        validation.isValidPassword(
            password,
            "tbMatKhau",
            MESSAGE_INVALID_PASSWORD
        );

    //dateBeginWork
    isValidInput &=
        validation.checkEmpty(dateBeginWork, "tbNgay", MESSAGE_EMPTY_DATE) &&
        validation.checkValidDate(
            dateBeginWork,
            "tbNgay",
            MESSAGE_INVALID_FORMAT_DATE
        );

    //basicSalary
    isValidInput &=
        validation.checkEmpty(basicSalary, "tbLuongCB", MESSAGE_EMPTY_SALARY) &&
        validation.isValidNumber(
            basicSalary,
            "tbLuongCB",
            MESSAGE_INVALID_SALARY
        ) &&
        validation.checkLimitOfVal(
            basicSalary,
            SALARY_MIN,
            SALARY_MAX,
            "tbLuongCB",
            MESSAGE_LIMIT_SALARY
        );

    //role
    isValidInput &= validation.isValidRole(
        "chucvu",
        "tbChucVu",
        MESSAGE_INVALID_ROLE
    );

    //timeWork
    isValidInput &=
        validation.checkEmpty(timeWork, "tbGiolam", MESSAGE_EMPTY_TIMEWORK) &&
        validation.isValidNumber(
            timeWork,
            "tbGiolam",
            MESSAGE_INVALID_TIMEWORK
        ) &&
        validation.checkLimitOfVal(
            timeWork,
            TIMEWORK_MIN,
            TIMEWORK_MAX,
            "tbGiolam",
            MESSAGE_LIMIT_TIMEWORK
        );
    return isValidInput;
}

function updateData(empList) {
    setLocalStorage(empList);
    displayEmpList(empList);
}

function displayEmpList(empList) {
    var content = "";
    empList.map(function (emp) {
        content += `
                <tr>
                    <td>${emp.username}</td>
                    <td>${emp.fullName}</td>
                    <td>${emp.email}</td>
                    <td>${emp.dateBeginWork}</td>
                    <td>${emp.getRole(emp.role)}</td>
                    <td>${emp.totalSalary(emp.role, emp.basicSalary)}</td>
                    <td>${emp.getRank(emp.timeWork)}</td>
                    <td>
                        <button data-target="#myModal" data-toggle="modal" onclick="editEmp(${
                            emp.username
                        })" class="btn btn-success">Sửa</button>
                        <button onclick="deleteEmp(${
                            emp.username
                        })" class="btn btn-danger">Xóa</button>
                    </td>
                </tr>
            `;
    });
    querySeletorById("tableDanhSach").innerHTML = content;
}

var editUsername = "";
var isEdit = false;
function editEmp(username) {
    hideAllMessage();
    editUsername = username;
    isEdit = true;
    var index = getIndexByUsername(username);
    var emp = empManagement.empList[index];
    querySeletorById("tknv").value = emp.username;
    querySeletorById("name").value = emp.fullName;
    querySeletorById("email").value = emp.email;
    querySeletorById("password").value = emp.password;
    querySeletorById("datepicker").value = emp.dateBeginWork;
    querySeletorById("luongCB").value = emp.basicSalary;
    querySeletorById("chucvu").value = emp.role;
    querySeletorById("gioLam").value = emp.timeWork;
    toggleEditMode(true);
}

function getIndexByUsername(username) {
    return empManagement.empList.findIndex(function (emp) {
        return emp.username == username;
    });
}

function toggleEditMode(status) {
    querySeletorById("tknv").disabled = status;
}

function updateEmp() {
    var username = querySeletorById("tknv").value;
    if (username == editUsername) {
        var fullName = querySeletorById("name").value;
        var email = querySeletorById("email").value;
        var password = querySeletorById("password").value;
        var dateBeginWork = querySeletorById("datepicker").value;
        var basicSalary = querySeletorById("luongCB").value;
        var role = querySeletorById("chucvu").value;
        var timeWork = querySeletorById("gioLam").value;
        //VALIDATION
        if (
            isValidInput(
                username,
                fullName,
                email,
                password,
                dateBeginWork,
                basicSalary,
                timeWork,
                UPDATE_STATUS
            )
        ) {
            //Add new emp
            var employee = new Employee(
                username,
                fullName,
                email,
                password,
                dateBeginWork,
                basicSalary,
                role,
                timeWork
            );
            empManagement.updateEmp(getIndexByUsername(username), employee);
            updateData(empManagement.empList);
            isEdit = false;
        }
    } else {
    }
}

function resetForm() {
    toggleEditMode(false);
    querySeletorById("tknv").value = "";
    querySeletorById("name").value = "";
    querySeletorById("email").value = "";
    querySeletorById("password").value = "";
    querySeletorById("luongCB").value = "";
    querySeletorById("chucvu").selectedIndex = 0;
    querySeletorById("gioLam").value = "";
    hideAllMessage();
}

function hideAllMessage() {
    var messageSpans = document.getElementsByClassName("sp-thongbao");
    for (var i = 0; i < messageSpans.length; i++) {
        messageSpans[i].style.display = "none";
    }
}

function deleteEmp(username) {
    empManagement.deleteEmp(getIndexByUsername(username));
    updateData(empManagement.empList);
}

function searchByName() {
    var keyword = querySeletorById("searchName").value;
    var findArr = empManagement.findEmp(keyword.trim());
    displayEmpList(findArr);
}

querySeletorById("tknv").addEventListener("click", function (e) {
    e.target.setAttribute("oldVal", e.target.value);
});

querySeletorById("tknv").addEventListener("change", function (e) {
    if (isEdit) {
        querySeletorById("tknv").value = e.target.getAttribute("oldVal");
    }
});

querySeletorById("btnThem").onclick = resetForm;
querySeletorById("btnThemNV").onclick = addEmp;
querySeletorById("btnCapNhat").onclick = updateEmp;
querySeletorById("searchName").onkeyup = searchByName;
