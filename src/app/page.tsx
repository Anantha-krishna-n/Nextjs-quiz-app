
import Link from "next/link"
export default function Home(){
  return (
    <main>
      <div>
        <div className="w-screen pt-52 items-center flex justify-center">
          <h1 className="text-7xl text-gray-200">Turboquiz</h1>
        </div>
        <div className="w-full flex justify-center gap-32">
          <Link
            href="/master-quiz"
            className="mt-10 border p-5 rounded-md bg-slate-300 text-black hover:bg-slate-50"
          >
            Quiz Master
          </Link>
          <Link
            href="/student-quiz"
            className="mt-10 border p-5 rounded-md bg-slate-300 text-black hover:bg-slate-50"
          >
            Student
          </Link>
        </div>
      </div>
    </main>
  )
}