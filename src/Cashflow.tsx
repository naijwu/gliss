import { useEffect, useState } from 'react'
import Table from "../components/Table"
import { CASHFLOW_TEMPLATE, CASHFLOW_COLUMNS } from "../constants"

const Cashflow = (props: any) => {
    const EMPTY_CASHFLOW: {
        [key: string]: any
      } = {
          ...CASHFLOW_TEMPLATE
    }
    
    const { ts, tb } = props;

    const initialize = () => {
        if(typeof window !== "undefined") {
            let store = sessionStorage.getItem('cashflow')
            if (store != null) {
                return (JSON.parse(store))
            } else {
                return ([EMPTY_CASHFLOW])
            }
        } else {
            return ([EMPTY_CASHFLOW])
        }
    }

    useEffect(() => { 
        if(window) {
            let store = sessionStorage.getItem('cashflow')
            if (store) {
                setRows(JSON.parse(store))
            } else {
                setRows([EMPTY_CASHFLOW])
            }
        }
    }, [])

    const initializeAggregate = () => {
        const template: Array<{
            [key: string]: any
          }> = [
            {
                'source': 'subscriptions',
                'value': -ts,
            },
            {
                'source': 'budgeting',
                'value': -tb,
            }
        ];
        
        return template;
    }

    const [rows, setRows] = useState(initialize);
    const [readOnlyRows, setReadOnlyRows] = useState(initializeAggregate)
    const [refresh, setRefresh] = useState(false)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let updatedReadOnly = readOnlyRows

        updatedReadOnly[0].value = -ts
        updatedReadOnly[1].value = -tb

        setReadOnlyRows(updatedReadOnly)
        setRefresh(!refresh);
    }, [readOnlyRows, ts, tb])
 
    const handleAddRow = () => {
        let updatedRow = rows;
        updatedRow.push({
            ...CASHFLOW_TEMPLATE
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
        columns: CASHFLOW_COLUMNS,
        fnEditCell: handleEditCell,
        fnDeleteRow: handleDeleteRow,
        readOnly: readOnlyRows
    }

    useEffect(() => {
        let total = 0
        for(let i = 0; i < rows.length; i++) {
            total += parseInt(rows[i][CASHFLOW_COLUMNS[1]])
        }
        for(let i = 0; i < readOnlyRows.length; i++) {
            total += (readOnlyRows[i][CASHFLOW_COLUMNS[1]] == '') ? 0 : parseInt(readOnlyRows[i][CASHFLOW_COLUMNS[1]])
        }
        setTotal(total);
        
        sessionStorage.setItem('cashflow', JSON.stringify(rows));
    }, [refresh, readOnlyRows, rows])

    return (
        <div className='block'>
            <div className='titlebar'>
                <div className='titlebar--dot'></div>
                <span className='titlebar--header'>
                    cashflow
                </span>
            </div>

            <div className='block--inner'>
                <Table {...tableProps} />
                <span onClick={handleAddRow} className='block--inner-add'>+ add income or saving</span>
            </div>

            <div className='footerbar'>
                <span className='footerbar--key'>
                    surplus
                </span>
                <span className='footerbar--value'>
                    ${total}
                </span>
            </div>
        </div>
    )
}

export default Cashflow