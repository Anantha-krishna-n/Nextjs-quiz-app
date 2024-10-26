"use client"
import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import {FaAnglesRight} from "react-icons/fa6"


interface Quiz{
  _id:string;
  name:string;
  status:boolean;
  createAt:string;
  updatedAt:string;
  _v:number
}

export default function Student(){
  const [quizlist,setQuizlist]=useState<Quiz[]>([])
useEffect(()=>{
  const fetchData=async ()=>{
    try{
const response=await axios.get<Quiz[]>("https://turboquizapi.onrender.com/quiz")
setQuizlist(response.data)
    }catch(error){
      console.error("error from student getting data..")
    }
  }
  fetchData()
},[])

    return (
      <main>
      <div>
        <div className="w-screen pt-10 items-center flex justify-center">
          <h1 className="text-7xl text-gray-200">Quiz List </h1>
        </div>
        <div className="w-screen pt-10 items-center flex justify-center ">
          <div className="border border-gray-100 w-[25rem] h-[20rem] rounded-[6px] overflow-y-auto p-3  ">
           
            <ul>
              {quizlist.map((quiz, index) => (
                <Link href={`/student-quiz/${quiz._id}`}  key={index} >
                  <div
                    key={index}
                    className=" flex justify-between w-[90%] h-14 text-2xl text-gray-300 capitalize p-2 bg-gray-600/70 rounded-sm border m-4 border-gray-400 cursor-pointer hover:outline-none hover::bg-gray-100"
                  >
                    {quiz.name}{" "}
                    <span className="pt-[.3rem]">
                      <FaAnglesRight />
                    </span>
                  </div>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>

    )
}