import Link from "next/link";

export const metadata = {
  title: "dashboard",
};

export default async function Home() {
  return (
    <main className="w-full h-screen bg-red-700">
      <div className="text-center mx-0 flex-auto content-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Boost your productivity.
          <br />
          Start using our app today.
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-300">
          Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
          Malesuada adipiscing sagittis vel nulla.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/tasks"
            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Get started
          </Link>
        </div>
      </div>
    </main>
  );
}
