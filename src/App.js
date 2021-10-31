import React from 'react'
import Board from "./Board";
import Footer from "./Footer";
import InputBar from "./InputBar";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      todos: {
        allTodos:[],
        activeTodos:[],
        completedTodos:[]
      },
      cache: [],
      mode: 'All'
    } 
  }

  // 挂载时初始化状态
  componentDidMount() {
    
    // 首次运行，添加item项到本地存储
    if(localStorage.getItem('todos') === null){
      let todos = {
        allTodos:[],
        activeTodos:[],
        completedTodos:[]
      };
      localStorage.setItem('todos', JSON.stringify(todos));
    }
    if(localStorage.getItem('cache') === null){
      localStorage.setItem('cache', '[]');
    }
    let todos = JSON.parse(localStorage.getItem('todos'));
    let cache = JSON.parse(localStorage.getItem('cache'));
    this.setState({todos, cache});
  }
  

  // 添加todo项目
  handleAdd = (item) => {
    let {allTodos, activeTodos, completedTodos} = this.state.todos;
    allTodos.unshift(item);
    activeTodos.unshift(item);
    let todos = {
      allTodos,
      activeTodos,
      completedTodos
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState({
      todos
    });
    
  }

  // 点击todo，修改completed状态
  handleCompleteClick = (targetId) => {
    let {allTodos, activeTodos, completedTodos} = this.state.todos;

    allTodos = allTodos.map(item => {
      if(item.id === targetId){
        item.completed = !item.completed;
      }
      return item;
    })

    activeTodos = allTodos.filter(item => {
      return !item.completed;
    })

    completedTodos = allTodos.filter(item => {
      return item.completed;
    })
    let todos = {
      allTodos,
      activeTodos,
      completedTodos
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState({
      todos
    })
  }

  // 清空已完成todo
  handleClearClick = () => {
    let {allTodos, activeTodos} = this.state.todos;

    allTodos = allTodos.filter(item => {
      return item.completed === false
    })

    let todos = {
      allTodos,
      activeTodos,
      completedTodos: []
    }

    localStorage.setItem('todos', JSON.stringify(todos));

    this.setState({
      todos
    });
  }

  // 切换筛选模式
  handleModeChange = (mode) => {
    this.setState({mode});
  }

  // 全选/取消全选
  handleSelectAll = () => {
    let {allTodos, completedTodos} = this.state.todos;
    // 全部修改成未完成
    if(allTodos.length === completedTodos.length){
      allTodos = allTodos.map(item => {
        item.completed = false;
        return item;
      })

      let todos = {
        allTodos,
        activeTodos: allTodos,
        completedTodos: []
      };

      localStorage.setItem('todos', JSON.stringify(todos));
      this.setState({todos})
    // 全部修改为已完成
    }else{
      allTodos = allTodos.map(item => {
        item.completed = true;
        return item;
      })
      let todos = {
        allTodos,
        activeTodos: [],
        completedTodos: allTodos
      };
      localStorage.setItem('todos', JSON.stringify(todos));
      this.setState({todos});
    } 
  }

  // 单行编辑
  handleEdit = (id, content) => {
    let {allTodos, activeTodos, completedTodos} = this.state.todos;
    allTodos = allTodos.map(item => {
      if(item.id === id){
        item.content = content;
      }
      return item;
    })
    activeTodos = activeTodos.map(item => {
      if(item.id === id){
        item.content = content;
      }
      return item;
    })
    completedTodos = completedTodos.map(item => {
      if(item.id === id){
        item.content = content;
      }
      return item;
    })
    let todos = {
      allTodos,
      activeTodos,
      completedTodos
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    this.setState({
      todos
    })
  }

  // Undo操作
  handleUndo = () => {
    let {allTodos, activeTodos, completedTodos} = this.state.todos;
    let {cache} = this.state;
    let undoItem = activeTodos.shift();
    allTodos = allTodos.filter(item => item.id !== undoItem.id);
    cache.unshift(undoItem);
    let todos = {
      allTodos,
      activeTodos,
      completedTodos
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('cache', JSON.stringify(cache));
    this.setState({
      todos,
      cache
    })
  }

  // Redo操作
  handleRedo = () => {
    let {allTodos, activeTodos, completedTodos} = this.state.todos;
    let {cache} = this.state;
    let redoItem = cache.shift();
    activeTodos.unshift(redoItem);
    allTodos.unshift(redoItem);
    let todos = {
      allTodos,
      activeTodos,
      completedTodos
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('cache', JSON.stringify(cache));
    this.setState({
      todos,
      cache
    })
  }

  render(){
    let {allTodos, completedTodos} = this.state.todos;
    let {mode} = this.state;
    return (
      <div>
        <InputBar 
          handleAdd={this.handleAdd}
          isAllCompleted={allTodos.length>0 && allTodos.length === completedTodos.length}
          handleSelectAll={this.handleSelectAll}/>
        <Board 
          todos={this.state.todos} 
          mode={mode}
          handleEdit={this.handleEdit}
          handleCompleteClick={this.handleCompleteClick}></Board>
        <Footer 
          todos={this.state.todos}
          mode={mode}
          cache={this.state.cache}
          handleUndo={this.handleUndo}
          handleRedo={this.handleRedo}
          handleClearClick={this.handleClearClick}
          handleModeChange={this.handleModeChange}></Footer>
      </div>
    );
  }
}

export default App;
