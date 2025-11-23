import Image from "next/image";



const PartnersCard = ({pic, alt, partner, fullName, desc, styles}) => {
  return (
   <article
      className={`
        flex flex-col items-center gap-1 leading-[1.6]
        w-full
      `}
    >
      {/* 1. Partner Logo */}
      <div className={`relative overflow-hidden rounded-lg shrink-0
                      ${styles}`}>
        {/* <Image
          src={pic}
          alt={alt}
          type="svg"
          width={'256'}
          height={'256'}
          priority={false}
        />  h-48 w-48
                       sm:h-56 sm:w-56 
                       md:h-64 md:w-64
                       lg:h-72 lg:w-72 */}
        <Image src={pic }
                alt={alt }
                fill
                style={{ objectFit: "contain", objectPosition: "center" }}
                priority={true}
                />
      </div>

      {/* 2.fill
          style={{ objectFit: "cover", objectPosition: "center" }} Partner Text Content - All content below image. Remains flex-col for LG+ */}
      <div className={`font-fira-sans flex flex-col items-center
                       w-full
                       leading-[1.6]
                       
                       
                       `}>
        {/* 2. Title */}
        <h3 className={`text-xl font-poppins font-semibold leading-[1.6] text-center`}>
          {partner}
        </h3>

        {/* 3. Full Name */}
        <p className={`font-poppins text-lg leading-[1.6] text-gray-700 text-center pt-2 /* Spacing from title */`}>
          {fullName}
        </p>

        {/* 4. Description */}
        <div className={`grow pt-4 w-full max-w-[284px] /* Spacing from full name, max-width for readability */`}>
          <p className={`font-fira-sans text-sm md:text-base leading-[1.6] text-center`}>
            {desc}
          </p>
        </div>
      </div>
    </article>

  );
}

export default PartnersCard;