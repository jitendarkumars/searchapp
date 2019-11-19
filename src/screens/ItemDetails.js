import React ,{useEffect} from 'react'
function ItemDetails(props) {
    const {id} = props.match.params
    console.log(id)
    useEffect(() => {
     getDetails();   
    }, [])
   const getDetails=async()=>{
            const reps=await fetch(`http://hn.algolia.com/api/v1/items/${id}`)
            const respData = await reps.json()
            console.log(respData)
    }
    return (
        <div>
            
        </div>
    )
}

export default ItemDetails
