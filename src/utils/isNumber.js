export default function isNumber(str) {
    return /^-?\d*\.?\d+$/.test(str);
}
