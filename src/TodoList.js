import React, { Component } from 'react';
import TagManager from 'react-gtm-module'

class TodoList extends Component {
  constructor(props) {
    super(props);
      //atualização do customData
      window.customData.page = { name: 'Lista de Tarefas', }
      /*Exemplo de execução de um "push" disparado após na construção do componente de tela*/
      TagManager.dataLayer({
        dataLayer: { 
          event: 'step_change', 
          etapa: '/home/lista-de-tarefas/'
        }
      })
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form data-gtm-type="form" data-gtm-name="formulario de adicionar tarefas" onSubmit={this.props.addItem}>
            <input 
              data-gtm-form="input"
              data-gtm-name="nome da tarefa"
              placeholder="Tarefa"
              ref={this.props.inputElement}
              value={this.props.currentItem.text}
              onChange={this.props.handleInput}
            />
            <button data-gtm-form="submit" data-gtm-name="add task" type="submit"> Add Tarefa </button>
          </form>
        </div>
      </div>
    )
  }
}
export default TodoList