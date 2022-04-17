const Table = (props: { columns: any; data: any; }) => {

    const { columns, data } = props;

    return (
        <table className='table'>
            <tr>
                {columns.map((item: any, index: any) => {
                    return (
                        <th key={index}>{item}</th>
                    )
                })}
            </tr>
            {data.map((item: any, index: any) => {
                return (
                    <tr key={index}>
                        {columns.map((column: any, columnIndex: any) => {
                            return (
                                <td key={columnIndex}>{item[column]}</td>
                            )
                        })}
                    </tr>
                )
            })}
        </table>
    )
}

export default Table;