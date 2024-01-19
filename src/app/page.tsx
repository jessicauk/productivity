import Link from "next/link";

export const metadata = {
  title: "dashboard",
};

export default async function Home() {
  return (
    <main className="bg-white dark:bg-slate-800 w-full h-screen flex justify-center content-center items-center">
      <div className="text-center mx-0">
        <h2 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight sm:text-4xl">
          Boost your productivity.
          <br />
          Start using our app today.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mt-6 text-lg leading-8">
          App for tracking your tasks and projects. Organize your workflow in a
          simple way and measure what matters.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/tasks"
            className="dark:text-white bg-teal-500 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
}
