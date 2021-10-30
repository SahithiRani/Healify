import React, { useState } from "react";
import EditTask from "../modals/EditTask";
import ConfirmDialog from "./ConfirmDialog";
import CreateTask from "../modals/CreateTask";
import styles from "./MilestonesHome.module.css";
import {Progressbar } from "./Progressbar";
const Card = ({ _id, taskObj, index, deleteTask, updateTask }) => {

    const [selected,setSelected] =useState(0);

  const { title, description, targetDate } = taskObj;
  const [modal, setModal] = useState(false);
   const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
  const colors = [
    {
      primaryColor: "#FF0000",
      secondaryColor:"#FF0000",
    },
    {
      primaryColor: "#008000",
      secondaryColor: "#008000",
    },
    {
      primaryColor: "#FFA500",
      secondaryColor: "#FFA500",
    },
    
  ];

  const toggle = () => {
    setModal(!modal);
  };

  const handleDelete = () => {
     setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
    deleteTask(index);
    
  };
  const saveTask = () => {
    setModal(false);
    updateTask();
  };
  return (
    <div className={styles["card-wrapper"] + " mr-2"}>
      <div
        className={styles["card-top"]}
        style={{ "background-color": colors[selected].primaryColor }}
      ></div>
      < div className={styles["task-holder"]}>
        <span
          className={styles["card-header"]}
          style={{
            "background-color": colors[selected].secondaryColor,
            "border-radius": "15px",
            color:"white"
          }}
        >
          {title}
        
          
        </span>
        <h6 className="mt-1">{targetDate}</h6>
        <p className="mt-2">{description}</p>
        <br />
        <div style={{ position: "absolute", right: "20px", bottom: "10px" }}>
          <i
            class="far fa-edit  "
            style={{ color: colors[selected].primaryColor, cursor: "pointer" }}
            onClick={() => setModal(true)}
          ></i>
        </div>
         
        <div style={{ position: "absolute", right: "50px", bottom: "10px" }}>
          <i
            class="fas fa-trash-alt"
            style={{ color: colors[selected].primaryColor, cursor: "pointer" }}
            /*{onClick={handleDelete}}*/
             onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this task?',
                                                    subTitle: "You can't undo this operation",
                                                    onConfirm: ()=> {
                                                      handleDelete()
                                                    }
                                                })
                                            }}
          ></i>
        </div>
            
       
        <EditTask
          _id={_id}
          modal={modal}
          toggle={toggle}
          taskObj={taskObj}
          save={saveTask}
          selected={selected}
          setSelected={setSelected}
        />
           
      </div>
            
      <ConfirmDialog
      confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
      />

    </div>
    
  );
};
export default Card;
