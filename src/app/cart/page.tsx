import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";

const Cart = dynamic(()=>import('@/components/Cart/Cart'),{
    loading:()=>{
        return <CircularProgress/>
    }
})

export default function page() {
    return(
        <Cart />
    )
}
