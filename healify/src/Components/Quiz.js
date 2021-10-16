import React, { Component } from "react";
import logo from "../Assets/mentalhealth_icon_round.png";
import styles from "./Quiz.module.css";
import styles2 from "./Home.module.css";
import SpecificQuestion from "./Quiz/Question";
import { useState, useEffect } from "react";
import { Score } from "./Quiz/Score";

export const Quiz = (props) => {
  const Questions = props.questions;
  const [option, setOption] = useState(0);
  const [score, setScore] = useState(0);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOption(value);
    console.log(option);
    setScore(() => score + parseInt(value));
  };
  //Counter for Number of Questions
  const [counter, setCounter] = useState(1);
  const [questionSet, setQuestionSet] = useState(Questions);
  const [que, setQue] = useState(Questions[0]);

  const newQue = () => {
    setCounter(() => counter + 1);

    // counter will be updated
    const newQuestionSet = questionSet.filter((qn) => que.id !== qn.id);
    setQuestionSet(newQuestionSet);
    // state -> we expect it to be updated but its not
    let rand1 = Math.floor(Math.random() * newQuestionSet.length);
    setQue(newQuestionSet[rand1] || Questions[0]);
  };

  return (
    <>
      {counter <= 5 ? (
        <>
          <header className={styles2.header}>
            <div className={styles2.threeLineBtn}>
              <ul className={styles2.menuBtnCustom}>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
            <img className={styles2.logo} src={logo} />
            <div>
              <h1 className={styles2.heading}>Healify</h1>
            </div>
            <ul className={"nav " + styles2.settingsList}>
              <li className={"nav-link"}>About</li>
              <li className={"nav-link"}>Contact Us</li>
              <li className={"nav-link"}>Profile</li>
              <li className={styles2.navLoginBtn} id={styles2.idLoginBtn}>
                Login
              </li>
              <li className={styles2.navLoginBtn} id={styles2.navSignUp}>
                Sign Up
              </li>
            </ul>
          </header>
          <div className={styles.quizBody}>
            <div className={styles.quizcontainer}>
              <div>
                <form action="" className={styles.quizForm}>
                  <SpecificQuestion
                    qnObject={que}
                    onChangeHandle={handleChange}
                  />
                </form>
              </div>
              <button className={styles.playBtn} onClick={newQue}>
                Next
              </button>
            </div>
          </div>
        </>
      ) : (
        <Score score={score} />
      )}
    </>
  );
};
