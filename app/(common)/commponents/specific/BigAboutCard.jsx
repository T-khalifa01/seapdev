import Image from 'next/image';



const BigAboutCard = ({ sec, title, desc, imgSrc, imageOnLeft = false }) => {
  const textContainerClasses = `flex w-full flex-col items-start gap-2
                                sm:max-w-sm sm:gap-3
                                md:max-w-md md:gap-4
                                lg:w-[600px] lg:flex-shrink-0`;

  const imageContainerClasses = `relative w-full overflow-hidden
                                 h-[200px] rounded-[8px]
                                 sm:h-[250px] sm:rounded-[12px] sm:max-w-sm
                                 md:h-[350px] md:rounded-[16px] md:max-w-md
                                 lg:h-[400px] lg:w-[600px] lg:rounded-[18px] lg:flex-shrink-0`;

  const imageContent = (
    <figure className={imageContainerClasses}>
      <Image
        src={imgSrc}
        alt={`Logo for ${title}`}
        fill
        style={{ objectFit: "cover", objectPosition: "center" }}
        priority={false}
      />
    </figure>
  );

  const textContent = (
    <div className={textContainerClasses}>
      <p className={`font-semibold leading-normal text-sm`}>{sec}</p>
      <h3 className={`flex items-start self-stretch leading-[1.2]
                      text-xl
                      sm:text-2xl
                      md:text-2xl
                      lg:text-3xl`}>
        {title}
      </h3>
      <div className={`self-stretch pt-2`}>
        <p className={`text-base leading-[1.6]
                        lg:text-lg`}>
          {desc}
        </p>
      </div>
    </div>
  )
  return (
    <article 
      className={`
        flex w-full flex-col items-center gap-6
        md:gap-y-8
        lg:flex-row lg:flex-nowrap lg:justify-center lg:items-center lg:gap-x-12
      `}
    >
      {/* Conditional rendering based on imageOnLeft prop */}
      {imageOnLeft ? (
        <>
          {imageContent}
          {textContent}
        </>
      ) : (
        <>
          {textContent}
          {imageContent}
        </>
      )}
    </article>
  );
}

export default BigAboutCard;