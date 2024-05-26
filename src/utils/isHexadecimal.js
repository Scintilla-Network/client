export default function isHexadecimal(s) {
    return /^[0-9a-fA-F]+$/.test(s)
}
