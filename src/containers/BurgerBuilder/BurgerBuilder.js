import React, { Component } from 'react';

import Aux from '../../hoc/Ax';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from  '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRECIES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
                          .map(igkey => {
                              return ingredients[igkey];
                          })
                          .reduce(((sum, el) => {
                              return sum + el;
                          }), 0)
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    } 

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredints = {
            ...this.state.ingredients
        };
        updatedIngredints[type] = updatedCount;

        const priceAddition = INGREDIENT_PRECIES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredints});
        this.updatePurchaseState(updatedIngredints);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredints = {
            ...this.state.ingredients
        };
        updatedIngredints[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRECIES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredints});
        this.updatePurchaseState(updatedIngredints);
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;