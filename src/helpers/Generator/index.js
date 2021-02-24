import faker from "faker" 
import uuid from "../uuid"
import { getDateFormat } from "../date"
import { randomNumber } from "../random"
import statusTypes from "../../config/statusTypes"

export const types = {
    "string": "string",
    "number": "number",
    "object": "object",
    "object_detail": "object_detail",
    "array": "array",
    "boolean": "boolean",
    "date": "date",
    "timestamp": "timestamp",
    "status": "status",
    "enum": "enum"
}

export const tags = {
    "id": "id",
    "name": "name"
}

export const metaTags = {
    "firstName": "firstName",
    "lastName": "lastName",
    "fullName": "fullName",
    "email": "email",
    "phoneNumber": "phoneNumber",
    "country": "country",
    "region": "region",
    "city": "city",
}

export const stringGenerator = (tag = "default", metaTag) => {
    if (tag === "default") {
        return faker.vehicle.model()
    } else if (tag === "id") {
        return uuid()
    } else if (tag === "name") {
        if (metaTag === "firstName") {
            return faker.name.firstName()
        } else if (metaTag === "lastName") {
            return faker.name.lastName()
        } else if (metaTag === "fullName") {
            return faker.name.firstName() + " " + faker.name.lastName()
        } else if (metaTag === "email") {
            return faker.internet.email()
        } else if (metaTag === "phoneNumber") {
            return faker.phone.phoneNumber()
        } else if (metaTag === metaTags.country) {
            return faker.address.country()
        } else if (metaTag === metaTags.city) {
            return faker.address.city()
        } else if (metaTag === metaTags.region) {
            return faker.address.state()
        } else {
            return faker.name.title()
        }
    }
}

export const generateArray = (amount = 4, props = {}) => {    
    const response = Array(amount).fill("").map(() => {
        let data = {}
        const keys = Object.keys(props)
        Object.values(props).forEach((item, idx) => {
            const tag = keys[idx]
            switch(item.type) {
                case types.enum: {
                    if (typeof item.payload === "object") {
                        data[tag] = item.payload[randomNumber(0, item.payload.length - 1)]
                    }
                    break
                }

                case types.string: {
                    if (item.tag) {
                        data[tag] = stringGenerator(item.tag, item.metaTag)
                    } else {
                        data[tag] = stringGenerator()
                    }
                    break
                }

                case types.number: {
                    if (item.digit) {
                        data[tag] = Math.floor(Math.random() * Math.pow(10, item.digit))
                    } else if (typeof (item.max && item.min) === "number") {
                        data[tag] = randomNumber(item.min, item.max)
                    } else {
                        data[tag] = Math.floor(Math.random() * Math.pow(10, randomNumber(1, 5)))
                    }
                    break
                }

                case types.object_detail: {
                    data[tag] = {
                        id: stringGenerator("id"),
                        name: stringGenerator("name", "fullName"),
                        number: stringGenerator("id")
                    }
                    break
                }

                case types.array: {
                    const { props, length } = item
                    data[tag] = generateArray(length, props)
                    break
                }

                case types.boolean: {
                    data[tag] = Math.floor((Math.random() * 100) % 2) === 0
                    break
                }

                case types.date: {
                    data[tag] = getDateFormat()
                    break
                }

                case types.timestamp: {
                    data[tag] = String(new Date())
                    break
                }

                case types.status: {
                    const values = [statusTypes.OPEN, statusTypes.SENT_FOR_APPROVAL, statusTypes.APPROVED]
                    data[tag] = values[randomNumber(0, values.length - 1)]
                    break
                }

                default: return { ...item }
            }
        })
        return data
    })

    return response
}
