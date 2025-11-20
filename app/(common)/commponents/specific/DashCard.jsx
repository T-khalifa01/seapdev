
const DashCard = ({ title, value, icon }) => {
  return (
    <article className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col justify-between h-36">
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">{title}</h3>
        {/* Render the passed-in icon component */}
        {/* {IconComponent && <IconComponent className="h-8 w-8 text-gray-400" />} */}
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-400 ">{value}</p>
      </div>
    </article>
  );
}

export default DashCard;