function calculator(string) {
    let value = string;
    const arab = /^\d{1,}|\d{1,}$/;
    const rom = /I{1,}|V{1,}|X{1,}|L{1,}|C{1,}|D{1,}|M{1,}/;

    // обработчик ошибок

    // проверка на то что переменные от 1 до 10
    function errorHendler(string) {
        let letters = [];
        let row = string;

        const b = row.split(' ');
        b.forEach((el, i) => letters.push(el));
        console.log(letters);

        let reduces = letters.reduce((s, v) => s + rom.test(v), 0);
        if (letters.length > 3) {
            throw new Error("формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)");
        } else if (letters.length <= 2) {
            throw new Error('строка не является математической операцией');
        } else if (reduces === 1) {
            throw new Error('используются одновременно разные системы счисления');
        } else if (letters[1] !== '+' && letters[1] !== '-' && letters[1] !== '/' && letters[1] !== '*') {
            throw new Error("формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)");
        } else if (/\d{1,}|^-/.test(letters[0]) && /\d{1,}|^-/.test(letters[2])) {
            let a = Number(letters[0].match(/\d{1,}|^-./));
            let b = Number(letters[2].match(/\d{1,}|^-./));
            console.log('proverka ' + a + " " + b);
            console.log("           " + letters[0] + " " + letters[2])
            if ((a < 1 || a > 10) || (b < 1 || b > 10)) {
                throw new Error("операнды должны быть в диапазоне от 1 до 10");
            } else {
                console.log("числa в деапазоне от 1 до 10")
            }
        } else if (/\D|\s/.test(letters[0]) && /\D|\s/.test(letters[2])) {
            let arrSimvol = string.split(/[+*\/-]/g)
            let c = value.match(/\+|\-|\*|\//);
            let arrNum = []
            let rome = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, III: 3, II: 2, I: 1 };

            for (let i = 0; i < arrSimvol.length; i++) {
                let res = 0
                arrSimvol[i].replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
                    res += rome[i]
                })

                arrNum.push(res);
            }
            if (arrNum[0] < 1 || arrNum[0] > 10 || arrNum[1] < 1 || arrNum[1] > 10) {
                throw new Error("операнды должны быть в диапазоне от I до X");
            } else {
                console.log("числa в деапазоне от I до X")
            }
        }
    }
    errorHendler(value);

    // логика вычеслений

    if (arab.test(value)) {
        let a = Number(value.match(/^\d{1,}/m));
        let b = Number(value.match(/\d{1,}$/m));
        let c = value.match(/\+|\-|\*|\//);
        let result;

        if (c == '+') {
            result = a + b;

        } else if (c == '-') {
            result = a - b;
        } else if (c == '*') {
            result = a * b;
        } else if (c == '/') {
            result = a / b;
        }
        result = parseInt(result);
        result = String(result);
        console.log(result);
        return result;
    } else if (rom.test(value)) { //  ROME
        let arrSimvol = string.split(/[+*\/-]/g)
        let c = value.match(/\+|\-|\*|\//);
        let arrNum = []
        let rome = { M: 1000, CM: 900, D: 500, CD: 400, C: 100, XC: 90, L: 50, XL: 40, X: 10, IX: 9, V: 5, IV: 4, III: 3, II: 2, I: 1 };

        for (let i = 0; i < arrSimvol.length; i++) {
            let res = 0
            arrSimvol[i].replace(/[MDLV]|C[MD]?|X[CL]?|I[XV]?/g, function (i) {
                res += rome[i]
            })

            arrNum.push(res);
        }
        console.log("первое число: " + arrNum[0] + " " + "второе число: " + arrNum[1]);

        if (c == '+') {
            result = arrNum[0] + arrNum[1];

        } else if (c == '-') {
            result = arrNum[0] - arrNum[1];
        } else if (c == '*') {
            result = arrNum[0] * arrNum[1];
        } else if (c == '/') {
            result = arrNum[0] / arrNum[1];
        }

        console.log("результат: " + result)

        let romeNum = '';
        for (let key in rome) {
            while (rome[key] <= result) {
                romeNum += key;
                result = result - rome[key];
            }
        }
        console.log("результат в римской записи: " + romeNum)
        return romeNum;
    }
}

calculator('5 + 2');
calculator('10 - 4');
calculator('10 + 10');
calculator('2 * 2');
calculator('4 / 2');
calculator('5 / 4');
calculator("I - I");
calculator("I - II");
calculator("I + I");

calculator("11 + 1")
/*
calculator("XI + I");  //отвечает корректно
calculator("11 + 1");  //отвечает корректно
*/
