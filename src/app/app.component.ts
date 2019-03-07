import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { cityData } from './model/todoufuken';
import { RequestService } from './service/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  kens: cityData[];
  chart: Chart;

  constructor(private requestService: RequestService) { }

  ngOnInit() {
    this.init();
    this.requestService.getTodoufukenJSON()
      .subscribe(response => {
        // console.log(response);
        this.kens = response.result;
      });
  }

  valChange(event: any, ken: cityData) {
    if (event.target.checked) {
      this.addCity(ken);
    } else {
      this.removeCity(ken);
    }
    // console.log(ken);
    // console.log("change!");
  }

  addCity(ken: cityData) {
    this.requestService.getPopulationJSON(ken.prefCode)
      .subscribe(response => {
        let totalData = [];
        for (let yearData of response.result.data[0].data) {
          const data = [];
          data.push(yearData.year);
          data.push(yearData.value);
          totalData.push(data);
        }
        // console.log(totalData);
        const cityPopulation = {
          prefCode: ken.prefCode,
          name: ken.prefName,
          data: totalData
        };
        let findCount = 0;
        for (const data of this.chart.ref.series) {
          if (data.name === cityPopulation.name) {
            findCount++;
          }
        }
        if (findCount === 0) {
          this.chart.addSerie(cityPopulation);
        }
        // console.log(cityPopulation);
        // console.log(this.chart.ref.series);
      });

  }

  removeCity(ken: cityData) {
    const series = this.chart.ref.series;
    // console.log('removeCity');
    // console.log(series);
    for (let serie of series) {
      // console.log(serie.name);
      if (ken.prefName === serie.name) {
        this.chart.removeSerie(serie.index);
      }
    }
  }

  init() {
    let chart = new Chart({
      chart: {
        type: 'line'
      },
      xAxis: {
        title: { text: '年度' }
      },
      yAxis: {
        title: { text: '人口数' }
      },
      title: {
        text: '日本都道府県人口数変遷'
      },
      credits: {
        enabled: false
      },
      series: []
    });
    this.chart = chart;
  }
}
