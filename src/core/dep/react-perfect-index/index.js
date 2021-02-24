import Default from './__defaults__/main'
import TableModel from './tableModel'
import Dexie from 'dexie'

class PerfectIndex {
    constructor({ name = Default.name}) {
        this.state = {
            name, data: new Dexie(name)
        }

        this.tables = {}
    }
    
    useTable = (tableData = Default.schema) => {
        if (!tableData.name || tableData.name.length < 1) {
            console.log("Table should always have a name")
            return null
        }

        if (!tableData.schema || typeof tableData.schema !== "object") {
            console.log("Table schema is always required")
            return null
        }

        var dexieSchema = ""
        for (var prop in tableData.schema) {
            dexieSchema += prop + ","
        }
        
        this.tables[tableData.name] = {
            schema: tableData.schema, dexieSchema
        }

        this.state.data.version(1).stores({ [tableData.name]: 'id,data' })
        const db = this.state.data
        return new TableModel(tableData.schema, db[tableData.name])
    }
}

export default PerfectIndex