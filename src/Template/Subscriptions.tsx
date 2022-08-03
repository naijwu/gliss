import { useEffect, useState } from 'react'
import Table from "../../components/Template/Table"
import { SUBSCRIPTIONS_COLUMNS, SUBSCRIPTIONS_TEMPLATE } from "../../constants"

const Subscriptions = ({ onChangeTotal }: any) => {
    const EMPTY_SUBSCRIPTION: {
        [key: string]: any
      } = {
          ...SUBSCRIPTIONS_TEMPLATE
    }

    const initialize = () => {
        if(typeof window !== "undefined") {
            let store = sessionStorage.getItem('subscriptions')
            if (store != null) {
                return (JSON.parse(store))
            } else {
                return ([EMPTY_SUBSCRIPTION])
            }
        } else {
            return ([EMPTY_SUBSCRIPTION])
        }
    }

    useEffect(() => { 
        if(window) {
            let store = sessionStorage.getItem('subscriptions')
            if (store != null) {
                setRows(JSON.parse(store))
            } else {
                setRows([EMPTY_SUBSCRIPTION])
            }
        }
    }, [])

    const [rows, setRows] = useState(initialize);
    const [refresh, setRefresh] = useState(false)
    const [total, setTotal] = useState(0)
 
    const handleAddRow = () => {
        let updatedRow = rows;
        updatedRow.push({
            ...SUBSCRIPTIONS_TEMPLATE
        })
        setRows(updatedRow)
        setRefresh(!refresh)
    }

    const handleEditCell = (value: any, key: any, index: any) => {
        let updatedRows = rows
        updatedRows[index][key] = value
        setRows(updatedRows)
        setRefresh(!refresh)
    }

    const handleDeleteRow = (index: any) => {
        let updatedRows = rows
        updatedRows.splice(index, 1);
        setRows(updatedRows);
        setRefresh(!refresh);
    }

    const tableProps = {
        data: rows,
        columns: SUBSCRIPTIONS_COLUMNS,
        fnEditCell: handleEditCell,
        fnDeleteRow: handleDeleteRow
    }

    useEffect(() => {
        let total = 0;
        for(let i = 0; i < rows.length; i++) {
            total += (rows[i][SUBSCRIPTIONS_COLUMNS[2]] == '') ? 0 : parseInt(rows[i][SUBSCRIPTIONS_COLUMNS[2]])
        }
        setTotal(total);
        onChangeTotal(total);
        
        sessionStorage.setItem('subscriptions', JSON.stringify(rows));
    }, [refresh, onChangeTotal, rows])

    return (
        <div className='block'>
            <div className='titlebar'>
                <div className='titlebar--dot'></div>
                <span className='titlebar--header'>
                    subscriptions
                </span>
            </div>

            <div className='block--inner'>
                <Table {...tableProps} />
                <span onClick={handleAddRow} className='block--inner-add'>+ add subscription</span>
            </div>

            <div className='footerbar'>
                <span className='footerbar--key'>
                    total mo. cost
                </span>
                <span className='footerbar--value'>
                    ${total}
                </span>
            </div>
        </div>
    )
}

export default Subscriptions