import { createContext } from "react";
import { products } from "../assets/frontend_assets/assets";
export const ShopContext=createContext();
const ShopContextProvider=(props)=>{
    const currency=''
    const value={
        products,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}