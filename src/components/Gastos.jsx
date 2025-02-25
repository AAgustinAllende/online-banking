import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import serviciosData from '../data/servicios.json';

const Gastos = ({ movimientos }) => {
    const chartRef = useRef(null);//obtener el contexto del canvas
    const chartInstance = useRef(null);//almacena la instancia del grafico y evita que se superpongan

    useEffect(() => {
        if (!movimientos.length) return;

        // Agrupar gastos por categoría
        const categorias = {};
        movimientos.forEach(mov => {
            const match = mov.match(/Pagaste (.+?) - \$(\d+)/); //capturamos el nombre del servicio y el monto
            if (match) {
                const [, nombre, monto] = match;
                const servicio = serviciosData.find(serv => serv.nombre === nombre);
                const categoria = servicio ? servicio.categoria : 'Otros';
                categorias[categoria] = (categorias[categoria] || 0) + parseFloat(monto);
            } else if (mov.includes("Compraste") && mov.includes ("USD")) {
                const monto = parseFloat(mov.split("- ")[1]);
                if(!isNaN(monto) && monto > 0){
                    categorias["Dólares"] = (categorias["Dólares"] || 0) + monto;//sumamos el monto a la categoria dolares inicializandola en 0
                }
                
            } else if (mov.includes("Transferencia")) {
                const monto = parseFloat(mov.match(/\$(\d+(?:\.\d+)?)/)?.[1] || 0);
                categorias["Transferencias"] = (categorias["Transferencias"] || 0) + monto;
            }
        });

        

        // Eliminar gráfico previo si existe
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }

        const ctx = chartRef.current.getContext('2d');//obtener el contexto del canvas
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(categorias), //categorias del gasto
                datasets: [{
                    data: Object.values(categorias), //valores
                    backgroundColor: [
                        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }, [movimientos]);

    return (
        <section className="grafico-consumo">
            <h5>Mis gastos</h5>
            <canvas ref={chartRef}></canvas>
        </section>
    );
};

export default Gastos;
