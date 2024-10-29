import { Component, OnInit } from '@angular/core';
import { ConversorService } from 'src/app/services/conversor.service';

@Component({
  selector: 'app-cambio-conversor',
  templateUrl: './cambio-conversor.page.html',
  styleUrls: ['./cambio-conversor.page.scss'],
})
export class CambioConversorPage implements OnInit {
  public imagemCambio = 'assets/icone-cambio.svg';

  rates: any = {};
  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  resultado: number = 0;

  constructor(private conversorService: ConversorService) {}

  ngOnInit() {
    this.loadExchangeRates();
  }

  loadExchangeRates() {
    this.conversorService.getExchangeRates().subscribe({
      next: (data) => {
        this.rates = {
          BRL: 1,
          USD: data.USDBRL.ask,
          EUR: data.EURBRL.ask,
          ARS: data.ARSBRL.ask,
          GBP: data.GBPBRL.ask,
          CNY: data.CNYBRL.ask,
        };
      },
      error: (error) => {
        console.error('Erro ao obter taxas de câmbio:', error);
      },
    });
  }

  converterMoeda() {
    if (this.valor < 0) {
      alert('Digite um valor positivo!');
      return;
    }

    if (this.moedaOrigem && this.moedaDestino && this.valor) {
      const valorEmReais = this.valor * this.rates[this.moedaOrigem];
      this.resultado = valorEmReais / this.rates[this.moedaDestino];
    } else {
      this.resultado = 0;
    }
  }

  trocarMoedas() {
    const temp = this.moedaOrigem;
    this.moedaOrigem = this.moedaDestino;
    this.moedaDestino = temp;

    this.converterMoeda();
  }
}
