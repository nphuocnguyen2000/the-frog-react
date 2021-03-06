import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {notify} from 'react-notify-toast'
import * as actions from '../../actions/shops/index'
export default function Carts() {
    const data = useSelector(state => state.carts)
    const dispatch = useDispatch()
    
    function deleteCart(cart){
        if(confirm('Are you sure delete cart ?')){ //eslint-disable-line
            notify.show('Đã xóa sản phẩm khỏi giỏ hàng !','error',1500);
            dispatch(actions.actDeleteCart(cart))
        }
    
    }
    function priceDiscount(item){
        if(item){
            let price = item.price
            if(item.priceDiscount !== 0){
                price = item.price * ((100 - item.percentDiscount)/100)
                }
                return price;
            }   
        }
    const cartItem = data.map((item)=>{
        return (
            <div className="header__cart-sub--wrap--item" key={item._id}>
                <div className="header__cart-sub--wrap--item__img"><img src={item.image} alt="imgg" /></div>
                <div className="header__cart-sub--wrap--item__detail">
                    <div className="header__cart-sub--wrap--item__detail-left">
                    <div className="header__cart-sub--wrap--item__detail-left--name"><Link to={`/${item._id}`}>{item.name}</Link></div>
                    <div className="header__cart-sub--wrap--item__detail-left--category">{item.category[0]}</div>
                    </div>
                    <div className="header__cart-sub--wrap--item__detail-right">
                    <div className="header__cart-sub--wrap--item__detail-right--price">{ Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(priceDiscount(item))}.000₫</div>
                    <div onClick={()=> deleteCart(item)} className="header__cart-sub--wrap--item__detail-right--del">X</div>
                    </div>
                </div>
            </div>   
        )
    })
    const totalPrice = (data)=>{
       
        let total = 0
        if(data){
             for(var i=0; i< data.length; i++){
                total += (priceDiscount(data[i]) * data[i].quantity)
            }
        }
        return total
    }
    return (
        <div className="header__cart">
            <div className="header__cart-icon">
               <Link to="/carts"><span><i className="fa fa-shopping-bag" aria-hidden="true" /></span></Link> 
            </div>
            <div className="header__cart-detail">
                <div className="header__cart-detail--quantity"><span>{data.length}</span> ITEMS</div>
                <div className="header__cart-detail--price">$ <span>{ Intl.NumberFormat('en-VN', { maximumSignificantDigits: 3 }).format(totalPrice(data))}.000₫</span></div>
            </div>
            <div className="header__cart-sub">
                {
                    data.length !== 0 ? <div className="header__cart-sub--wrap">
                            {cartItem}   
                            </div>
                        : 
                        <div className="header__cart-sub--empty">
                            <img src="https://res.cloudinary.com/the-frog/image/upload/v1594302107/the-frog-main/cart-empty_w0epv2.png" alt="imgg" />
                        </div>
                }
                    <div className="header__cart-sub--bottom">
                        <Link to="/carts">
                            <span>XEM GIO HANG</span>
                        </Link>
                        
                    </div>
            </div>
            
        </div>
                    
    )
}
