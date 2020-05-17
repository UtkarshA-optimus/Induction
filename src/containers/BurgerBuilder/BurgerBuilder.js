import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';

const INGREDIENT_COST = {
    salad: 0.5,
    meat: 1.3,
    bacon: 0.7,
    cheese: 0.5
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    };

    componentDidMount() {
        axios.get('https://react-burger-app-42a9c.firebaseio.com/ingredients.json').then(res => {
            this.setState({ ingredients: res.data });
        });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const PriceAddition = INGREDIENT_COST[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice + PriceAddition;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const PriceDeduction = INGREDIENT_COST[type];
        const oldPrice = this.state.totalPrice;
        const updatedPrice = oldPrice - PriceDeduction;
        this.setState({ totalPrice: updatedPrice, ingredients: updatedIngredients });
        this.updatePurchaseState(updatedIngredients);

    };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        // alert('YOU CONTINUE');
        const queryParameters = [];
        for(let i in this.state.ingredients) {
            queryParameters.push(encodeURIComponent(i)+ '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParameters.push('price='+ this.state.totalPrice);

        const queryString = queryParameters.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    };

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        
        let burger = <Spinner />;

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice} />;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default WithErrorHandler(BurgerBuilder, axios);