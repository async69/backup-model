export const getProperStringFormat = (value) => {
    return value? value[0]? value.replace(value[0], value[0].toUpperCase()) : "" : ""
}