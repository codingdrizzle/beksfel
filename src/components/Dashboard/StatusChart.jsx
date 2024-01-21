import React from 'react';
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

export const options = {
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


function generateRandomData(length) {
    const randomData = [];
    for (let i = 0; i < length; i++) {
        randomData.push(Math.floor(Math.random() * 2000) - 1000); // Adjust the range as needed
    }
    return randomData;
}

export const data = {
    labels,
    datasets: [
        {
            label: 'Approved',
            data: generateRandomData(labels.length),
            backgroundColor: 'rgba(75, 192, 192, 0.3)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1,
            borderRadius: 10,
            stack: 'Stack 0',
        },
        {
            label: 'Rejected',
            data: generateRandomData(labels.length),
            backgroundColor: 'rgba(255, 99, 132, 0.3)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            borderRadius: 10,
            stack: 'Stack 0',
        },
        {
            label: 'Pending',
            data: generateRandomData(labels.length),
            backgroundColor: 'rgba(53, 162, 235, 0.3)',
            borderColor: 'rgb(53, 162, 235)',
            borderWidth: 1,
            borderRadius: 10,
            stack: 'Stack 1',
        },
    ],
};

const StatusChart = () => {
    return (
        <div className='bg-white rounded-lg h-80 p-4'>
            <Bar options={options} data={data} />
        </div>
    );
}


export default StatusChart;