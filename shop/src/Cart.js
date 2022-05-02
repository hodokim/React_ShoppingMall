import React from 'react'
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import './Detail.scss';

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
            {
                props.alertState === true
                    ? <div className="my-alert-test">
                        <p>지금 구매하시면 20% 추가할인!</p>
                        <button onClick={()=>{ props.dispatch({type: 'popupClose'})}}>닫기</button>
                    </div>
                    : null

            }

        </div>
    )
}

function toProps(state) {
    return {
        state : state.reducer,
        alertState : state.reducer2
    }
}

export default connect(toProps)(Cart)

//export default Cart;