import NavBar from "@/components/NavBar";
import BottomCTA from "@/components/BottomCTA";

const IntegralsCalculator = () => {
  return (
    <>
      <NavBar />

      <div className="min-h-screen bg-gray-100 py-10">
        <h1 className="text-4xl font-bold text-center mb-12">
          Integrals Calculator
        </h1>

        {/* Contenedor principal */}
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-center items-start gap-6 px-6">
          {/* Columna izquierda: Input + Graph */}
          <div className="flex-1 max-w-[600px] w-full flex flex-col items-center">
            <div className="w-full">{/* INTEGRAL INPUT */}</div>

            {/* 👉 Solo invocamos el gráfico; muestra vacío si no hay expresión */}
            <div className="w-full">{/*INTEGRAL GRAPH */}</div>
          </div>

          {/* Columna derecha: Result */}
          <div className="flex-1 w-full max-w-[600px]">
            {/* INTEGRAL RESULT */}
          </div>
        </div>
      </div>

      <BottomCTA buttonText="Back to Calculus" href="/calculus" />
    </>
  );
};

export default IntegralsCalculator;
