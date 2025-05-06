import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <div className="mt-6 text-center">
          {isLogin ? (
            <>
              <p className="text-gray-600">New here?</p>
              <button
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign up 
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-600">Already have an account?</p>
              <button
                className="text-indigo-600 font-medium hover:underline cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Log in 
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
