import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { FetchStatusCountPerMonth } from '../../../api'
import Preloader from '../../../commons/Preloader';
import NotFound from '../../../commons/NotFound';

const MonthlyStatusChart = () => {

    const [monthlyStatusCount, setMonthlyStatusCount] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await FetchStatusCountPerMonth();
            if (response.code === 200) {
                setLoading(false)
                return setMonthlyStatusCount(response.data)
            }
        })()
    }, [])

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const datasets = [
        {
            label: 'Approved',
            data: labels.map((_, index) => monthlyStatusCount[index]?.[index.toString()]?.approved || 0),
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            borderRadius: 10,
            stack: 'Stack 0',
        },
        {
            label: 'Rejected',
            data: labels.map((_, index) => monthlyStatusCount[index]?.[index.toString()]?.rejected || 0),
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            borderRadius: 10,
            stack: 'Stack 0',
        },
        {
            label: 'Pending',
            data: labels.map((_, index) => monthlyStatusCount[index]?.[index.toString()]?.pending || 0),
            backgroundColor: 'rgba(53, 162, 235, 0.3)',
            borderColor: 'rgb(53, 162, 235)',
            borderWidth: 1,
            borderRadius: 10,
            stack: 'Stack 0',
        }
    ];

    const data = {
        labels,
        datasets,
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Invoice Status Aggregate',
            },
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        maintainAspectRatio: false,
        scales: {
            x: {
                //stacked: true,
                barPercentage: 1.0,
                categoryPercentage: 1.0
            },
            y: {
                //stacked: true,
            },
        },
    };

    return (
        <div className='bg-white rounded-lg h-80 p-4'>
            {loading && <Preloader />}
            {!loading && monthlyStatusCount.length === 0 && <NotFound />}
            {!loading && monthlyStatusCount.length > 0 && <Bar options={options} data={data} id={1} />}
        </div>
    );
}


export default MonthlyStatusChart;