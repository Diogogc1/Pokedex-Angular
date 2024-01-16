import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.getInfoPokemon();
  }
  mostrarSombraPesquisa:boolean = true;
  mostrarSombraAnterior:boolean = true;
  mostrarSombraProximo:boolean = true;
  inputPesquisa:string = '1';
  title = 'pokedex';
  id:number = 1;
  nomePokemon:string = 'bulbassaur';
  pokemonImg:string = '';
  
  async getInfoPokemon(): Promise<void> {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.inputPesquisa}/`);
    const data = await response.json();
    this.id = data.id;
    this.nomePokemon = data.name;
    this.pokemonImg = data.sprites.front_default;
    this.inputPesquisa = '';

    this.mostrarSombraPesquisa = false;

    setTimeout(() => {
      this.mostrarSombraPesquisa = true;
    }, 300);
  }

  async getProximo(): Promise<void> {
    if(this.id != 150){
      this.id++;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}/`);
    const data = await response.json();
    this.id = data.id;
    this.nomePokemon = data.name;
    this.pokemonImg = data.sprites.front_default;

    this.mostrarSombraProximo = false;

    setTimeout(() => {
      this.mostrarSombraProximo = true;
    }, 300);
  }

  async getAnterior(): Promise<void> {
    if(this.id != 1){
      this.id--;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}/`);
    const data = await response.json();
    this.id = data.id;
    this.nomePokemon = data.name;
    this.pokemonImg = data.sprites.front_default;

    this.mostrarSombraAnterior = false;

    setTimeout(() => {
      this.mostrarSombraAnterior = true;
    }, 300);
  }
}