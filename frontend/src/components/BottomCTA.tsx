import { Link } from "react-router-dom";

interface BottomCTAProps {
  title?: string;
  buttonText: string;
  href: string;
}

const BottomCTA: React.FC<BottomCTAProps> = ({
  title = "Ready to Explore More?",
  buttonText,
  href,
}) => {
  return (
    <section className="w-full bg-[#4A9A80] py-16 text-center">
      <h2 className="text-white text-3xl font-semibold mb-4">{title}</h2>
      <Link to={href}>
        <button className="bg-white text-[#4A9A80] px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
          {buttonText}
        </button>
      </Link>
    </section>
  );
};

export default BottomCTA;
