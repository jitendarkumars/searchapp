import React ,{useState,useEffect}from 'react'
import Pagination from 'react-bootstrap/Pagination'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router/esm/react-router';
function Dashboard(props) {
    const [activePage,setActivePage]=useState(1);
    const [searchData,setSearchData] =useState([]);
    const [totalPages,setTotalPages] =useState(1);
    const [typeValue,setTypeValue]=useState('');
    const [sortValue,setSortValue]=useState('');
    const [dateRangeValue,setDateRangeValue]=useState('');
  
    let history = useHistory();
    useEffect( () => {  
      if(!localStorage.getItem('userName')){
        history.push('/');
      }
      props.showLoader();
      const abortController = new AbortController();
      const signal = abortController.signal
      let request;
      let time="";
      switch(dateRangeValue){
        case 'last24h':
         time=    new Date().setDate(new Date().getDate()-1)
          break;
        case 'pastWeek':
         time=   new Date().setDate(new Date().getDate()-7)
          break;
        case 'pastMonth':
          time=  new Date().setMonth(new Date().getMonth()-1)
          break;
        case 'pastYear':
        time=    new Date().setFullYear(new Date().getFullYear()-1)
          break;
        default:
        time=  new Date().setFullYear(new Date().getFullYear()-100)
        break;
        }

    if(sortValue=='byDate'){
       request= `search_by_date?tags=${typeValue}&numericFilters=created_at_i>${time}&page=${activePage-1}&query=${props.query||''}`
     
    }
      else
      {
       request= `search?tags=${typeValue}&numericFilters=created_at_i>${time}&page=${activePage-1}&query=${props.query||''}`
 
      }
    
      getFeedData(request,signal);
   
    return function cleanup(){
      abortController.abort();
    }
    
    },[activePage,typeValue,dateRangeValue,sortValue,props.query])

   const  getFeedData=async(data,signal)=>{
    let response = await fetch(`https://hn.algolia.com/api/v1/${data}`,{signal:signal})
    let resData  = await response.json()
    props.hideLoader()
      setSearchData(resData.hits)
    setTotalPages(resData.nbPages)
    console.log(resData,totalPages)
      window.scrollTo(10, 10)
    }
      const handlePaginator=(text)=>{
      console.log(text,"Fdsfsd",totalPages)
      if(text==='»Last'){
        console.log("fist")
        setActivePage(totalPages)
        console.log(totalPages,activePage)
      }else if(text==='«First'){
          setActivePage(1)
        }
      }

    const  handleTypeChange=(event)=>{
      setTypeValue(event.target.value)
      }
      const  handleSortChange=(event)=>{
        setSortValue(event.target.value)
      }
      const  handleDateRangeChange=(event)=>{
        setDateRangeValue(event.target.value)
      }
      
   const  saveLink=(data)=>{
     console.log(data,localStorage.getItem("historyData"))
    let historyData=JSON.parse(localStorage.getItem("historyData"))||[]
     if(historyData){
         let a= historyData.filter(d=>d.objectID==data.objectID)
         if(a.length==0){
          historyData.unshift(data);
            }else{
          historyData.splice( historyData.indexOf(a[0]),1)
          historyData.unshift(data);
         }
         localStorage.setItem("historyData",JSON.stringify(historyData.slice(0,5)))
    
     }else{     
      localStorage.setItem("historyData",JSON.stringify(data))
     }
        
     }
      
let items = [];
items.push(<React.Fragment key="top"><Pagination.First key="first" /> <Pagination.Prev key="next" /></React.Fragment>);
for (let number = activePage-3>0?activePage-3:1; number <= ((activePage+3)<50? activePage+3:totalPages); number++) {
  items.push(
    <Pagination.Item key={number} active={number === activePage} onClick={()=>{setActivePage(number)}}>
      {number}
    </Pagination.Item>
  );
}

items.push(<React.Fragment key="bottom"><Pagination.Next key="next"/><Pagination.Last  key="last"/></React.Fragment>)
    return (
        <React.Fragment>
        <div className="dashboard-container">
        <div style={{display:'flex',justifyContent:'space-around'}}>
            <label>Search</label>
            <select value={typeValue} onChange={handleTypeChange} name="type" style={{width:"200px"}}> 
              <option value="[]">All</option>
              <option value="story">Stories</option>
              <option value="comment">Comments</option>
            </select>
            <label>By</label>
            <select value={sortValue} onChange={handleSortChange} name="sort" style={{width:"200px"}}> 
              <option value="byPopularity">Popularity</option>
              <option value="byDate">Date</option>
            </select>
            <label>For</label>
            <select value={dateRangeValue} onChange={handleDateRangeChange} name="dateRange" style={{width:"200px"}}> 
              <option value="all">All Time</option>
              <option value="last24h">Last 24 hrs</option>
              <option value="pastWeek">Past Week</option>
              <option value="pastMonth">Past Month</option>
              <option value="pastYear">Past Year</option>
            </select>
          </div>
           <div className="feeds-card">
               {
                    searchData.map((data,index)=>{
                       if(!(data.url==null || data.url=="")&& !(data.title ==null || data.title ==""))
                       return (<div key={index} className="feeds-info">
                         <div style={{flexDirection:'row',display:"flex"}}>  <div style={{fontSize:18}}>
                           <Link to={ `/items/${data.objectID}`} onClick={()=>saveLink(data)} style={{color:"black"}}> {data.title} </Link></div>
                           <div style={{color:"grey",marginLeft:5}}> (<a href={data.url} style={{color:"black"}} target="blank" onClick={(event) => {}}>{data.url}  </a>)</div>
                           </div>
                           <div style={{color:"grey"}}>{data.points} | {data.author} | {Math.ceil(new Date().getUTCFullYear()-new Date(data.created_at).getUTCFullYear())}Years Ago. | {data.num_comments} comments</div>
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
                   })
               }
           </div>
        </div>
        <div style={{alignItems:'center', justifyContent:'center',marginBottom:"40px", display:'flex'}}>   
        <Pagination onClick={(e)=>{handlePaginator(e.target.text)}}>{items}</Pagination> 
        </div>
        </React.Fragment>
    )
}

export default Dashboard
