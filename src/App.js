import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './TodoList.js';
import TodoItems from './TodoItems.js';

/*
import do módulo do react-gtm
https://www.npmjs.com/package/react-gtm-module
*/
import TagManager from 'react-gtm-module';

/*
Inicializando o Tag Manager com o ID correspondente que pode ser encontrado no Guia de Estruturação
https://docs.google.com/document/d/1hNUDVxbW0-x1WstAEwwlzqjn2y9eekQAlUyiOuMWKXI/edit#heading=h.5hsjwnb34sb4
*/

TagManager.initialize({gtmId: 'GTM-NQS6F9X'});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {text:'', key:''},
    }
    
    //carregamento do customData
    window.customData = {
      'site': {
        'portal': 'portoeduc'
      },
      'user': this.getUser()
    }
  }

  handleInput = e => {
    const itemText = e.target.value
    const currentItem = { text: itemText, key: Date.now() }
    this.setState({
      currentItem,
    })
  }

  addItem = e => {
    e.preventDefault()
    let status = false;
    let descricao = 'Item cadastrado com sucesso';
    const newItem = this.state.currentItem
    
    if (newItem.text !== '') {
      status = true;
      descricao = 'Necessário preencher o campo';
      console.log(newItem)
      const items = [...this.state.items, newItem]
      this.setState({
        items: items,
        currentItem: { text: '', key: '' },
      })
    }

    /*Exemplo de execução de um "push" disparado após o retorno do serviço cadastro de um item*/
    
    TagManager.dataLayer({
      dataLayer: { 
        event: 'cadastrar-item',
        id: newItem.key,
        name: newItem.text,
        status,
        descricao,
      }
    })
  }

  deleteItem = key => {
    let status = false;
    let descricao = 'Erro ao remover item';
    let aux = {};
    const filteredItems = this.state.items.filter(item => {
      status = true;
      aux = item;
      descricao = 'Item removido com sucesso';
      return item.key !== key
    })

    /*Exemplo de execução de um "push" disparado após o retorno do serviço de remoção de um item*/

    TagManager.dataLayer({
      dataLayer: { 
        event: 'remover-item',
        id: aux.key || '',
        name: aux.text || '',
        status,
        descricao,
      }
    })

    this.setState({
      items: filteredItems,
    })
  }

  getUser() {
    return {
      id: '123',
      numero: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // cpf criptografado em sha256
      perfil: 'user', 
      logado: 'false', 
      tarefas-criadas: '10'
    }
  }

  render() {
    return (
      <div className="App">
        <TodoList
          addItem={this.addItem}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentItem={this.state.currentItem} />

        <TodoItems entries={this.state.items} deleteItem={this.deleteItem}/>
      </div>
    );
  }
}

export default App;
