import React ,{useEffect,useState} from 'react'
import CommentItem from '../components/CommentItem'
function ItemDetails(props) {
    const {id} = props.match.params
    const [itemData, setItemData] = useState([])
    console.log(id)
    useEffect(() => {
     getDetails();   
    }, [])
   const getDetails=async()=>{
            const reps=await fetch(`http://hn.algolia.com/api/v1/items/${id}`)
            const respData = await reps.json()
            console.log(respData)
            setItemData(respData)
    }
    return (
        <div  style={{border:"1px solid #ffe27b"}}className="dashboard-container">
            { 
              itemData && <CommentItem key="0" itemData={itemData}/>
            }
        </div>
    )
}

export default ItemDetails
