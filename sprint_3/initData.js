const signUpBottonTexts = ["Sign up", "Зарегистрироваться", "Регистрация", "Создать аккаунт",
    "Создать пользователя", "Создать профиль", "Зарегистрировать", "Create account",
    "Create an account", "Create profile", "Create a profile", "Create user",
    "Create a user", "Register", "Registration", "Submit"];

const xPathSignUpSearch = signUpBottonTexts
    .reduce((finalString, current) => `${finalString}.//*[text() = '${current}'] |`, "")
    .slice(0, -2);

function generateField(preStr = "", postStr = "", strLen = 10, starter = "a", selection = 26) {
    const randomNumber = () => Math.floor(Math.random() * selection);
    const generateChar = () => String.fromCharCode(starter.charCodeAt() + randomNumber());
    let output = preStr;
    for (let i = preStr.length + postStr.length; i < strLen; i++) {
        output += generateChar();
    }
    output += postStr;
    return output;
}

const errorCases = [["Жд", "фли"], // 0
    ["Zuc "], // 1
    ["123", "123"], // 2
    ["Foo_"], // 3
    ["", "&abc"], // 4
    ["", "@."], // 5
    ["", "", 0], // 6
    [" ", "", 1], // 7
    ["ab,cd", "@email.com", 20], // 8
    ["", "", 51], // 9
    ["12", "", 5], // 10
    [], // 11
    ["", "", 6, "0", 10], // 12
];

function initField(nums, ref = []) {
    const check = [];
    nums.forEach((element) => check.push(errorCases[element]));
    return {
        check, ref,
    };
}

const data = {
    first_name: initField([0, 1, 2], ["A"]),
    second_name: initField([3, 6, 7], ["B"]),
    login: initField([0, 1, 12]),
    email: initField([5, 7, 8], ["", "@email.com", 20]),
    password: initField([6, 10, 11], ["ABC", "12", 15]),
    phone: initField([2, 12], ["+79", "", 12, "0", 10]),
};

const fieldChecks = (function () {
    const checks = [];
    for (const i in data) {
        for (const j in data[i].check) {
            const singleCheck = {};
            for (const k in data) {
                if (i !== k) {
                    singleCheck[k] = generateField(...data[k].ref);
                } else {
                    singleCheck[k] = generateField(...data[k].check[j]);
                }
            }
            checks.push(singleCheck);
        }
    }
    return checks;
}());

const fieldRef = (function () {
    const ref = {};
    for (const i in data) {
        ref[i] = generateField(...data[i].ref);
    }
    return ref;
}());

module.exports = { xPathSignUpSearch, fieldChecks, fieldRef };
