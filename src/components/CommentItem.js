import React from 'react'

function CommentItem(props) {  
    console.log(props
        )  
    return (
        <div style={{margin:"10px 10px",padding:"10px 40px",border:"1px solid #f27130"}}>
            {
                <div>
              
                <div>{props.itemData.author}</div>
                <div>{props.itemData.created_at}</div>
                <div>{props.itemData.points}</div>
                <div>{props.itemData.type}</div>
              
                <div dangerouslySetInnerHTML={{ __html: props.itemData.text }}></div>
              { 
 (  props.itemData.children && props.itemData.children.map((t,index)=>{
    return  <CommentItem key={index+1} itemData={t}/>
      })
)
            }

</div>

                


                

                   

              
            }
        </div>
    )
}

export default CommentItem
