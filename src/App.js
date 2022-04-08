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
    let idTask = new Date().getTime();

    setTasks([
      ...tasks,
      {
        id: idTask,
        task: task.value,
        completed: false
      }

    ]);
    
    localStorage.setItem(toString(idTask), JSON.stringify([
        ...tasks,
        {
          id: idTask,
          task: task.value,
          completed: false
        }
      ]));
    setModal(false);
    //alert(task.value);
  }
  const markCompleted = (id,opt)=>{
    let newTasks = tasks.filter((val)=>{
      if (val.id == id){
        val.completed = opt;
      } 

      return val;
    });

    setTasks(newTasks);
    localStorage.setItem('tasks',JSON.stringify(newTasks));
  }
  const removeTask = (id)=>{
    console.log("A ser removido: " + id);
    
    let removeTask = tasks.filter((val)=>{
      if (val.id == id) {
        console.log(val.id);
      }
      
      localStorage.removeItem(val.id);
      return val.id;
    });
    
    setTasks(removeTask);
  }

  useEffect(()=>{
    if(localStorage.getItem(toString(tasks)) != undefined){
      setTasks(JSON.parse(localStorage.getItem(toString(tasks))));
      console.log(localStorage.getItem(toString(tasks)));
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

                  <p onClick={()=> markCompleted(val.id,false)} className="completed">
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

                  <p onClick={()=> markCompleted(val.id,true)} className='toDo'>
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
