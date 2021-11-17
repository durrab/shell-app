describe('phone number regex', () => {
    it('kind of works, as far as there are only +, -, (, ), ., number and space', () => {
        const regexString = '^[+\\-0-9(). ]+$';
        const phoneNumberRegex = new RegExp(regexString);
        const goodStuff = [
            '12312312345',
            '+12312312345',
            '12-31-2312-3-45',
            '++123.123.12.345',
            '60766767807780',
        ];
        const badStuff = [
            'a12312312345', // letter at beginning.
            '+12312312345a', // letter at end.
            '12-31-a2312-3-45', // letter in the middle.
            '++123=123.12.345', // = (special char) in the middle.
        ]

        goodStuff.forEach(item => {
            expect(phoneNumberRegex.test(item)).toBe(true);
        })

        badStuff.forEach(item => {
            expect(phoneNumberRegex.test(item)).toBe(false);
        })

    });
})