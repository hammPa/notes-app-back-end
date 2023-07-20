const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

const generateId = () => {
    let result = '';
    const charLength = characters.length;
    for(let i = 0; i < 15; i++){
        result += characters.charAt(`${Math.floor(Math.random() * charLength)}`);
    }
    return result;
}

module.exports = generateId;