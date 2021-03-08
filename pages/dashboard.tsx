import { useAuth } from "hooks/useAuth";
import { useNotes } from "hooks/useNotes";
import { useRequireAuth } from "hooks/useRequireAuth";
import Link from "next/link";

const DashBoardPage: React.FC = () => {
  const auth = useRequireAuth();
  const { note, setNote, onSaveNote } = useNotes();

  if (!auth.user)
    return (
      <>
        <div>Not Authenticated!</div>
        <Link href="/login">
          <a>Login</a>
        </Link>
      </>
    );
  return (
    <div className="min-h-screen flex bg-gray-200">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mt-24">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {`Welcome ${auth.user.name}!`}
          </h2>
          <p className="mt-2 text-center text-md text-gray-600">
            {`You are logged in with ${auth.user.email}`}
          </p>
        </div>
      </div>
      <div className="sm:w-full">
        <button
          onClick={() => auth.signOut()}
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Sign out
        </button>
        <textarea
          placeholder="Your Note"
          value={note}
          onChange={(event) => {
            setNote(event.target.value);
          }}
        ></textarea>
        <button
          onClick={onSaveNote}
          className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default DashBoardPage;
