import React, { useEffect, useState } from 'react'
import "../Assets/Styles/Product.css"
export default function Rating({rate}) {
    const [rating,setRating] = useState(rate);
    useEffect(()=>{
        function rates(rate){
            if(rating === 'NaN'){
                setRating(0);
            }
            
        }
        rates(rating)
    })
  return (
    
    <div className='product-rating'>
        {`${rating} ★`}
    </div>
  )
}
