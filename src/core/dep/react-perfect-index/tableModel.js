import Default from './__defaults__/main'

class TableModel {
    constructor(schema = Default.data, tableModel = Default.data) {
        this.schema = schema
        this.tableModel = tableModel
    }

    isEmpty = (object = Default.data) => {
        var items = []
        for (var item in object) {
            items.push(item)
        }
        
        return items.length === 0
    }

    countDocuments = async () => await this.tableModel.where('id').notEqual(-1).toArray().then(res => res.length)
    
    parser = (type = "", value = "") => {
        switch(type) {
            case "string": return String(value)
            case "number": return Number(value)
            case "object": return Object(value)
            case "boolean": return Boolean(value)
        }
    }

    insertOne = async (data = this.schema) => {
        var parsedData = {}

        for (var prop in this.schema) {
            for (var item in data) {
                if (item === prop) {
                    parsedData[item] = this.parser(this.schema[prop], data[item])
                }
            }
        }

        const id = await this.countDocuments()
        const field = { id, data: parsedData }

        this.tableModel.put(field)
    }

    findOne = async (fields = this.schema) => {
        const response = await this.tableModel.where('id').notEqual(-1).toArray()
        var foundData = null
        foundData = response.find(item => {
            for (var field_item in fields) {
                for (var data_item in item.data) {
                    if (field_item === data_item) {
                        if (fields[field_item] == item.data[data_item]) {
                            foundData = item.data
                            foundData['_id'] = item.id
                            return foundData
                        }
                    }
                }
            }
            return null
        })

        return !foundData? null : foundData.data
    }

    find = async (fields = this.schema) => {
        var foundData = null
        var foundItems = []
        const response = await this.tableModel.where('id').notEqual(-1).toArray()
        if (this.isEmpty(fields)) {
            response.forEach(item => {
                foundData = item.data
                foundData['_id'] = item.id
                foundItems.push(foundData)
            })
            return foundItems
        }
        response.forEach(item => {
            for (var field_item in fields) {
                for (var data_item in item.data) {
                    if (field_item === data_item) {
                        if (fields[field_item] === item.data[data_item]) {
                            foundData = item.data
                            foundItems.push(foundData)
                        }
                    }
                }
            }
        })
        return foundItems
    }

    updateOne = async (field = this.schema, updatedField = this.schema) => {
        var found = await this.findOne(field)
        if (!found) {
            console.log("Couldn't find requested Field")
            return null
        }

        var found_field = { id: found['_id'], data: {} }
        for (var prop in found) {
            if (prop !== "_id") {
                found_field['data'][prop] = found[prop]
            }
        }

        for (var item in updatedField) {
            for (var data_item in found_field.data) {
                if (item === data_item) {
                    found_field['data'][item] = updatedField[item]
                }
            }
        }

        this.tableModel.put(found_field)
    }

    updateMany = async (fields = this.schema, updatedField = this.schema) => {
        var foundItems = await this.find(fields)
        await foundItems.forEach(async found => {
            var field = { id: found['_id'], data: {} }
            for (var prop in found) {
                if (prop !== "_id") {
                    field['data'][prop] = found[prop]
                }
            }

            for (var item in updatedField) {
                for (var data_item in field.data) {
                    if (item === data_item) {
                        field['data'][item] = updatedField[item]
                    }
                }
            }

            this.tableModel.put(field)
        })
    }

    fetchAll = async () => await this.tableModel.where('id').notEqual(-1).toArray()
}

export default TableModel