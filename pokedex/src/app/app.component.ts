import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './app.componentMobile.css'],
})
export class AppComponent implements OnInit{

  //INICIALIZAÇÃO DO COMPONENTE
  ngOnInit(): void {
    this.getInfoPokemon();
  }

  //VARIAVEIS
  private _estrela:string = "../assets/star.svg";
  private _mostrarSombraPesquisa:boolean = true;
  private _mostrarSombraAnterior:boolean = true;
  private _mostrarSombraProximo:boolean = true;
  private _inputPesquisa:string = '1';
  private _title = 'pokedex';
  private _id:number = 1;
  private _nomePokemon:string = 'bulbassaur';
  private _pokemonImg:string = '';
  private _pokemonImgShiny:string = '';
  private _shiny:boolean = false;
  private _tempoDeEspera:boolean = true;

  //METÓDOS
  async getInfoPokemon(): Promise<void> {
    if(!this._tempoDeEspera){
      return;
    }
    this._tempoDeEspera = false;
    this._inputPesquisa = this._inputPesquisa.trim().toLowerCase();
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this._inputPesquisa}/`);
    const data = await response.json();
    this._id = data.id;
    this._nomePokemon = data.name;
    this._pokemonImg = data.sprites.front_default;
    this._pokemonImgShiny = data.sprites.front_shiny;
    this._inputPesquisa = '';

    this._mostrarSombraPesquisa = false;

    setTimeout(() => {
      this._mostrarSombraPesquisa = true;
    }, 300);

    setTimeout(() => {
      this._tempoDeEspera = true;
    }, 500);
  }

  trocarEstrela():void{
    if(this._estrela === "../assets/star.svg"){
      this._estrela = "../assets/star-fill.svg"
      this._shiny = true;
    }else if(this._estrela === "../assets/star-fill.svg"){
      this._estrela = "../assets/star.svg";
      this._shiny = false;
    }
  }

  async getProximo(): Promise<void> {
    if(this.id <= 700 && this.tempoDeEspera){
      this._tempoDeEspera = false;
      this._id++;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}/`);
      const data = await response.json();
      this._id = data.id;
      this._nomePokemon = data.name;
      this._pokemonImg = data.sprites.front_default;
      this._pokemonImgShiny = data.sprites.front_shiny;

      this._mostrarSombraProximo = false;

      setTimeout(() => {
        this._mostrarSombraProximo = true;
      }, 300);

      setTimeout(() => {
        this._tempoDeEspera = true;
      }, 500);
    }
  }

  async getAnterior(): Promise<void> {
    if(this.id != 1 && this.tempoDeEspera){
      this.tempoDeEspera = false;
      this._id--;
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this._id}/`);
      const data = await response.json();
      this._id = data.id;
      this._nomePokemon = data.name;
      this._pokemonImg = data.sprites.front_default;

      this._mostrarSombraAnterior = false;

      setTimeout(() => {
        this._mostrarSombraAnterior = true;
      }, 300);

      setTimeout(() => {
        this.tempoDeEspera = true;
      }, 500);
    }
  }


  /*GETTERS E SETTERS*/
  get estrela() {
    return this._estrela;
  }
  
  set estrela(val: string) {
    this._estrela = val;
  }

  get mostrarSombraPesquisa() {
    return this._mostrarSombraPesquisa
  }
  
  set mostrarSombraPesquisa(val: boolean) {
    this._mostrarSombraPesquisa = val
  }
  
  get mostrarSombraAnterior() {
    return this._mostrarSombraAnterior
  }
  
  set mostrarSombraAnterior(val: boolean) {
    this._mostrarSombraAnterior = val
  }
  
  get mostrarSombraProximo() {
    return this._mostrarSombraProximo
  }
  
  set mostrarSombraProximo(val: boolean) {
    this._mostrarSombraProximo = val
  }
  
  get inputPesquisa() {
    return this._inputPesquisa
  }
  
  set inputPesquisa(val: string) {
    this._inputPesquisa = val
  }
  
  get title() {
    return this._title
  }
  
  set title(val: any) {
    this._title = val
  }
  
  get id() {
    return this._id
  }
  
  set id(val: number) {
    this._id = val
  }
  
  get nomePokemon() {
    return this._nomePokemon
  }
  
  set nomePokemon(val: string) {
    this._nomePokemon = val
  }
  
  get pokemonImg() {
    return this._pokemonImg
  }
  
  set pokemonImg(val: string) {
    this._pokemonImg = val
  }

  get pokemonImgShiny() {
    return this._pokemonImgShiny
  }
  
  set pokemonImgShiny(val: string) {
    this._pokemonImgShiny = val
  }

  get shiny() {
    return this._shiny
  }
  
  set shiny(val: boolean) {
    this._shiny = val
  }
  
  get tempoDeEspera() {
    return this._tempoDeEspera
  }
  
  set tempoDeEspera(val: boolean) {
    this._tempoDeEspera = val
  }
}