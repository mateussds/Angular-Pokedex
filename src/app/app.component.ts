import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  pokemons = [];
  previous = null;
  next = null;
  offset = 0;
  totalPokemons = 0;
  limit = 20;
  paginaAtual = 1;
  habilidades = ' ';
  estatisticas = ' ';
  tipos = ' ';
  imagens = ' ';
  alturaPeso = ' ';
  pokemonCLicado = '';
  dadosPokemon = 0;

  constructor() {
    this.buscarPokemon();
  }

  buscarPokemon = async function () {
    this.offset = (this.paginaAtual - 1) * this.limit;
    let response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?offset=' +
        this.offset +
        '&limit=' +
        this.limit
    );
    let dados = await response.json();
    this.next = dados.next;
    this.previous = dados.previous;
    this.totalPokemons = dados.count;
    this.pokemons = dados.results;
  };

  passarPagina() {
    if (this.paginaAtual <= this.totalPokemons - 1) {
      this.paginaAtual++;
      this.buscarPokemon();
    }
    this.limparDados();
  }

  voltarPagina() {
    if (this.paginaAtual >= 2) {
      this.paginaAtual--;
      this.buscarPokemon();
    }
    this.limparDados();
  }

  definirLimite($event) {
    // limit = slcLimites.options[slcLimites.selectedIndex].value;
    this.limit = $event.target.value;
    this.paginaAtual = 1;
    this.buscarPokemon();
  }

  get totalPaginas(): number {
    return Math.round(this.totalPokemons / this.limit);
  }

  async acessarPokemon(pokemon) {
   
    this.limparDados();

    let response = await fetch(pokemon.url);
    let dados = await response.json(); 
    this.pokemonCLicado = pokemon.name;
    console.log(this.pokemonCLicado);

    dados.abilities.forEach((habilidade) => {
      this.habilidades += habilidade.ability['name'] + '//'; //habilidades
    });
    dados.stats.forEach((estatistica) => {
      this.estatisticas +=
        estatistica.stat['name'] + '= ' + estatistica['base_stat'] + ', ';
    });
    dados.types.forEach((tipo) => {
      this.tipos += tipo.type['name'] + ', '; //Tipos
    });
    this.imagens = dados.sprites.front_default; //Imagens
    this.alturaPeso =
      'Altura: ' + dados.height + ',' + ' ' + 'Peso: ' + dados.weight; //Altura e peso

    /* nomePokemon.textContent = "Nome: " + pokemonCLicado; //Exibição na tela
    imgPokemon.setAttribute("src", imagens);
    imgPokemon.setAttribute("alt", pokemonCLicado);
    atributosPokemon.textContent = "Atributos: " + estatisticas;
    caracteristicasPokemon.textContent = "Caracteristicas:  " + tipos;
    AlturaPesoPokemon.textContent = alturaPeso;*/
  }

  limparDados (){
    this.pokemonCLicado = '';
    this.imagens = ' ';
    this.estatisticas = ' ';
    this.tipos = ' ';
    this.alturaPeso = ' ';
  }
}
