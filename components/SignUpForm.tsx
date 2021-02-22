import { auth } from "config/firebase";
import { useRouter } from "next/dist/client/router";
import { db } from "config/firebase";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "components/Button";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}
0;

const createUser = (user) => {
  return db
    .collection("users")
    .doc(user.uid)
    .set(user)
    .then(() => {
      return user;
    })
    .catch((error) => {
      console.log(error);
      return { error };
    });
};

const signUp = ({ name, email, password }) => {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      return createUser({ uid: response.user.uid, email, name });
    })
    .catch((error) => {
      return { error };
    });
};

const SignUpForm: React.FC = () => {
  const { register, errors, handleSubmit } = useForm();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const onSubmit = (data: SignUpData) => {
    setIsLoading(true);
    return signUp(data).then((user) => {
      setIsLoading(false);
      user.error ? setError(user.error) : router.push("/dashboard");
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error?.message && (
        <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
          <span>{error.message}</span>
        </div>
      )}
      <div className="rounded-md shadow-sm">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="text"
          name="name"
          ref={register({
            required: "Please enter an name",
          })}
        />
        {errors.password && (
          <div className="mt-2 text-xs text-red-600">
            {errors.password.message}
          </div>
        )}
      </div>
      <div className="mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="email"
            name="email"
            ref={register({
              required: "Please enter an email",
              /*pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Not a valid email",
              },*/
            })}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="password"
            name="password"
            ref={register({
              required: "Please enter a password",
              minLength: {
                value: 6,
                message: "Should have at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <Button title="Sign up" type="submit" isLoading={isLoading}></Button>
        </span>
      </div>
    </form>
  );
};
export default SignUpForm;
