
const LgaInfoSm = ({ svg, mainText, subText, styles, fullSvg, big }) => {
    const isMultiPath = typeof svg === 'object' && svg !== null;
    return (
        <div className="w-full max-w-xs p-4 bg-whitish-secondary rounded-xl shadow hover:shadow-md transition duration-300">
            <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 text-green-500">
                {fullSvg ? (
                    // If fullSvg prop is given, render it directly
                    <div className="w-12 h-12 text-green-500">
                    {fullSvg}
                    </div>
                ) : (
                    // Otherwise, render the existing SVG code
                    <svg
                    width="48"
                    height="48"
                    viewBox={big ? "0 0 48 48" : "0 0 24 24"}
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    {isMultiPath ? (
                        Object.keys(svg).map((key) => (
                        <path key={key} d={svg[key]} className={`${styles}`} />
                        ))
                    ) : (
                        <path d={svg} />
                    )}
                    </svg>
                )}
                </div>

                {/* Main Value */}
                <h3 className="text-2xl font-bold text-gray-800">
                    {/* Display '--' if mainText is falsy (null, undefined, '') */}
                    {mainText || '--'}
                </h3>

                {/* Sub Text */}
                <p className="text-sm font-medium text-gray-500">{subText}</p>
            </div>
        </div>
    );
};

export default LgaInfoSm;