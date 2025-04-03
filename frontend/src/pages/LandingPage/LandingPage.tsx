import NavBar from "../../components/NavBar";

const LandingPage = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">
          Bienvenido a la Calculadora Exponencial
        </h1>
        <a
          href="/calculadora"
          className="text-blue-500 hover:underline text-xl"
        >
          Ir a la Calculadora
        </a>
      </div>
    </>
  );
};

export default LandingPage;
