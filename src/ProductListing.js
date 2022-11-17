import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { Container, TypeSelect, Option, TitleContainer, ImageTitle, Title, BuyTitle, Hr, TopContainer, TopContainerLeft, TopContainerRight, ResetButton, SearchBox, SearchText, CartButton, ProductContainer, Image, Text, ImageContainer, CartContainer, InputNumber, CartIcon, InputCheckBox } from './ProductListingStyle';
import { allData } from './data.'; 

const ProductListing = () => {
    const [data,setData] = useState(null);
    useEffect(() => {
        let temp = allData;
        for(let i=0; i<temp.length; i++){
            temp[i].amount=1;
            temp[i].taken = false;
        }
        setData(temp);
      },[]);

    const [filtering,setFiltering] = useState({type: "type", size: "size"});
    const [search,setSearch] = useState("");

    let visibleData = data;

    const manupulateData = () =>{
        if(search !== ""){
                visibleData = allData.filter(data=>(data.name).toLowerCase().includes(search.toLowerCase())
                    )
            }
        
        if(filtering.type !== "type"){
            visibleData = visibleData.filter(data=>data.type===filtering.type)
            }
        if(filtering.size !== "size"){
            visibleData = visibleData.filter(data=>data.size===filtering.size)
        }
    }
    manupulateData();
    // console.log(search+" "+filtering.type+ " "+filtering.size);
    // console.log(visibleData);
    const naviagate = useNavigate();
    const handleCartButton = () =>{
        naviagate("/checkout",{state: data})
    }

    const handleAmount = (e,item)=>{
        let temp = parseInt(e.target.value);
        setData(
            data.map((obj)=>{
                return (obj.size===item.size && obj.color===item.color && obj.name===item.name) ? {...obj, amount: temp} : obj;
            })
        )
    }
    const handleChange = (item)=>{
        setData(
            data.map((obj)=>{
                return (obj.size===item.size && obj.color===item.color && obj.name===item.name) ? {...obj, taken: !obj.taken } : obj;
            })
        )
    }
    console.log(data);
    console.log(visibleData);

    return (
        <>
        {
            data?
            <Container>
            <TopContainer>
                <TopContainerLeft>
                    <TypeSelect onChange={(e)=>setFiltering({
                        ...filtering,
                        type: e.target.value
                    })}>
                        {filtering.type==="type"?<Option value="type" selected>type</Option>:<Option value="type">type</Option>}
                        <Option value="hoodie">hoodie</Option>
                        <Option value="shirt">shirt</Option>
                        <Option value="suit">suit</Option>
                    </TypeSelect>
                    <TypeSelect onChange={(e)=>setFiltering({
                        ...filtering,
                        size: e.target.value
                    })}>
                        {filtering.size==="size"?<Option value="size" selected>size</Option>:<Option value="size">size</Option>}
                        <Option value="L">L</Option>
                        <Option value="M">M</Option>
                        <Option value="XL">XL</Option>
                    </TypeSelect>
                    <ResetButton onClick={()=>setFiltering({type: "type", size: "size"}) }>↻ Reset</ResetButton>
                </TopContainerLeft>
                <TopContainerRight>
                    <SearchText>Search: </SearchText>
                    <SearchBox placeholder="Search by name.." onChange={(e) => setSearch(e.target.value) }/>
                    <CartButton onClick={handleCartButton}>Add To Cart</CartButton>
                </TopContainerRight>
            </TopContainer>
            <TitleContainer>
                <ImageTitle>Image</ImageTitle>
                <Title>Name</Title>     
                <Title>Color</Title>     
                <Title>Size</Title>     
                <Title>Stock</Title>     
                <Title>Price</Title>     
                <Title>Available</Title>     
                <BuyTitle>Buy</BuyTitle>     
            </TitleContainer>
            <Hr/>

            {/* Filtering starts here */}
                {
                    visibleData.map((item,index)=>
                        <ProductContainer key={index}>
                            <ImageContainer><Image src={item.image}/></ImageContainer>
                            <Text>{item.name}</Text>
                            <Text>{item.color}</Text>
                            <Text>{item.size}</Text>
                            <Text>{item.instock}</Text>
                            <Text>${item.price}</Text>
                            <Text>{item.availableQuantity}</Text>
                            <CartContainer>
                                <InputNumber type="number"
                                value={item.amount.toString()} min='1' max={item.availableQuantity.toString()} onKeyDown={(e)=>e.preventDefault()} onChange={(e)=>handleAmount(e,item)} />
                                <CartIcon>🛒</CartIcon>
                                {
                                    item.taken?<InputCheckBox type="checkbox" checked onChange={(e)=>handleChange(item)} />:<InputCheckBox type="checkbox" onChange={(e)=>handleChange(item)} />
                                }
                            </CartContainer>
                        </ProductContainer>
                    )
                }

        </Container>
            :
            null
        }
        </>
    );
};

export default ProductListing;