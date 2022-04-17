import Table from "../components/Table"
import { SUBSCRIPTIONS_COLUMNS } from "../constants"

const Subscriptions = (props: any) => {
    const { rows } = props;

    const tableProps = {
        columns: SUBSCRIPTIONS_COLUMNS,
        data: rows,
    }

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
            </div>

            <div className='footerbar'>
                <span className='footerbar--key'>
                    total mo. cost
                </span>
                <span className='footerbar--value'>
                    $3,500
                </span>
            </div>
        </div>
    )
}

export default Subscriptions