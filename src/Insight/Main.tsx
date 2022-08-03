import { useEffect, useState } from "react"
import { B } from "../../components/composable/Typography"
import CSVReader from 'react-csv-reader'

const Main = () => {

    const colToIndex: any = {}
    const constructDictionary = () => {
        ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'].map((letter, index) => {
            colToIndex[letter] = index
        })
    }
    constructDictionary()

    const [ data, setData ] = useState<Array<any>>([])
    const [ meta, setMeta ] = useState({
        startRow: 13,
        dateCol: 'A',
        amountCol: 'E',
        infoCol: 'J',
    })
    const [ categories, setCategories ] = useState<Array<any>>([{
        name: '',
        color: '#000000',
        discriminant: ''
    }])
    const [ totalByCategory, setTotalByCategory ] = useState<any>({})
    const [total, setTotal] = useState(0)
    const [totalRows, setTotalRows] = useState(0)

    const handleCreateCategory = () => {
        let currentCategories = JSON.parse(JSON.stringify(categories))
        currentCategories.push({
            name: '',
            color: '#000000',
            discriminant: ''
        })
        setCategories(currentCategories)
    }

    const handleChangeField = (field: string, index: number, value: string) => {
        let currentCategories = JSON.parse(JSON.stringify(categories))
        currentCategories[index][field] = value        
        setCategories(currentCategories)
    }

    const handleChangeMeta = (property: string, value: any) => {
        let currentMeta = JSON.parse(JSON.stringify(meta))
        currentMeta[property] = value
        setMeta(currentMeta)
    }

    const breakdownData = (data: any) => {
        let totalRows = 0
        let total = 0

        let categoryTotals: any = {}
        let currentCategories = JSON.parse(JSON.stringify(categories))
        for (let i = 0; i < currentCategories.length; i++) {
            categoryTotals[currentCategories[i].name] = 0
        }

        for (let row = 0; row < data.length; row++) {
            if (row > meta.startRow) {
                let rowCategory = ''

                for (let col = data[row].length - 1; col >= 0; col--) {
                    if(col === colToIndex[meta.dateCol]) {
                        // do date stuff here
    
                    }
                    if (col === colToIndex[meta.infoCol]) {
                        // do categorization setup here
                        
                        const description = data[row][col]
                        for (let i = 0; i < categories.length; i++) {
                            if (description.toLowerCase().includes(categories[i].discriminant.toLowerCase())) {
                                rowCategory = categories[i].name
                                break;
                            }
                        }
                    }
                    if (col === colToIndex[meta.amountCol]) {
                        // do calculation here
                        let noDollarSign = data[row][col].replace('$', '')
                        total += parseInt(noDollarSign) < 0 ? 0 : parseInt(noDollarSign)

                        if (rowCategory) {
                            let currentCategoryTotals: any = JSON.parse(JSON.stringify(categoryTotals))
                            categoryTotals[rowCategory] = currentCategoryTotals[rowCategory] + parseInt(noDollarSign)
                        }
                    }
                }
                totalRows += 1
            }
        }

        setTotal(total)
        setTotalRows(totalRows)
        setTotalByCategory(categoryTotals)
    }

    useEffect(() => {
        breakdownData(data)
    }, [ data, JSON.stringify(categories) ])

    return (
        <div style={{
            padding: '1.5rem 2rem',
            display: 'flex',
            gap: '2rem'
        }}>
            <div style={{
                paddingRight: '2rem',
                borderStyle: 'none solid none none',
                borderWidth: 1,
                borderColor: '#EEE',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                minWidth: 400
            }}>
                <div>
                    <B>data</B>
                    <div style={{
                        paddingTop: '1rem',
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem"
                    }}>
                        <div>
                            First data row (number)
                            <input style={{marginTop: "0.5rem"}} className="cell" type="text" value={meta.startRow} onChange={(e)=>handleChangeMeta('startRow', e.target.value)} />
                        </div>
                        <div>
                            Date column (letter)
                            <input style={{marginTop: "0.5rem"}} className="cell" type="text" value={meta.dateCol} onChange={(e)=>handleChangeMeta('dateCol', e.target.value.toUpperCase())} />
                        </div>
                        <div>
                            Amount column (letter)
                            <input style={{marginTop: "0.5rem"}} className="cell" type="text" value={meta.amountCol} onChange={(e)=>handleChangeMeta('amountCol', e.target.value.toUpperCase())} />
                        </div>
                        <div>
                            Information column (letter)
                            <input style={{marginTop: "0.5rem"}} className="cell" type="text" value={meta.infoCol} onChange={(e)=>handleChangeMeta('infoCol', e.target.value.toUpperCase())} />
                        </div>
                        <div>
                            copy + paste (CSV)
                            <CSVReader onFileLoaded={(data, fileInfo) => {setData(data); console.log(fileInfo)}} />
                        </div>
                    </div>
                </div>
                <div>
                    <B>categories</B>
                    <div style={{
                        paddingTop: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem'
                    }}>
                        {categories.map((item, index) => {
                            return (
                                <div key={index} style={{
                                    display: 'flex',
                                    gap: '0.5rem',
                                    padding: '0.5rem',
                                    border: '1px solid #eee'
                                }}>
                                    <div style={{display: "flex", flexDirection: 'column', gap: '0.5rem'}}>
                                        color
                                        <input type="color" className="cell" onChange={(e)=>handleChangeField('color', index, e.target.value)} />
                                    </div>
                                    <div style={{display: "flex", flexDirection: 'column', gap: '0.5rem'}}>
                                        name
                                        <input type="text" className="cell" onChange={(e)=>handleChangeField('name', index, e.target.value)} />
                                    </div>
                                    <div style={{display: "flex", flexDirection: 'column', gap: '0.5rem'}}>
                                        discriminant
                                        <input type="text" className="cell" onChange={(e)=>handleChangeField('discriminant', index, e.target.value)} />
                                    </div>
                                </div>
                            )
                        })}
                        <div className="add" onClick={handleCreateCategory}>
                            + create a category
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                flexGrow: 1,
            }}>
                <div>
                    <B>breakdown</B>
                    <div style={{
                        paddingTop: '1rem',
                        display: 'flex',
                    }}>
                        <div style={{ flexGrow: 1 }}>
                            # transactions
                            <div>
                                {totalRows}
                            </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            total spent
                            <div>
                                {total}
                            </div>
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            by category
                            <div>
                                {Object.keys(totalByCategory).map((key, index) => {
                                    return (
                                        <div key={index} style={{
                                            backgroundColor: categories.find((item) => item.name === key)?.color
                                        }}>
                                            {key}: {totalByCategory[key]}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{
                    paddingTop: '2rem'
                }}>
                    <B>data</B>
                    <table>
                        {data && data.map((row: Array<any>, rowIndex: number) => {
                            return rowIndex > (meta.startRow ? meta.startRow : 0) && (
                                <tr key={rowIndex}>
                                    {
                                        row.map((cell: any, columnIndex: number) => {
                                            return (
                                                <td key={columnIndex}>
                                                    {cell ? cell : '-'}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Main