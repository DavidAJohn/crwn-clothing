import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.components';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, total }) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem =>
                <CheckoutItem key={cartItem.id} cartItem={cartItem}></CheckoutItem>
            )
        }
        <div className='total'>
            <span>TOTAL: £{total}</span>
        </div>
        <div className='test-warning'>
            ** Use the following card details for test payments **
            <br />
            Card no: 4000 0082 6000 0000 - Exp. Date: any future date (mm/yy) - CVV: any three digits (UK Visa Credit Card)
            <br />
            Card no: 4000 0082 6000 0005 - Exp. Date: any future date (mm/yy) - CVV: any three digits (UK Visa Debit Card)
        </div>
        <StripeCheckoutButton price={total} />
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);
