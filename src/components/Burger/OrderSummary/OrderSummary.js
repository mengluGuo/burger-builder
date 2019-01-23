import React from 'react';
import Aux from '../../../hoc/Ax';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
                                    .map(igkey => {
                                        return (<li key={igkey}>
                                                    <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}
                                                </li>)
                                    });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCLE</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;