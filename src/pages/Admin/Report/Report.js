import React from "react";
import styles from "./Report.module.css";
import Chart from "chart.js/auto";
import { useEffect, useRef, useState } from "react";
import { GetRevenueOfAllEventByDateApi,GetTicketCountOfAllEventByDateApi } from "../../../services/api/EventApi";
import {format} from 'date-fns';

function Report(){
    const revenueChartRef = useRef(null);
    const [revenues, setRevenues] = useState([]);
    const [ticketCounts, setTicketCounts] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalTicketCount, setTotalTicketCount] = useState(0);
    useEffect(() => {
        return () => {
            destroyChart(revenueChartRef);
        };
    }, []);
    useEffect(() => {
        const fetchRevenues = async () => {
            const [revenues, ticketCounts] = await Promise.all([
                GetRevenueOfAllEventByDateApi("2025-02-15", "2025-03-22"),
                GetTicketCountOfAllEventByDateApi("2025-02-15", "2025-03-22"),
            ]);
            setRevenues(revenues?.revenues);
            setTicketCounts(ticketCounts?.ticketCounts);
            setTotalRevenue(revenues?.totalRevenue);
            setTotalTicketCount(ticketCounts?.totalTicketCount);
        };
        fetchRevenues();
    }, []);
    useEffect(() => {
        const ctx = document.getElementById("revenueChart").getContext("2d");
        destroyChart(revenueChartRef);
    
        const revenueLabels = revenues?.map(revenue => format(revenue?.label, "dd/MM/yyyy"));
        const RevenueValues = revenues?.map(revenue => revenue?.value);
        const ticketCountsValues = ticketCounts?.map(ticketCount => ticketCount?.value);

        revenueChartRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels: revenueLabels,
                datasets: [
                    {
                        label: "Revenue",
                        data: RevenueValues,
                        backgroundColor: "rgba(255, 206, 86, 0.8)",
                        yAxisID: 'y-revenue',
                    },
                    {
                        label: "Ticket Count",
                        data: ticketCountsValues,
                        backgroundColor: "rgba(54, 162, 235, 0.8)",
                        yAxisID: 'y-ticketCount',
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    'y-revenue': {
                        type: 'linear',
                        position: 'left',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Revenue',
                        },
                    },
                    'y-ticketCount': {
                        type: 'linear',
                        position: 'right',
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Ticket Count',
                        },
                        grid: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        },
                    },
                },
            },
        });
    }, [revenues, ticketCounts]);
    const destroyChart = (chartRef) => {
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }
    };
    return (
        <div className={styles["container"]}>
            <div className={styles["header"]}>
                <div className={styles["date"]}>
                    <i class="fas fa-calendar-alt"></i>
                    <span>{format(new Date(),'dd/MM/yyyy hh:mm:ss')}</span>
                </div>
            </div>
            <h1>Doanh thu</h1>
            <div className={styles["overview"]}>
                <h2>Tổng quan</h2>
                <div className={styles["stats"]}>
                    <div className={styles["stat"]}>
                        <div className={styles["info"]}>
                            <h3>Doanh thu</h3>
                            <p>{totalRevenue?.toLocaleString('vi-VN')} đ </p>
                        </div>
                    </div>
                    <div className={styles["stat"]}>
                        <div className={styles["info"]}>
                            <h3>Số vé đã bán</h3>
                            <p>{totalTicketCount?.toLocaleString('vi-VN')} vé</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["buttons"]}>
                <button>24 giờ</button>
                <button className={styles["active"]}>30 ngày</button>
            </div>
            <div className={styles["chart"]}>
                <canvas id="revenueChart"></canvas>
            </div>
        </div>
    );
}

export default Report;