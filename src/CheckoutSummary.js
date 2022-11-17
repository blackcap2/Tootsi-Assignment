import React, { Fragment, useState } from 'react';
import {useLocation, useNavigate} from "react-router-dom"
import { Container, LeftContainer, RightContainer,TitleContainer, ProductTitle, UnitTitle, Hr, ProductContainer, ProductDesc, CrossButton, ImageContainer, Image, ProductName, UnitDesc, QuantityContainer, QuantityButton, QuantityInput, CartTitle, CartSubContainer, CartSub, CartSubText, TotalContainer, Totalsub, TotalsubText,Proceed } from './CheckoutStyles';

const CheckoutSummary = () => {
    const {state} = useLocation();
    const [data,setData] = useState([...state]);
    const calculateTotal = () =>{
        let sum = 0;
        data.map(item=>{
            item.taken===true? sum += (item.price*item.amount) : sum = sum
        })
        return sum;
    }
    const total = calculateTotal();

    const handleCross = (item) => {
        setData(
            data.map((obj)=>{
                return (obj.size===item.size && obj.color===item.color && obj.name===item.name) ? {...obj, taken: !obj.taken} : obj;
            })
        )
    }
    const handlePlus = (item) =>{
        if(item.amount+1>item.availableQuantity){
            alert("Maximum avaiable quantity reached !");
            return;
        }
        setData(
            data.map((obj)=>{
                return (obj.size===item.size && obj.color===item.color && obj.name===item.name) ? {...obj, amount: obj.amount+1} : obj;
            })
        )
    }
    const handleMinus = (item) =>{
        if(item.amount-1<1) {
            alert("Quantity can't be less than 1");
            return;
        }
        setData(
            data.map((obj)=>{
                return (obj.size===item.size && obj.color===item.color && obj.name===item.name) ? {...obj, amount: obj.amount-1} : obj;
            })
        )
    }
    const naviagate = useNavigate();
    const handleProceed = () =>{
        naviagate("/thankyou")
    }

    return (
        <Container>
            <LeftContainer>
                <TitleContainer>
                    <ProductTitle>Product</ProductTitle>
                    <UnitTitle>Price</UnitTitle>
                    <UnitTitle>Quantity</UnitTitle>
                    <UnitTitle>Subtotal</UnitTitle>
                </TitleContainer>
                <Hr/>
                {
                  data.map((item,index)=>  
                    <Fragment key={index}>
                        {item.taken===true?<ProductContainer key={index}>
                        <ProductDesc>
                            <CrossButton onClick={()=>handleCross(item)}>X</CrossButton>
                            <ImageContainer>
                                <Image src={item.image}/>
                            </ImageContainer>
                            <ProductName>{item.name} {item.type} - {item.color}</ProductName>
                        </ProductDesc>
                        <UnitDesc>${item.price}</UnitDesc>
                            <QuantityContainer>
                                <QuantityButton onClick={()=>handlePlus(item)}>+</QuantityButton>
                                <QuantityInput disabled value={item.amount}/>
                                <QuantityButton onClick={()=>handleMinus(item)}>-</QuantityButton>
                            </QuantityContainer>
                            <UnitDesc>${item.price*item.amount}</UnitDesc>
                    </ProductContainer>
                        :
                        null
                        }
                    </Fragment>
                  )
                }
            </LeftContainer>

            <RightContainer>
                <CartTitle>Cart totals</CartTitle>
                <CartSubContainer>
                    <CartSub>Subtotal</CartSub>
                    <CartSubText>${total}</CartSubText>
                </CartSubContainer>
                <Hr/>
                <TotalContainer>
                    <Totalsub>Total</Totalsub>
                    <TotalsubText>${total}</TotalsubText>
                </TotalContainer>
                <Proceed onClick={handleProceed}>PROCEED TO CHECKOUT</Proceed>
            </RightContainer>
        </Container>
    );
};

export default CheckoutSummary;