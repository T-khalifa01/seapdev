'use client'
import { useState, React, useEffect } from "react";
import Link from "next/link";
// import { statesSvg } from "../../lib/data/nigerianSvg.json";
import nigerianSvg from "../../lib/data/nigerianSvg.json";
import allData from "../../lib/data/webdata.json";
import allLgas from "../../lib/data/statelgaList.json";
import LgaInfoMd from "./LgaInfoMd";
import LgaInfoSm from "./LgaInfoSm";
import Button from "../ui/Button";

const LgaSec = () => {
    const statesSvg = nigerianSvg.statesSvg;
    const { icons } = allData;
    const [isLoading, setIsLoading] = useState(false);
    const [tooltipVisible, setTooltipVisible] = useState(false);
    const [stateOnly, setStateOnly] = useState(false);
    const [selectedState, setSelectedState] = useState(null);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipX, setTooltipX] = useState(0);
    const [tooltipY, setTooltipY] = useState(0);
    const [selectedLGAIndex, setSelectedLGAIndex] = useState(0);
    const [lgaPaths, setLgaPaths] = useState([]);
    const [allStateLgaData, setAllStateLgaData] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const selectedLGA = lgaPaths?.[selectedLGAIndex]?.name || '';

    useEffect(() => {
        if (!selectedState) {
            setLgaPaths([]);
            setAllStateLgaData(null);
            setIsLoading(false);
            return;
        }

        const fetchData = async () => {
            setIsLoading(true);
            let lgaPathsLoaded = false;
            
            try {
                const svgModule = await import(`@/app/(common)/lib/data/lgaSVGs/${selectedState.toLowerCase()}.json`);
                setLgaPaths(svgModule.default);
                lgaPathsLoaded = true;
            } catch (error) {
                console.error(`Error loading LGAs for ${selectedState}:`, error);
                setLgaPaths([]);
                setAllStateLgaData(null);
                setIsLoading(false);
                return;
            }

            if (lgaPathsLoaded) {
                try {
                    const response = await fetch(`/api/lga-data?state=${selectedState}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data from API');
                    }
                    const data = await response.json();
                    setAllStateLgaData(data);
                } catch (error) {
                    console.error(`Error fetching data for ${selectedState}:`, error);
                    setAllStateLgaData(null);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchData();
    }, [selectedState]);

    useEffect(() => {
        if (searchTerm.length > 2) {
            const normalizedTerm = searchTerm.toLowerCase();
            let matchedSuggestions = [];
            const matchedStates = statesSvg.filter(s => s.name.toLowerCase().startsWith(normalizedTerm)).map(s => ({ name: s.name, type: 'State' }));
            matchedSuggestions = [...matchedSuggestions, ...matchedStates];
            
            for (const stateName in allLgas) {
                if (allLgas.hasOwnProperty(stateName)) {
                    const matchedLgas = allLgas[stateName].filter(lga => lga.toLowerCase().startsWith(normalizedTerm)).map(lga => ({ name: lga, type: 'LGA', parentState: stateName }));
                    matchedSuggestions = [...matchedSuggestions, ...matchedLgas];
                }
            }
            setSuggestions(matchedSuggestions.slice(0, 10));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (selectedState && lgaPaths.length > 0 && searchTerm) {
            const normalizedTerm = searchTerm.toLowerCase().trim();
            const foundIndex = lgaPaths.findIndex(lga => lga.name.toLowerCase() === normalizedTerm);
            if (foundIndex !== -1) {
                setSelectedLGAIndex(foundIndex);
            } else {
                setSelectedLGAIndex(0);
            }
            setSearchTerm('');
        }
    }, [lgaPaths, searchTerm, selectedState]);

    const currentLgaInfo = allStateLgaData?.find(item => item.name === selectedLGA);

    const handleClick = (name) => {
        setStateOnly(true);
        setSelectedState(name);
        setTooltipVisible(false);
    };

    const handleClose = () => {
        setStateOnly(false);
        setSelectedState(null);
        setLgaPaths([]);
        setAllStateLgaData(null);
        setSelectedLGAIndex(0);
    };

    const handleSearch = (item) => {
        if (item.type === 'State') {
            handleClick(item.name);
        } else if (item.type === 'LGA') {
            handleClick(item.parentState);
            setSearchTerm(item.name);
        }
        setSuggestions([]);
    };
    
    const handlePathMouseEnter = (e, name) => {
        setTooltipContent(name);
        setTooltipVisible(true);
        setTooltipX(e.clientX + 10);
        setTooltipY(e.clientY + 10);
    };

    const handlePathMouseMove = (e) => {
        if (tooltipVisible) {
            setTooltipX(e.clientX + 10);
            setTooltipY(e.clientY + 10);
        }
    };

    const handlePathMouseLeave = () => {
        setTooltipVisible(false);
        setTooltipContent('');
    };

    const handleNext = () => {
        if (!lgaPaths || lgaPaths.length === 0) return;
        setSelectedLGAIndex((prev) => (prev + 1) % lgaPaths.length);
    };

    const handlePrev = () => {
        if (!lgaPaths || lgaPaths.length === 0) return;
        setSelectedLGAIndex((prev) =>
            prev === 0 ? lgaPaths.length - 1 : prev - 1
        );
    };


    //svg for smlgainfo
    const busSvg = (<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path strokeWidth="0.5" fillRule="nonzero" clipRule="nonzero" vectorEffect="non-scaling-stroke" d="M15.75 4.25H2.25C1.42157 4.25 0.75 4.92157 0.75 5.75V11.75C0.75 12.5784 1.42157 13.25 2.25 13.25H15.75C16.5784 13.25 17.25 12.5784 17.25 11.75V5.75C17.25 4.92157 16.5784 4.25 15.75 4.25Z"  strokeLinecap="round" strokeLinejoin="round"/>
                        <path strokeWidth="0.5" fillRule="nonzero" clipRule="nonzero" vectorEffect="non-scaling-stroke" d="M15.75 13.25H2.25C1.42157 13.25 0.75 13.9216 0.75 14.75V17.75C0.75 18.5784 1.42157 19.25 2.25 19.25H15.75C16.5784 19.25 17.25 18.5784 17.25 17.75V14.75C17.25 13.9216 16.5784 13.25 15.75 13.25Z"  strokeLinecap="round" strokeLinejoin="round"/>
                        <path strokeWidth="0.5" fillRule="nonzero" clipRule="nonzero" vectorEffect="non-scaling-stroke" d="M15.75 4.25H2.25C1.85252 4.24889 1.47163 4.09049 1.19057 3.80943C0.909506 3.52837 0.751113 3.14748 0.75 2.75C0.751113 2.35252 0.909506 1.97163 1.19057 1.69057C1.47163 1.40951 1.85252 1.25111 2.25 1.25H15.75C16.1475 1.25111 16.5284 1.40951 16.8094 1.69057C17.0905 1.97163 17.2489 2.35252 17.25 2.75C17.2489 3.14748 17.0905 3.52837 16.8094 3.80943C16.5284 4.09049 16.1475 4.24889 15.75 4.25ZM3.75 19.25V20.2812C3.75 20.4056 3.70061 20.5248 3.61271 20.6127C3.5248 20.7006 3.40557 20.75 3.28125 20.75H1.96875C1.84443 20.75 1.7252 20.7006 1.63729 20.6127C1.54939 20.5248 1.5 20.4056 1.5 20.2812V19.25H3.75ZM16.5 19.25V20.2812C16.5 20.4056 16.4506 20.5248 16.3627 20.6127C16.2748 20.7006 16.1556 20.75 16.0312 20.75H14.7188C14.5944 20.75 14.4752 20.7006 14.3873 20.6127C14.2994 20.5248 14.25 20.4056 14.25 20.2812V19.25H16.5Z"  strokeLinecap="round" strokeLinejoin="round"/>
                        <path strokeWidth="0.5" fillRule="nonzero" clipRule="nonzero" vectorEffect="non-scaling-stroke" d="M14.25 17C14.6642 17 15 16.6642 15 16.25C15 15.8358 14.6642 15.5 14.25 15.5C13.8358 15.5 13.5 15.8358 13.5 16.25C13.5 16.6642 13.8358 17 14.25 17Z"  strokeLinejoin="round"/>
                        <path strokeWidth="0.5" fillRule="nonzero" clipRule="nonzero" vectorEffect="non-scaling-stroke" d="M3.75 17C4.16421 17 4.5 16.6642 4.5 16.25C4.5 15.8358 4.16421 15.5 3.75 15.5C3.33579 15.5 3 15.8358 3 16.25C3 16.6642 3.33579 17 3.75 17Z"  strokeLinejoin="round"/>
                        <path strokeWidth="0.5" fillRule="nonzero" clipRule="nonzero" vectorEffect="non-scaling-stroke" d="M9 4.25V13.25M0.75 2.75V16.25M17.25 2.75V16.25"  strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
        );
    const chargingHouseSvg = (<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path  d="M19 7.58496V12.5C19 16.272 19 18.157 17.828 19.329C17.02 20.137 15.872 20.388 14 20.465M3 7.58496V12.5C3 16.272 3 18.157 4.172 19.329C5.235 20.392 6.886 20.49 10 20.499C10.265 20.499 10.5192 20.3937 10.7068 20.2064C10.8943 20.0191 10.9997 19.765 11 19.5V16.5" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path  d="M21 9.5L16.657 5.336C13.99 2.779 12.657 1.5 11 1.5C9.343 1.5 8.01 2.78 5.343 5.336L1 9.5M13.001 8V10.5M9.001 10.5V8M7.506 11.38C7.466 10.905 7.876 10.5 8.396 10.5H13.61C14.13 10.5 14.54 10.905 14.5 11.38L14.393 12.678C14.312 13.6214 13.973 14.5244 13.413 15.288L13.063 15.77C12.732 16.226 12.174 16.5 11.577 16.5H10.429C9.832 16.5 9.274 16.226 8.943 15.77L8.593 15.288C8.03304 14.5244 7.694 13.6214 7.613 12.678L7.506 11.38Z"  strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
        );

    const motorcycleSvg = (<svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.4515 3.7035C13.1371 3.50999 12.8824 3.23323 12.7156 2.90388C12.5488 2.57454 12.4765 2.20545 12.5065 1.8375L10.5 1.485L10.673 0.5L12.842 0.881C13.0252 0.609676 13.2721 0.387458 13.5612 0.233851C13.8503 0.0802445 14.1726 -5.55041e-05 14.5 2.87839e-08H16.1925C16.3625 2.87839e-08 16.5 0.1375 16.5 0.3075V3.6925C16.5 3.8625 16.362 4 16.1925 4H16V8.125C16.1083 8.094 16.2185 8.0685 16.3305 8.0485C17.079 7.91658 17.85 8.05114 18.5095 8.42877C19.1691 8.80641 19.6754 9.40324 19.9405 10.1155C20.097 10.5355 19.9305 10.919 19.6435 11.1475C19.6682 11.8113 19.4518 12.4616 19.0344 12.9783C18.6169 13.495 18.0266 13.8432 17.3724 13.9585C16.7182 14.0739 16.0444 13.9485 15.4754 13.6057C14.9064 13.2629 14.4808 12.7257 14.277 12.0935C14.0065 12.0025 13.7715 11.7985 13.6825 11.5H7.9895C7.92813 12.1841 7.61301 12.8204 7.10614 13.2838C6.59926 13.7473 5.93731 14.0043 5.2505 14.0043C4.56369 14.0043 3.90174 13.7473 3.39486 13.2838C2.88799 12.8204 2.57287 12.1841 2.5115 11.5H0.235C0.20499 11.5009 0.175103 11.4958 0.147048 11.4851C0.118994 11.4744 0.0933203 11.4583 0.071496 11.4377C0.0496718 11.4171 0.0321244 11.3924 0.0198567 11.365C0.00758902 11.3376 0.000841547 11.308 0 11.278C0 9.51 1.0135 7.9665 2.52 7.14C2.50673 7.09452 2.5 7.04738 2.5 7V5.5C2.5 5.10218 2.65804 4.72064 2.93934 4.43934C3.22064 4.15804 3.60218 4 4 4H8.5C8.89782 4 9.27936 4.15804 9.56066 4.43934C9.84196 4.72064 10 5.10218 10 5.5V7C10 7.13261 9.94732 7.25979 9.85355 7.35355C9.75979 7.44732 9.63261 7.5 9.5 7.5V8H12.62L13.4515 3.7035ZM13.5 2C13.5 1.73478 13.6054 1.48043 13.7929 1.29289C13.9804 1.10536 14.2348 1 14.5 1H15.5V3H14.5C14.2348 3 13.9804 2.89464 13.7929 2.70711C13.6054 2.51957 13.5 2.26522 13.5 2ZM12.426 9H9.5V10.5H12.136L12.426 9ZM13.1545 10.5H13.7325C13.9132 9.73747 14.3633 9.06591 15 8.609V4H14.4125L13.1545 10.5ZM15.3295 12.033C15.4982 12.3702 15.7713 12.644 16.1081 12.8135C16.445 12.983 16.8276 13.0392 17.1989 12.9738C17.5703 12.9083 17.9106 12.7247 18.1692 12.4502C18.4277 12.1757 18.5908 11.8251 18.634 11.4505L15.3295 12.033ZM3.5 5.5C3.5 5.36739 3.55268 5.24021 3.64645 5.14645C3.74021 5.05268 3.86739 5 4 5H8.5C8.63261 5 8.75979 5.05268 8.85355 5.14645C8.94732 5.24021 9 5.36739 9 5.5V6.5H3.5V5.5ZM1.087 10.5C1.467 8.8175 3.0565 7.5 5.043 7.5H8.5V10.484C8.48348 10.4947 8.46417 10.5002 8.4445 10.5H1.087ZM6.8095 11.5115C6.8725 11.5135 6.92917 11.5157 6.9795 11.518C6.91573 11.9309 6.70631 12.3075 6.3891 12.5794C6.0719 12.8514 5.66784 13.0009 5.25 13.0009C4.83216 13.0009 4.4281 12.8514 4.1109 12.5794C3.79369 12.3075 3.58427 11.9309 3.5205 11.518C3.57083 11.5153 3.6275 11.5132 3.6905 11.5115C4.0585 11.5 4.555 11.5 5.25 11.5C5.945 11.5 6.4415 11.5 6.81 11.5115M18.186 9.4065C17.8566 9.17578 17.4713 9.03758 17.0704 9.00627C16.6694 8.97496 16.2674 9.0517 15.9062 9.22849C15.5449 9.40527 15.2377 9.67566 15.0164 10.0115C14.7951 10.3473 14.6679 10.7363 14.648 11.138L18.969 10.376C18.8046 9.98538 18.5331 9.64963 18.186 9.4065Z" />
                            </svg>
        );
    return (
        <section className={`flex w-full flex-col items-start gap-4 bg-whitish-secondary  p-4 sm:p-8 md:p-12 lg:px-20 pb-8 pt-8 leading-[normal] `}>
                <h2 className="leading-normal ">Explore Investment Areas</h2>
                <h3 className="w-full text-3xl md:w-[700px] md:text-5xl font-medium  leading-[1.2]">LGA Explorer</h3>
                <div className="flex flex-col w-full items-start gap-6 pt-4 lg:flex-row lg:items-center lg:justify-between lg:pt-8">
            <div className="max-w-prose text-base leading-normal  md:text-lg">
                <p>
                Discover your community's potential. Simply select your state and LGA below to access detailed data and local investment opportunities.
                </p>
            </div>

            <div className="relative flex w-full  items-center gap-4 md:w-auto md:flex-row md:items-stretch lg:gap-6">
                <div className="relative w-full md:w-72">
                <input
                    id="lgasearchbox"
                    type="text"
                    className=" w-full rounded-full border border-gray-300 bg-whitish-secondary px-4 py-2  placeholder-gray-500 transition-colors duration-200 focus:border-green-accent focus:outline-none "
                    placeholder="Enter State or LGA"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter' && suggestions.length > 0) handleSearch(suggestions[0]);
                    }}
                />
                </div>

                <Button href="/contact-us" type='solid' label={'Search'} ariaLabel={'Lga-search-button'} onClick={() => searchTerm && suggestions.length > 0 && handleSearch(suggestions[0])}/>

                {suggestions.length > 0 && (
                <div className="absolute top-full left-0 z-10 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg md:w-72">
                    {suggestions.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => handleSearch(item)}
                        className="cursor-pointer border-b border-gray-100 p-3 hover:bg-gray-100 last:border-b-0"
                    >
                        <p className="font-medium text-gray-800">
                        {item.type === 'LGA' ? `${item.parentState}, ${item.name}` : item.name}
                        </p>
                    </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    {stateOnly ? (
        <section> {/* */}
            <div className="flex flex-col lg:flex-row w-full min-h-screen gap-6 p-6 bg-grayish-primary md:min-w-[393px] lg:min-w-[672px] xl:min-w-[864px] rounded-lg">
                <div className="flex-1 lg:max-w-[50%] p-4 rounded-xl shadow bg-whitish-secondary">
                    <div className="flex items-center justify-between relative ">
                        <button onClick={handleClose} className=" top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition" aria-label="Back">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 15L1 8M1 8L8 1M1 8H19" />
                            </svg>
                        </button>
                        <h4 className="text-xl font-semibold p-0.5 text-gray-700 text-center">
                            {selectedState} : {selectedLGA || 'No LGA Selected'}
                        </h4>
                        <p className="text-xl font-semibold mb-4 text-gray-700 text-center"> </p>
                    </div>
                    <div className="w-full h-auto min-h-[400px] flex items-center justify-center overflow-auto">
                        {lgaPaths && lgaPaths.length > 0 ? (
                            <svg viewBox="0 0 426 530" className="w-full h-auto text-green-600 justify-self-center self-center stroke-[#F6F8ED] stroke-[0.5]" xmlns="http://www.w3.org/2000/svg">
                                {lgaPaths.map((lga, index) => (
                                    <path key={lga.id} d={lga.svgPath} title={lga.name} transform={`translate(${lga.position.x}, ${lga.position.y})`}
                                        className={`hover:fill-Lighter-BlueShade transition-colors duration-700 ease-in-out delay-50 ${index === selectedLGAIndex ? 'fill-green-accent' : 'fill-bleus-secondary'} `}
                                        onClick={() => setSelectedLGAIndex(index)}
                                        onMouseEnter={(e) => handlePathMouseEnter(e, lga.name)}
                                        onMouseMove={handlePathMouseMove}
                                        onMouseLeave={handlePathMouseLeave}
                                    />
                                ))}
                            </svg>
                        ) : (
                            <div className="text-center p-4">
                                <div className="flex justify-center items-center h-full text-gray-400 mb-2">
                                    <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path opacity="0.16" d="M6.49999 16.5L12 22L17 17L6.02199 6.02197C4.78055 7.51348 4.14133 9.41509 4.22977 11.3536C4.3182 13.2922 5.12791 15.1277 6.49999 16.5Z" fill="black" />
                                        <path d="M4 4L20 20" stroke="black" strokeWidth="2" strokeLinecap="round" />
                                        <path d="M6.02199 6.02187C4.78055 7.51338 4.14133 9.415 4.22977 11.3535C4.3182 13.2921 5.12791 15.1276 6.49999 16.4999L12 21.9999L17 16.9999M9.34399 3.68687C10.7352 3.18143 12.2417 3.08336 13.6868 3.40415C15.1318 3.72494 16.4553 4.4513 17.5019 5.49795C18.5486 6.5446 19.2749 7.86811 19.5957 9.31312C19.9165 10.7581 19.8184 12.2647 19.313 13.6559" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <p className="text-center text-lg font-medium text-gray-500">No LGA map found for this state.</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4 flex justify-center items-center gap-4 text-gray-700">
                        <button onClick={handlePrev} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous LGA">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="text-sm font-medium">
                            ({selectedLGAIndex + 1}/{lgaPaths.length})
                        </span>
                        <button onClick={handleNext} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next LGA">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    <span className="flex flex-col justify-between content-end self-end">
                        <p className="text-xl font-semibold mb-4 text-gray-700 text-center"> </p>
                        {lgaPaths && lgaPaths.length > 0 ? (
                            <Button href={`../../../investment-form`} label={`Invest In ${selectedLGA}`} type={'outlined'} ariaLabel={'Invest-In-selectedLGA'}/>
                        ) : (
                            <div className="flex flex-grow items-center justify-center rounded-[100px] border border-solid border-x-[gainsboro] border-y-[gainsboro] bg-gray-300 p-2.5 [box-shadow:inset_0px_-4px_0px_0px_rgba(150,150,150,1)] md:flex-grow-0 md:px-4 md:py-2.5 md:[box-shadow:inset_0px_-4px_0px_0px_rgba(150,150,150,1)] lg:px-6 pointer-events-none">
                                <span className="text-center font-medium font-poppins sm:text-lg md:text-2xl leading-normal text-neutral-500">
                                    Invest In {selectedLGA}
                                </span>
                            </div>
                        )}
                    </span>
                </div>
                <div className="flex-1 flex-col gap-3">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24">
                                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                    <path strokeDasharray="16" strokeDashoffset="16" d="M12 3c4.97 0 9 4.03 9 9">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0" />
                                        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                                    </path>
                                    <path strokeDasharray="64" strokeDashoffset="64" strokeOpacity="0.3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z">
                                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0" />
                                    </path>
                                </g>
                            </svg>
                        </div>
                        
                    ) : (
                        <>
                            {currentLgaInfo ? (
                                <h4 className="text-xl font-semibold mb-4  underline">
                                    Data for {selectedLGA}
                                </h4>
                            ) : (
                                <h4 className="text-xl font-semibold text-center mb-4 text-red-600">
                                    There is no data available for {selectedLGA}
                                </h4>
                            )}
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                <LgaInfoSm mainText={currentLgaInfo?.population} subText={"Population Estimate"} svg={icons.people} />
                                <LgaInfoSm mainText={currentLgaInfo?.homesWithMeter} subText={"Households with Electricity Meter"} svg={icons.house} big={true} />
                                <LgaInfoSm mainText={currentLgaInfo?.tricycles} subText={"Registered Tricycles "} fullSvg={motorcycleSvg} />
                                <LgaInfoSm mainText={currentLgaInfo?.motorcycles} subText={"Commercial Motorcycles "} fullSvg={motorcycleSvg} />
                                <LgaInfoSm mainText={currentLgaInfo?.buses} subText={"Mini Buses/Vans"} svg={icons.electricCar} big={true} />
                                <LgaInfoSm mainText={currentLgaInfo?.homesWithCookingGas} subText={"Percentage Households with Cooking Gas "} svg={icons.cooking} />
                                <LgaInfoSm mainText={currentLgaInfo?.agriLand} subText={"Available Agricultural Land"} svg={icons.agriculture1} />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-4 ">
                                <LgaInfoMd title={"top 5 crops grown"} values={currentLgaInfo?.cropsGrown} svg={icons.agriculture1} />
                                <LgaInfoMd title={'Minerals Resources present'} values={currentLgaInfo?.mineralsPresent} svg={icons.mineral} />
                                <LgaInfoMd title={'Development Needed'} values={currentLgaInfo?.neededDev} svg={icons.infrastructure} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section> 
    ) : (
        <div className="flex flex-col items-center justify-center self-stretch pt-16">
            <svg viewBox={`0 0 ${909} ${738.1}`} fill='currentColor' className="w-full h-auto max-w-[900px] fill-grayish-primary  stroke-green-accent stroke-[1] self-center justify-self-center" role="lga-map" aria-labelledby="nigerian-svg-map">
                {statesSvg.map((path) => (
                    <path
                        d={path.svgPath}
                        title={path.name}
                        key={path.id}
                        transform={`translate(${path.position.x}, ${path.position.y})`}
                        onMouseEnter={(e) => handlePathMouseEnter(e, path.name)}
                        onMouseMove={handlePathMouseMove}
                        onClick={() => handleClick(path.name)}
                        onMouseLeave={handlePathMouseLeave}
                        className="hover:fill-green-accent transition-colors duration-700 ease-in-out delay-50 "
                    />
                ))}
            </svg>
        </div>
    )}
        {tooltipVisible && (
            <div
                className="fixed bg-gray-800 text-white text-sm px-2 py-1 rounded shadow-lg pointer-events-none z-50 transition-opacity duration-100 opacity-0"
                style={{ left: `${tooltipX}px`, top: `${tooltipY}px`, opacity: tooltipVisible ? 1 : 0 }}
            >
                {tooltipContent}
            </div>
        )}
    </section>
    );
}

export default LgaSec;
