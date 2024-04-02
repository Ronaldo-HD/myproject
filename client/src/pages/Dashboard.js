import React from "react";
import ProjectTable from "../components/ProjectTable";
import Todo from "../components/Todo";
import StatisticCards from '../components/StatisticCards';
import Discusions from "../components/Discusions";
import Files from "../components/Files";

export default function Dashboard(){
    return(

        <div style={{width:'100%'}} >
            <StatisticCards/>

            <div style={{
            display:'flex',
            gap:'20px',
            width:'100%',
            flexWrap:'wrap'}} >
            
            <ProjectTable/>
            <Todo/>
            <Discusions/>
            <Files/>
        </div>
        </div>
       
    )
}