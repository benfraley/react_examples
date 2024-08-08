import { AgCharts } from "ag-charts-react";
import React, { useState } from 'react';
import styles from './chart.module.css';
export default function Chart({data}) {

    let typeData = {};
    let genData = {};
    let total = 0;
    for(let i=0; i< data.length; i++) {
        // sum up the types
        if(data[i].type1 != null)
        {
            typeData[data[i].type1] = typeData[data[i].type1] == undefined ? 0 : typeData[data[i].type1] + 1;
        }
        if(data[i].type2 != null)
        {
            typeData[data[i].type2] = typeData[data[i].type2] == undefined ? 0 : typeData[data[i].type2] + 1;
        }
        // sum up the gnerations
        if(data[i].generation != null)
        {
            genData[data[i].generation] = genData[data[i].generation] == undefined ? 0 : genData[data[i].generation] + 1;
        }
        // total # of pokemon
        total = total + 1;
    }
    let formattedTypeData = [];
    let formattedGenData = [];
    for(var k in typeData) {
        formattedTypeData.push({type: k, amount: typeData[k]})
    }
    for(var k in genData) {
        formattedGenData.push({generation: k, amount: genData[k]})
    }

    let typeOptions = {
        data: formattedTypeData,
        title: {
          text: "Pokemon Types",
        },
        series: [
          {
            type: "pie",
            angleKey: "amount",
            legendItemKey: "type",
          },
        ],
        legend: {
            enabled: false
        }
      };

    let genOptions = {
        data: formattedGenData,
        title: {
            text: "Pokemon Generations",
        },
        series: [
            {
            type: "bar",
            xKey: "generation",
            yKey: "amount",
            yName: "Amount"
            },
        ],
        legend: {
            enabled: false
        }
    };

    return (
    <div className={styles.chartHolder}>
        <div className={styles.chart}>
            Welcome, Park Rangers!
            The world of Pokémon is more vibrant than ever, with Pokémon running wild across the globe! 
            Thanks to your tireless efforts, we've gathered an incredible trove of data on these fascinating 
            creatures. This dashboard is your ultimate resource for accessing detailed Pokémon statistics, 
            unique traits, and real-time updates. Together, we can keep track of every Pokémon and ensure the 
            safety and harmony of our world. We gotta catch 'em all!
            <br/><br/>
            Currently tracking {total} Pokemon!
        </div>
        <div className={styles.chart}>
            <AgCharts options={typeOptions} />
        </div>
        <div className={styles.chart}>
            <AgCharts options={genOptions} />
        </div>
        
        
    </div>
    )
}
