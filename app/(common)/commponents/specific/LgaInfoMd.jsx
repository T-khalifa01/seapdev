
const LgaInfoMd = ({ svg, title, values }) => {
    // Check if values is falsy (null, undefined, '', etc.)
    // If no data is available, render the placeholder
    if (!values) {
        return (
            <div className="border rounded-xl p-4 shadow bg-whitish-secondary">
                <div className="flex items-center gap-3 mb-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                        <path d={svg} />
                    </svg>
                    <h4 className="font-semibold text-sm">{title}</h4>
                </div>
                <div className="text-sm text-gray-600">
                    <span className=" px-2 py-0.5 rounded text-xs">--</span>
                </div>
            </div>
        );
    }
    
    // Process the string as before if data is available
    const cleanedvalues = values.split(',').map(i => i.trim()).filter(i => i !== '');
    
    return (
        <div className="border rounded-xl p-4 shadow bg-whitish-secondary ">
            <div className="flex items-center gap-3 mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-green-600">
                    <path d={svg} />
                </svg>
                <h4 className="font-semibold text-sm">{title}</h4>
            </div>
            <div className="flex flex-wrap gap-1 text-sm ">
                {cleanedvalues.map((item, index) => (
                    <span key={index} className=" py-0.5 rounded text-xs">
                        {item},
                    </span>
                ))}
            </div>
        </div>
    );
};

export default LgaInfoMd;