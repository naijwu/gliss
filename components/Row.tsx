
const Row = (props: any) => {
    return (
        <tr className={props.readOnly && 'readonly'}>
            {props.children}
        </tr>
    )
}

export default Row;