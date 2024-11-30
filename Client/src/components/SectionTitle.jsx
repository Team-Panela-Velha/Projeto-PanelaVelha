export default function SectionTitle({ text }) {
    return (
      <div className="flex items-center justify-between w-full my-5 lowercase">
        <h2 className="text-xl font-bold text-gray-800">{text}</h2>
        <div className="h-0.5 flex-grow bg-butterscotch ml-4 mr-[3%]"></div>
      </div>
    );
  }
  