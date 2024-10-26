"use client";
import axios from "axios";
import { AxiosResponse } from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
const URL:string= process.env.NEXT_PUBLIC_API_KEY || " ";

interface Quiz {
  _id: string;
  name: string;
  status: boolean;
}

export default function Master() {
  const [allQuiz, setAllQuiz] = useState<Quiz[]>([]);

  const [newQuizName, setNewQuizName] = useState<string>("");
  const handleDelete = async (id: string) => {
    try {
      const update = await axios.delete(`https://turboquizapi.onrender.com/quiz/${id}`);
      setAllQuiz(update.data);
    } catch (error) {
      console.error("Error deleteing quiz", error);
    }
  }; 
  const handleAddQuiz = async (e:any) => {
    e.preventDefault()
    const apiUrl = `https://turboquizapi.onrender.com/quiz/create`; 
    console.log("Adding quiz to URL:", apiUrl); 
    if (newQuizName.trim()) {
      try {
        const response = await axios.post(`https://turboquizapi.onrender.com/quiz/create`, {
          name: newQuizName,
          status: true,
        });
        console.log(response.data);
        setAllQuiz(response.data); 
        setNewQuizName("");
      } catch (error) {
        console.error("Error adding quiz", error);
      }
    }
  };
  useEffect(() => {
    async function fetchData() {
      let data: AxiosResponse = await axios.get(`https://turboquizapi.onrender.com/quiz`);
      setAllQuiz(data.data);
    }
    fetchData();
  }, []);
  return (
    <>
      <div className="text-gray-200 p-5 text-3xl flex justify-center font-bold">
        <h1>Hello Master..</h1>
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-600/20 backdrop-blur-xl m-10 p-10 rounded-xl text-gray-200 w-[20rem]">
          <h3 className="text-center font-medium text-xl mb-5">Quiz List</h3>
          {allQuiz.map((quiz, idx) => (
            <Link href={`/master-quiz/${quiz._id}`} key={idx}>
              <div className="p-3 flex justify-between border border-gray-500 px-5 rounded-md cursor-pointer">
                <div className="col-start-2">
                  <p className="text-2xl">{quiz.name}</p>
                </div>
                <div>
                  <button
                    className="border p-2 rounded-lg bg-red-700/45 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(quiz._id);
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            </Link>
          ))}
          <div className="mt-5">
            <input
              type="text"
              value={newQuizName}
              onChange={(e) => setNewQuizName(e.target.value)}
              className="p-2 border rounded-lg w-full mb-2 bg-gray-700"
              placeholder="Enter new quiz name"
            />
            <button
              className="border p-2 rounded-lg bg-green-700/30 text-white w-full"
              onClick={handleAddQuiz}
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
