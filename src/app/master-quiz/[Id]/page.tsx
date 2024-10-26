  "use client";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { AxiosResponse } from "axios";
  import { MdDelete } from "react-icons/md";
  import { useParams } from "next/navigation";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  const URL: string = process.env.NEXT_PUBLIC_API_KEY || " ";

  interface Quiz {
    _id: string;
    quiz_id: string;
    question: string;
    options: string[];
    correct_option: string;
  }

  export default function Quizedit() {
    const { Id } = useParams();
    const [allQuestions, setallQuestions] = useState<Quiz[]>([]);
    const [question, setQuestion] = useState<string>("");
    const [option1, setOption1] = useState<string>("");
    const [option2, setOption2] = useState<string>("");
    const [option3, setOption3] = useState<string>("");
    const [option4, setOption4] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [addUser, setAddUser] = useState(false);

    const QUESTION_LIMIT = 4;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (allQuestions.length >= QUESTION_LIMIT) {
        alert("You cannot add more than 4 questions.");
        return;
      }
      try {
          console.log(        {
              question: question,
              options: [option1, option2, option3, option4],
              correct_option: answer,
            });
          
        const update = await axios.post(
          `https://turboquizapi.onrender.com/quiz/${Id}/questions`,
          {
            question: question,
            options: [option1, option2, option3, option4],
            correct_option: answer,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(update, "dat");
        console.log(update.data, "hah");
        setallQuestions(update.data);
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        toast.success("Question added successfully!");
      } catch (error) {
        console.error(error);
      }
    };
    const handleDelete = async (id: string) => {
      try {
        const update = await axios.delete(`https://turboquizapi.onrender.com/quiz/${Id}/${id}`);
        setallQuestions(update.data);
        toast.success("Question deleted successfully!", {
          style: {
            backgroundColor: 'red', 
            color: 'Black' 
          }
        });
      } catch (error) {
        console.error("Error in deleteing", error);
      }
    };
    useEffect(() => {
      async function fetchData() {
        try {
          const data: AxiosResponse = await axios.get(`https://turboquizapi.onrender.com/quiz/${Id}`);
          setallQuestions(data.data.questions);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      fetchData();
    }, [Id]);
    return (
      <>
        <div className="p-5 text-3xl flex justify-center font-bold">
          <h1 className="text-gray-200">Quiz Master Page..</h1>
        </div>
        <ToastContainer />
        <div className="flex justify-center">
          <div className="bg-gray-600/20 backdrop-blur-xl m-10 p-10 rounded-xl text-gray-200 w-[40rem] h-[25rem] custom-scrollbar overflow-y-auto">
            <h3 className="text-center font-medium text-xl">Current Questions</h3>
            {allQuestions.map((qes, idx) => {
              return (
                <div className="relative" key={idx}>
                  <div key={idx} className="p-3 flex justify-between gap-11">
                    <div className="col-start-2 max-w-[30rem]">
                      <p>
                        {idx + 1}.{qes.question}
                      </p>
                    </div>
                    <div>
                      <MdDelete
                        className="cursor-pointer"
                        onClick={() => handleDelete(qes._id)}
                      >
                        DELETE
                      </MdDelete>
                    </div>
                  </div>
                  <div className="flex justify-around w-[30%] ml-[3rem]">
                    {qes.options.map((ans, idx) => {
                      return (
                        <div key={idx}>
                          <div key={idx} className="m-2">
                            {ans}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="ml-[1rem]">
                    Ans : 
                    <span className="text-green-300">{qes.correct_option}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex justify-center mt-4">
        {allQuestions.length < QUESTION_LIMIT ? (
          <button
            className="bg-blue-800 p-3 rounded-lg"
            onClick={() => setAddUser(true)}
          >
            Add New Question
          </button>
        ) : (
          <p className="text-red-400">Maximum of 4 questions allowed.</p>
        )}
      </div>
        {addUser && (
          <div className="flex justify-center">
            <div className="h-full md:w-3/4 mt-5 rounded-lg shadow-xl bg-slate-950/55 backdrop-blur-xl p-10 ">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="text-black justify-center gap-5 mt-5 flex items-center flex-col">
                  <label className="text-white" htmlFor="question ">
                    Enter the question
                  </label>
                  <div className=" gap-7">
                    <input
                      required
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      type="text"
                      className=" md:w-80 h-9 rounded-md p-4"
                      name="question"
                      id="question"
                    />
                  </div>
                  <label className="text-white" htmlFor="options">
                    Provide the Options
                  </label>
                  <div className="flex   flex-wrap justify-center gap-6">
                    <input
                      value={option1}
                      onChange={(e) => setOption1(e.target.value)}
                      type="text"
                      className="md:w-80 h-9 rounded-md p-4"
                      name="option1"
                      required
                    />
                    <input
                      value={option2}
                      onChange={(e) => setOption2(e.target.value)}
                      type="text"
                      className="md:w-80 h-9 rounded-md p-4"
                      name="option2"
                      required
                    />
                    <input
                      value={option3}
                      onChange={(e) => setOption3(e.target.value)}
                      type="text"
                      className="md:w-80 h-9 rounded-md p-4"
                      name="option3"
                      required
                    />
                    <input
                      value={option4}
                      onChange={(e) => setOption4(e.target.value)}
                      type="text"
                      className="md:w-80 h-9 rounded-md p-4"
                      name="option4"
                      required
                    />
                  </div>
                  <label className="text-white" htmlFor="answer">
                    Choose The correct Answer
                  </label>
                  <select
                    required
                    name="answer"
                    className=" text-black  rounded-md p-4"
                    onChange={(e) => setAnswer(e.target.value)}
                  >
                    <option value=""  disabled>
                      Choose Your Answer
                    </option>v
                    {option1 && <option value={option1}>{option1}</option>}
                    {option2 && <option value={option2}>{option2}</option>}
                    {option3 && <option value={option3}>{option3}</option>}
                    {option4 && <option value={option4}>{option4}</option>}
                  </select>
                  <div className="flex gap-5">
                    <button className="bg-blue-800 text-white p-3 rounded-lg">
                      Submit
                    </button>
                    <button
                      onClick={() => setAddUser(false)}
                      className="bg-blue-800 text-white p-3 rounded-lg"
                    >
                      cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
