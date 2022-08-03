const BOSS_SALARY_RATE = 3;
const MANAGER_SALARY_RATE = 2;
const RANK_EMP_192 = "Xuất sắc";
const RANK_EMP_176 = "Giỏi";
const RANK_EMP_160 = "Khá";
const RANK_EMP_UNDER_160 = "Trung bình";
const ROLE_B = "Sếp";
const ROLE_M = "Trưởng phòng";
const ROLE_E = "Nhân viên";

function Employee(
    username,
    fullName,
    email,
    password,
    dateBeginWork,
    basicSalary,
    role,
    timeWork
) {
    {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.dateBeginWork = dateBeginWork;
        this.basicSalary = basicSalary;
        this.role = role;
        this.timeWork = timeWork;
    }

    /**
     * Author: Sneaky
     * Date Created: 11/07/2022
     * todo convert role due to value of select input
     * @returns role
     */
    this.getRole = function (role) {
        switch (role) {
            case "B":
                return ROLE_B;

            case "M":
                return ROLE_M;

            case "E":
                return ROLE_E;

            default:
                return;
        }
    };

    /**
     * Author: Sneaky
     * Date Created: 11/07/2022
     * todo calculate total salary base on their role
     * @returns total salary
     */
    this.totalSalary = function (role, basicSalary) {
        switch (role) {
            case "B":
                return basicSalary * BOSS_SALARY_RATE;

            case "M":
                return basicSalary * MANAGER_SALARY_RATE;

            case "E":
                return basicSalary;

            default:
                return 0;
        }
    };

    /**
     * Author: Sneaky
     * Date Created: 11/07/2022
     * todo define the rank of employee due to time working
     * @returns empRank
     */
    this.getRank = function (timeWork) {
        if (timeWork >= 192) {
            return RANK_EMP_192;
        } else if (timeWork >= 176) {
            return RANK_EMP_176;
        } else if (timeWork >= 160) {
            return RANK_EMP_160;
        } else {
            return RANK_EMP_UNDER_160;
        }
    };
}
