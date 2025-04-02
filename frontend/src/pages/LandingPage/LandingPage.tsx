import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">
        Bienvenido a la Calculadora Exponencial
      </h1>
      <Link to="/calculadora" className="text-blue-500 hover:underline text-xl">
        Ir a la Calculadora
      </Link>
    </div>
  );
};

export default LandingPage;
