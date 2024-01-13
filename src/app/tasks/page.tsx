
"use client"

const Tasks = () => {
  return (
    <main>
      <div className="gap-4 grid grid-cols-4 justify-items-center">
        <div className="w-full flex flex-col justify-center items-stretch text-center min-h-40 rounded-3xl bg-cyan-300">
          <h1>Completed</h1>
          <h2 onClick={()=> alert("Hola")}>0</h2>
        </div>
        <div className="w-full flex flex-col justify-center items-stretch text-center min-h-40 rounded-3xl bg-cyan-300">
          <h1>Completed</h1>
          <h2>0</h2>
        </div>
        <div className="w-full flex flex-col justify-center items-stretch text-center min-h-40 rounded-3xl bg-cyan-300">
          <h1>Completed</h1>
          <h2>0</h2>
        </div>
        <div className="w-full flex flex-col justify-center items-stretch text-center min-h-40 rounded-3xl bg-cyan-300">
          <h1>Completed</h1>
          <h2>0</h2>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
