import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import { Row, Col, Card, Table, Badge, ProgressBar } from "react-bootstrap";

const tableData = [
	{id:'1', name:'Yatin Xarma', subject:'Programming', qualification:'B.Tech', fee:'117.00', status:'Good'},
	{id:'2', name:'Hanu Chang', subject:'Basic Algorithm', qualification:'B.E', fee:'215.50', status:'Good'},
	{id:'3', name:'Jordan Nico', subject:'English', qualification:'B.A', fee:'210.70', status:'Good'},
	{id:'4', name:'Nadila Adja', subject:'History', qualification:'B.A', fee:'204.50', status:'Bad'},
	{id:'5', name:'James Brown', subject:'Commarce', qualification:'B.Com', fee:'217.70', status:'Good'},
	{id:'6', name:'Jack John', subject:'Software Engg', qualification:'B.Tech', fee:'200.10', status:'Bad'},
	{id:'7', name:'Tony Soap', subject:'It Engg', qualification:'B.Tech', fee:'217.70', status:'Good'},
	{id:'8', name:'Yatin Xarma', subject:'Programming', qualification:'B.Tech', fee:'117.00', status:'Good'},
	{id:'9', name:'Hanu Chang', subject:'Basic Algorithm', qualification:'B.E', fee:'215.50', status:'Bad'},
	{id:'10', name:'Jordan Nico', subject:'English', qualification:'B.A', fee:'210.70', status:'Good'},
	{id:'11', name:'Nadila Adja', subject:'History', qualification:'B.A', fee:'204.50', status:'Bad'},
	{id:'12', name:'James Brown', subject:'Commarce', qualification:'B.Com', fee:'217.70', status:'Good'},
	{id:'13', name:'Jack John', subject:'Software Engg', qualification:'B.Tech', fee:'200.10', status:'Bad'},
	{id:'14', name:'Tony Soap', subject:'It Engg', qualification:'B.Tech', fee:'217.70', status:'Good'},
	{id:'15', name:'Jordan Nico', subject:'English', qualification:'B.A', fee:'210.70', status:'Bad'},
	{id:'16', name:'Kohni Pandye', subject:'Sanskrit', qualification:'B.Tech', fee:'150.50', status:'Good'}	
];

export const TeacherDetails = ({companies}) => {
    companies = companies?.reverse();
    
    const [currentPage , setCurrentPage] = useState(1);  
    const recordsPage = 8;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    const records = companies?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableData?.length / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)
    console.log(companies);
    function prePage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <div className="table-responsive basic-tbl">
            <div id="teacher-table_wrapper" className="dataTables_wrapper no-footer">
             
                <Table
                     responsive
                     id="example-student"
                     style={{ width:'100%'}}
                  >
                    <thead>
                        <tr style={{ textAlign: "center", background: "#212A50", color:"#fff", fontWeight:'bold'  }}>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Phone</th>
                            {/* <th>Individuals</th> */}
                            {/* <th className="text-end">Performance</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {records && records.map((item, idx)=>(
                            <tr style={{textAlign:"center"}} key={++idx}>
                                <td>{++idx}</td>
                                <td>{item.first_name + " " + item.last_name}</td>
                                <td>{item.email}</td>
                                <td>{item.city}</td>
                                <td>{item.phone}</td>
                                {/* <td>${item.fee}</td>
                                <td>${item.fee}</td>
                                <td>${item.fee}</td> */}
                                {/* <td className="text-end"><span className={`badge badge-sm light badge-${item.status === "Good" ?  'success' : 'danger' }`}>{item.status}</span></td> */}
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div className="d-sm-flex text-center justify-content-between align-items-center">                           
                    <div className='dataTables_info'>
                        Showing {lastIndex-recordsPage + 1} to{" "}
                        {tableData?.length < lastIndex ? tableData?.length : lastIndex}
                        {" "}of {tableData?.length} entries
                    </div>
                    <div
                        className="dataTables_paginate paging_simple_numbers justify-content-center"
                        id="example2_paginate"
                    >
                        <Link
                            className="paginate_button previous disabled"
                            to="#"                                        
                            onClick={prePage}
                        >
                            <i className="fa-solid fa-angle-left" />
                        </Link>
                        <span>                                      
                            {number.map((n , i )=>(
                                <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                    onClick={()=>changeCPage(n)}
                                > 
                                    {n}                                                

                                </Link>
                            ))}
                        </span>
                        <Link
                            className="paginate_button next"
                            to="#"                                        
                            onClick={nextPage}
                        >
                            <i className="fa-solid fa-angle-right" />
                        </Link>
                    </div> 
                </div> 
            </div>	
        </div>
    )
}
