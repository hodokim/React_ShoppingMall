import React from 'react'
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';

function Cart(props) {
    return (
        <div>
            <Table responsive>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경</th>
                </tr>
                {
                    props.state.map((data, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.quan}</td>
                                <td>                                   
                                    <button onClick={() => { props.dispatch({ type: 'dec' }) }}>-</button>
                                    <button onClick={() => { props.dispatch({ type: 'inc' }) }}>+</button>
                                </td>
                            </tr>
                        )
                    })
                }


            </Table>
        </div>
    )
}

function test(state) {
    return {
        state,
    }
}

export default connect(test)(Cart)

//export default Cart;