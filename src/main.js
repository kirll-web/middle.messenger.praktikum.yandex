export const trim = (value, symbols = '\xA0 ') => {
    const patterns = symbols.split('');

    if (patterns.length === 2 && patterns[0] === '\xA0' && patterns[1] === ' ') {
        return value.trim();
    }

    let result = value;

    patterns.forEach((pattern) => {
        result = result.replace(new RegExp(pattern, 'g'), '');
    });
    return result.trim();
};



export default trim;
