const SALARY_MIN = 1e6;
const SALARY_MAX = 20e6;
const TIMEWORK_MIN = 80;
const TIMEWORK_MAX = 200;

function Validation() {
    this.checkEmpty = function (inputVal, spanId, message) {
        if (inputVal === "") {
            //invalid
            displayMessageSpan(spanId, message);
            return false;
        }
        hideMessageSpan(spanId);
        return true;
    };

    this.isValidUsername = function (inputVal, spanId, message) {
        var pattern = /^[0-9]{4,6}$/;
        if (inputVal.match(pattern)) {
            //valid
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.checkExistUsername = function (inputVal, empList, spanId, message) {
        if (empList.length == 0) {
            return true;
        }
        if (
            empList.some(function (emp) {
                return emp.username === inputVal;
            })
        ) {
            //isExist
            displayMessageSpan(spanId, message);
            return false;
        }
        hideMessageSpan(spanId);
        return true;
    };

    this.isValidFullName = function (inputVal, spanId, message) {
        var pattern =
            /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/;
        if (inputVal.match(pattern)) {
            //valid fullname
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.isValidEmail = function (inputVal, spanId, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputVal.match(pattern)) {
            //valid email
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.isValidPassword = function (inputVal, spanId, message) {
        var pattern =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/;
        if (inputVal.match(pattern)) {
            //valid password
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.checkValidDate = function (inputVal, spanId, message) {
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (inputVal.match(pattern)) {
            //valid
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.isValidNumber = function (inputVal, spanId, message) {
        var pattern = /^[0-9]+$/;
        if (inputVal.match(pattern)) {
            //valid
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.checkLimitOfVal = function (inputVal, min, max, spanId, message) {
        var inputNum = Number(inputVal);
        if (checkLimitValue(inputNum, min, max)) {
            //valid
            hideMessageSpan(spanId);
            return true;
        }
        displayMessageSpan(spanId, message);
        return false;
    };

    this.isValidRole = function (selectId, spanId, message) {
        if (querySeletorById(selectId).selectedIndex == 0) {
            displayMessageSpan(spanId, message);
            return false;
        }
        hideMessageSpan(spanId);
        return true;
    };
}
