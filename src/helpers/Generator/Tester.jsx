import React from "react"
import { generateArray, types } from "./index"

export default () => {
    const props = {
        name: {
            type: types.string, tag: "name", metaTag: "firstName"
        },
        phone: {
            type: types.number, digit: 2
        },
        vendor_detail: {
            type: types.object_detail
        },
        addresses: {
            type: types.array,
            length: 4,
            props: {
                id: { type: types.string, tag: "name", metaTag: "firstName" },
                amount: { type: types.number, digit: 2 }
            }
        }
      }
    const response = generateArray(5, props)
    console.log("response", response)
    return (
        <h1>Working</h1>
    )
}