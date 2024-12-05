export default function SectionTitle({ text }) {
    return (
      <div className="flex items-center justify-between w-full mt-5 mb-3 lowercase">
        <h2 className="text-2xl font-bold text-jet first-letter:uppercase">{text}</h2>
        <div className="h-[0.1rem] flex-grow bg-chocolate-cosmos ml-2 mr-[3%]"></div>
      </div>
    );
  }
  