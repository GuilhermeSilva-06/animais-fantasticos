import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  //cria a div contendo informações
  //com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  //preenche cada animal no DOM
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  //Anima os Numeros de cada animals
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    AnimaNumeros.init();
  }

  //puxa os animais através de um arquivo json
  //e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      //Fetch, espera a resposta e tranforma em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      //Após a tranformação de json, ativa as funções
      //para preencher e animar os numeros
      animaisJSON.forEach((animal) => preencherAnimais(animal));
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
