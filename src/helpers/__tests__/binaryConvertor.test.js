import { fetchPermissions, toBinary } from '../binaryConvertor'


describe('binary convertor', () => {
    test('should return object from binary', () => {
        const permissionConstant = 13
        const response = fetchPermissions(permissionConstant)
        expect(response).toEqual({
            create: true,
            read: true,
            update: false,
            delete: true
        })
    })

    test('should return binary value for a given number', () => {
        expect(toBinary(13)).toEqual("1101")
        expect(toBinary(9)).toEqual("1001")
        expect(toBinary(3)).toEqual("0011")
    })
})