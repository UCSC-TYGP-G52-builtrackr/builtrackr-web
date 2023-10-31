

import React, {useState,useEffect } from 'react';
import { PieChart, Pie, Sector, Cell,  } from 'recharts';
import axios from 'axios';


const COLORS = ['#088f8f', ' #ff6347'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};
const PieComponent = () => {
const [taskcards, settaskCards] = useState([]);


 //get task

 const siteId = localStorage.getItem("site_id");

 //get task

useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/card/viewTaskname?siteId=${siteId}`);
         // Replace with your API endpoint to fetch card data

        if (response.status === 200) {
            settaskCards(response.data);
        }

      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };
 fetchCards();
  }, [siteId]);

  const calculatePercent = () => {

    const filterCardTask =taskcards.filter((card) => card.status === 1)
    if (!filterCardTask.length) return 0;
    const completed = filterCardTask.length;
    const totalTasks = taskcards.length;
    return (completed / totalTasks) * 100;
  };

const filterCardTask =taskcards.filter((card) => card.status === 1)
const persent = calculatePercent();
console.log(persent);
const perecentage  = 100-persent
console.log(perecentage);

const data = [
    { name: 'Ongoing', value: perecentage},
    { name: 'Completed', value: persent },

];



    return (
        <div>
     
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                </PieChart>

                <div className='grid grid-cols-4 ml-5'>
                {
                  
                     data.map((item)=>(
                        <p className='font-bold cursor-pointer'>{item.name}</p>
                              ))

                }
                </div>
                <div className='grid grid-cols-4 mt-[10px] ml-8 mb-2'>
                    {
                         COLORS.map((item)=>(
                <div className="h-[10px] w-[30px]" style={{backgroundColor:item}}>

                  </div>
                         ))

                    }


                </div>

        </div>
    )
}

export default PieComponent







// export default class Example extends PureComponent {
//     static demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';

//     render() {
//         return (
           
//         );
//     }
// }