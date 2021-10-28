import React from 'react'
import Board from "./Board";
import Footer from "./Footer";
import InputBar from "./InputBar";

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      todoList: [],
      mode: 'All',
      activeNum: 0,
      isAllCompleted: false
    } 
  }

  // 挂载时加载localStorage中的todoList
  componentDidMount() {
    let todoList = localStorage.getItem('todoList');
    if(todoList){
      todoList = JSON.parse(todoList);
      if(todoList){
        this.setState({todoList});
      }else{
        this.setState({todoList: []});
      }
    }else{
      localStorage.setItem('todoList', 'null');
    }
  }
  

  // 添加todo项目
  handleAdd = (item) => {
    let todoList = [...this.state.todoList];
    todoList.unshift(item);
    this.setState({todoList});
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  // 点击todo，修改completed状态
  handleCompleteClick = (targetId) => {
    let todoList = this.state.todoList.map((item)=>{
      if(item.id === targetId){
        item.completed = !item.completed;
      }
      return item;
    })
    let activeNum = this.state.activeNum + 1;
    this.setState({todoList, activeNum});
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  // 清空已完成todo
  handleClearClick = () => {
    let todoList = [...this.state.todoList];
    todoList = todoList.filter((item)=>!item.completed)
    this.setState({todoList});
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }

  // 切换筛选模式
  handleModeChange = (mode) => {
    this.setState({mode});
  }

  // 全选/取消全选
  handleSelectAll = () => {
    let todoList = [...this.state.todoList];
    let isAllCompleted = this.state.isAllCompleted;

    // 全部修改成已完成
    if(!isAllCompleted){
      todoList = todoList.map(item=>{
        item.completed = true;
        return item;
      });
      this.setState({todoList, isAllCompleted:true});
      localStorage.setItem('todoList', JSON.stringify(todoList));
    // 全部修改为未完成
    }else{
      todoList = todoList.map(item=>{
        item.completed = false;
        return item;
      });
      this.setState({todoList, isAllCompleted:false});
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
    
  }

  render(){
    let todoList = this.state.todoList;
    return (
      <div>
        <InputBar 
          handleAdd={this.handleAdd}
          isAllCompleted={this.state.isAllCompleted}
          handleSelectAll={this.handleSelectAll}/>
        <Board 
          todoList={todoList} 
          mode = {this.state.mode}
          handleCompleteClick={this.handleCompleteClick}></Board>
        <Footer 
          todoList={todoList}
          activeNum={this.state.activeNum} 
          handleClearClick={this.handleClearClick}
          handleModeChange={this.handleModeChange}></Footer>
      </div>
    );
  }
}

export default App;
