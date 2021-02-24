export const MAX_VALUE = 15

export const toBinary = number => {
    const stringNum = Array(4)
    var temp = Number(number)
    if (MAX_VALUE < temp && temp < 1) {
        return null
    }

    if (Number(number) >= 8) {
        temp = Number(number) - 8
        stringNum[0] = 1
    } else stringNum[0] = 0

    if (temp >= 4) {
        temp = temp - 4
        stringNum[1] = 1
    } else stringNum[1] = 0

    if (temp >= 2) {
        temp = temp - 2
        stringNum[2] = 1
    } else stringNum[2] = 0

    stringNum[3] = temp

    var returnString = ""
    stringNum.forEach(num => returnString += String(num))
    return returnString
}

export const fetchPermissions = permissionConstant => {
    const binaryValue = toBinary(permissionConstant)
    var permissionObject = {
        create: null, read: null, update: null, delete: null
    }
    permissionObject.create = Boolean(Number(binaryValue[0]))
    permissionObject.read = Boolean(Number(binaryValue[1]))
    permissionObject.update = Boolean(Number(binaryValue[2]))
    permissionObject.delete = Boolean(Number(binaryValue[3]))
    return permissionObject
}