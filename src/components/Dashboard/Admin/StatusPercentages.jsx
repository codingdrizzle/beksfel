import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

import { StatusPercentages } from '../../../api'
import Preloader from '../../../commons/Preloader';
import NotFound from '../../../commons/NotFound';

const StatusPercents = () => {

    const [statusPercentages, setStatusPercentages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await StatusPercentages();
            if (response.code === 200) {
                const sortedData = response.data.sort((a, b) => a.status.localeCompare(b.status));
                setLoading(false)
                return setStatusPercentages(sortedData);
            }
        })();
    }, []);

    const percentages = statusPercentages.map(item => item.percentage);

    const data = {
        labels: ['Approved', 'Rejected', 'Pending'],
        datasets: [
            {
                label: 'Percentiles',
                data: [...percentages],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.3)',
                    'rgba(255, 99, 132, 0.3)',
                    'rgba(53, 162, 235, 0.3)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(53, 162, 235, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Status Percentiles',
            },
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        maintainAspectRatio: false
       
    };

    return (
        <div className='bg-white rounded-lg h-80 p-4 flex justify-center items-center'>
            {loading && <Preloader />}
            {!loading && statusPercentages.length === 0 && <NotFound/>}
            {!loading && statusPercentages.length > 0 && <PolarArea data={data} options={options} />}
        </div>
    );
}


export default StatusPercents;