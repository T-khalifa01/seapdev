


const MetricsCards = ({cardsData}) => {
  return (
<div className=" flex flex-grow flex-col gap-4 leading-[1.6]
                sm:grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-8 sm:justify-items-center sm:self-stretch sm:leading-normal sm:justify-center
                md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-16 md:justify-items-center md:self-stretch md:leading-normal md:justify-center
                lg:grid-cols-4 lg:gap-8
                lg:justify-center">

        {cardsData.map((card) => (
            <div key={card.id} className="flex flex-col items-center text-center h-full
                        md:w-72 md:gap-2 px-2 pb-4
                        lg:w-48
                        lg:px-1 lg:pb-2">

                <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                            lg:mb-2 ">
                    <path d={card.svg} className="-green-accent"/>
                </svg>

                <div className="flex flex-col items-center text-xl leading-[1.4] flex-shrink-0 self-stretch
                            md:max-w-[296px]
                            lg:text-xl lg:font-semibold lg:leading-[1.4]">
                    {card.subText ? (
                        <span className="text-center flex flex-col items-center">
                            <h3>{card.mainText}</h3>
                            <h3>{card.subText}</h3>
                        </span>
                    ) : (
                        <h3 className="text-center ">{card.mainText}</h3>
                    )}
                </div>

                {/* Spacer: This flex-grow element pushes the description to the bottom */}
                <div className="flex-grow"></div>

                {/* Description (Paragraph): Pushed to the bottom of the card */}
                <div className="flex items-center justify-center self-stretch mt-2
                            lg:mt-2">
                    <p className="text-center">
                        {card.description}
                    </p>
                </div>
            </div>
        ))}
    </div>

  );
}

export default MetricsCards;