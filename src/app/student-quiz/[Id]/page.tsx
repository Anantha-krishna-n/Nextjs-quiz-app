"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { AxiosResponse } from "axios"
import { useParams } from "next/navigation"


interface Quiz{
    _id:string;
    quiz_id:string;
    question:string;
    options:string[];
    correct_option:string
}

export default function Quiz(){
    const { Id } = useParams();

const [allQuestions,setAllQuestions]=useState<Quiz[]>([])
const [activeQuestion,setActiveQuestion]=useState(0)
const [selectedAnswer,setSelectedAnswer]=useState(false)
const [selectedAnswerIndex,setSelectedAnswerIndex]=useState<Number |null>(null) 
const [checked,setChecked]=useState(false)
const [showResult, setShowResult] = useState(false)
const [loading, setLoading] = useState(true)
const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })
useEffect(()=>{
    async function fetchData(){
        try{
            let data : AxiosResponse=await axios.get(`https://turboquizapi.onrender.com/quiz/${Id}`)
            setAllQuestions(data.data.questions)
        }catch(error){
            console.error("error gettting data ")
        }finally{
            setLoading(false)
        }
    }
    fetchData()
},[Id])  
const {question, options, correct_option} = allQuestions[activeQuestion] || {}
const onAnswerSelected = (ans: string, idx: number) => {
    setChecked(true)
    setSelectedAnswerIndex(idx)
    if (ans === correct_option) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  // const nextQuestion = () => {

  //   setSelectedAnswerIndex(null)
  //   setResult((prev) =>
  //     selectedAnswer
  //       ? {
  //           ...prev,
  //           score: prev.score + 1,
  //           correctAnswers: prev.correctAnswers + 1,
  //         }
  //       : {
  //           ...prev,
  //           wrongAnswers: prev.wrongAnswers + 1,
  //         }
  //   )
  //   if (activeQuestion !== allQuestions.length - 1) {
  //     setActiveQuestion((prev) => prev + 1)
  //   } else {
  //     setActiveQuestion(0)
  //     setShowResult(true)
  //   }
  //   setChecked(false)
  // }
  const nextQuestion = () => {
   
    const isAnswerCorrect = options[selectedAnswerIndex as number] === correct_option;
    setResult((prev) =>
      isAnswerCorrect
        ? {
            ...prev,
            score: prev.score + 1,
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
  
    if (activeQuestion !== allQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
    setSelectedAnswerIndex(null);
  };
  
    return(
        <>
        {!showResult ? (
          <>
            <div className="flex justify-center mt-20 text-gray-200">
              <h1 className="text-4xl">Let&apos;s Start the Quiz!</h1>
            </div>
            <div className="text-center mt-7 text-gray-200">
              <h2>
                Question: {activeQuestion + 1}
                <span>/ {allQuestions.length}</span>
              </h2>
            </div>
          </>
        ) : (
          <div className="flex justify-center mt-20 text-gray-200">
            <h1 className="text-4xl">Well Done! Here Are Your Results</h1>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center">
            <div className="h-full bg-gray-600/20 backdrop-blur-xl md:w-1/2 rounded-lg shadow-xl  p-10 ">
              <div className="flex animate-pulse justify-center">
                <h2 className="w-36 text-center bg-gray-300/20 h-6 rounded-md "></h2>
              </div>
              <div className=" md:flex mt-5 md:flex-wrap animate-pulse flex-wrap">
                <button className="border  bg-gray-600/20 h-10  rounded-sm text-center w-full  md:w-1/2"></button>
                <button className="border  bg-gray-600/20  h-10 rounded-sm text-center w-full md:w-1/2"></button>
                <button className="border  bg-gray-600/20 h-10 rounded-sm text-center w-full md:w-1/2"></button>
                <button className="border  bg-gray-600/20 h-10 rounded-sm text-center w-full md:m-0 md:w-1/2"></button>
              </div>
              <div className="flex mt-5 animate-pulse justify-center ">
                <button className="border w-16 bg-gray-600/45 h-10   rounded-sm"></button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {!showResult ? (
              <div className="flex justify-center">
                <div className="h-full  md:w-1/2 rounded-lg shadow-xl bg-gray-600/45 backdrop-blur-xl p-10 ">
                  <h1 className="text-center text-gray-200">{question}</h1>
                  <div className="h-24 md:flex mt-5 md:flex-wrap w-full justify-center">
                    {options &&
                      options.map((ans, idx) => {
                        return (
                          <button
                            onClick={() => onAnswerSelected(ans, idx)}
                            className={`border text-gray-200 ${
                              selectedAnswerIndex === idx
                                ? "bg-slate-500 bg-gray-600/60"
                                : ""
                            } hover:bg-slate-600 hover:text-black rounded-sm text-center w-full m-1 md:m-0 md:w-1/2`}
                            key={idx}
                          >
                            {ans}
                          </button>
                        )
                      })}
                  </div>
                  <div className="flex justify-center ">
                    {checked ? (
                      <button
                        onClick={() => nextQuestion()}
                        className="border p-2 md:mt-4 mt-16 rounded-md bg-blue-700 hover:bg-blue-400a"
                      >
                        {activeQuestion === allQuestions.length - 1
                          ? "FINISH"
                          : "NEXT"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="border p-2 md:mt-4 mt-16  rounded-md bg-gray-400 hover:bg-blue-400a"
                      >
                        {activeQuestion === allQuestions.length - 1
                          ? "FINISH"
                          : "NEXT"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center ">
                <div className=" bg-gray-600/45 text-center items-center backdrop-blur-xl md:m-10 m-0 p-10 w-full md:w-1/2  rounded-xl text-white">
                  <h3>Overall {(result.score / allQuestions.length) * 100}%</h3>
                  <p>
                    Total questions : <span>{allQuestions.length}</span>
                  </p>
                  <p>
                    Total Score : <span>{result.score}</span>
                  </p>
                  <p>
                    Correct Answers : <span>{result.correctAnswers}</span>
                  </p>
                  <p>
                    Wrong Answers : <span>{result.wrongAnswers}</span>
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="border text-white p-2 mt-4 rounded-md bg-blue-700 hover:bg-blue-400a"
                  >
                    Restart
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    )
}

