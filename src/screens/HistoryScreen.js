import React, { useEffect } from 'react'
import { useHistory } from 'react-router/esm/react-router';

function HistoryScreen() {
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('userName')){
            history.push('/');
          }
    })
  
    let historyData=JSON.parse(localStorage.getItem("historyData"))||[]
    const reslt=(
        historyData.length>0? (
              <div  className="dashboard-container">
                  Last 5 News Search
           <div className="feeds-card">
            {historyData.map((data,index)=>{
                    if(!(data.url==null || data.url=="")&& !(data.title ==null || data.title ==""))
                    return (<div key={index} className="feeds-info">
                      <div style={{flexDirection:'row',display:"flex"}}>  <div style={{fontSize:18}}>
                        {data.title} </div>
                        <div style={{color:"grey",marginLeft:5}}> (<a href={data.url} target="blank" onClick={(event) => {}}>{data.url}  </a>)</div>
                        </div>
                        </div>)
                        return (
                         <div key={index} className="feeds-info">
                         <div style={{flexDirection:'row',display:"flex"}}>  
                         <div>{data.author} 
                         | {Math.ceil(new Date().getUTCFullYear()-new Date(data.created_at).getUTCFullYear())}Years Ago.
                         |on: {data.story_title}
                         
                         </div>
                       
                           </div>
                           <div style={{color:"grey"}}>{data.comment_text}</div>
                        
                           </div>
                        )
                }) }
                </div>
                </div>
        
            
            ) :<div style={{justifyContent:'center',display:'flex'}} className="dashboard-container">No Data Found</div>
    )
    return (
        <div>
            {reslt}
        </div>
    )
}

export default HistoryScreen
