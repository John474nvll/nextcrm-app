
import { LoginComponent } from "./components/LoginComponent";

const SignInPage = async () => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto flex rounded-lg shadow-lg overflow-hidden bg-white max-w-4xl">
        <div className="w-1/2 hidden md:block bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579546929518-9e396f3a8034?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')" }}>
        </div>
        <div className="w-full md:w-1/2 p-12">
          <h1 className="text-3xl font-bold mb-4">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Sign in to continue to your account.</p>
          <LoginComponent />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
