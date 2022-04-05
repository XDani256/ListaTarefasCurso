import {useState, useEffect} from 'react';
import './App.css';

function App() {

  const [tasks,setTasks] = useState([
    /*{
      id:0,
      task:'lavar a louça',
      completed:false
    },
    {
      id:0,
      task:'pular 10 min de corda',
      completed:true
    }*/
  ]);
  const [modal, setModal] = useState(false);

  const openModal = () =>{
    setModal(!modal);
  }
  const saveTask = ()=>{
    // TODO: Salvar a tarefa
    let task = document.getElementById('contentTask');
    
    setTasks([
      ...tasks,
      {
        id: new Date().getTime(),
        task: task.value,
        completed: false
      }

    ]);
    
    localStorage.setItem('tasks', JSON.stringify([
        ...tasks,
        {
          id: new Date().getTime(),
          task: task.value,
          completed: false
        }
      ]));
    setModal(false);
    //alert(task.value);
  }
  const markCompleted = (id)=>{
    let newTasks = tasks.filter((val)=>{
      if (val.id == id){
        val.completed = true;
      } 

      return val;
    });

    setTasks(newTasks);
    localStorage.setItem('tasks',JSON.stringify(newTasks));
  }
  const unmarkCompleted = (id)=>{
    let newTasks = tasks.filter((val)=>{
      if (val.id == id){
        val.completed = false;
      } 

      return val;
    });

    setTasks(newTasks);
  }
  const removeTask = (id)=>{
    let removeTask = tasks.filter((val)=>{
      if (val.id == id){
        return localStorage.removeItem(id);
      }
    });
    
    setTasks(removeTask);
  }

  useEffect(()=>{
    if(localStorage.getItem('tasks') != undefined){
      setTasks(JSON.parse(localStorage.getItem('tasks')));
      console.log(localStorage.getItem('tasks'));
    }
  },[])

  /* TODO: */ 

  return (
    <div className="App">
      {
        modal?
        <div className='modal'>
          <div className='modalContent'>
            <p href='/' className="modalClose" onClick={() => openModal()}>x</p>
            <h3>Adicionar sua Tarefa</h3>
            <input id='contentTask' type='text'/>
            <button onClick={()=>saveTask()}>Salvar</button>
          </div>
        </div>
        :
        <div></div>
      }
      <div onClick={()=> openModal()} className='addTask'>+</div>
      <div className='boxTasks'>
        <h2>Minhas tarefas do Dia!</h2>
        {
          tasks.map((val)=>{
            if(val.completed){
              return(
                
                // * <p onClick={()=> unmarkCompleted(val.id)} className="completed">{val.task} </p>
                
                <div 
                  className='boxSingleTask' 
                  id={val.id} >

                  <p onClick={()=> unmarkCompleted(val.id)} className="completed">
                    {val.task}
                  </p>
                  <button onClick={()=>{removeTask(val.id)}}>X</button>
                </div>
              );
            }else{
              return(

                // * <p onClick={()=> markCompleted(val.id)} className='toDo'>{val.task}</p>
                <div 
                  className='boxSingleTask' 
                  id={val.id}
                >

                  <p onClick={()=> markCompleted(val.id)} className='toDo'>
                    {val.task}
                  </p>
                  <button onClick={()=>removeTask(val.id)}>X</button>
                </div>
              );
            }
          })
        }
      </div>
    </div>
  );
}

export default App;
