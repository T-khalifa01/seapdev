import Image from "next/image";
// data local
import allData from "../../lib/data/webdata.json";
import Button from "../ui/Button";


const NewsCard = ({  tag, time, title, desc, imgSrc, link }) => {
    const {icons} = allData
  return (
    <article className={`flex w-full flex-col gap-2 leading-[normal]
                         sm:w-full md:w-[calc(50%-24px)]
                         lg:w-[616px]`}>
        
        {/* Image Container */}
        <div className="relative w-full overflow-hidden rounded-2xl
                        h-[200px]
                        sm:h-[250px]
                        md:h-[280px]
                        lg:h-[347px]">
            <Image 
                src={imgSrc} 
                alt={`${title} image`}
                fill
                style={{ objectFit: "cover", objectPosition: "center" }}
                priority={true}
            />
        </div>

        {/* Tag & Time */}
        <div className={`font-poppins flex flex-wrap items-center gap-x-4 gap-y-[11px] pt-4 text-sm font-semibold leading-normal
                         sm:flex-nowrap md:flex-nowrap lg:flex-nowrap max-width-12`}>
            <span className={`flex items-center justify-center rounded-[100px] border border-solid border-x-transparent border-y-transparent bg-black/5 px-[9px] py-[3px]`}>
                <span className={`text-center`}>{tag}</span>
            </span>
            <span>{time} min read</span>
        </div>
        {/* Title */}
        <div className={`pt-2`}>
            <h3 className={` text-xl leading-[1.4] pb-4
                           sm:text-2xl
                           md:text-2xl
                           lg:text-2xl `}>
                {title}
            </h3>
        </div>
        {/* Description flex-grow*/}
        <div className={`  flex items-start leading-normal text-sm pb-6 self-stretch
                         sm:text-base md:text-base`}>
            <p>{desc}</p>
        </div>
        <div className=" flex  mt-auto ">
            <Button label={'Read more'} href={link} type={'outlined'} ariaLabel={'button to blog post'} styles={''} seoLabel={title} >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className=" "  >
                    <path d={icons.chevron.right} className=""/>
                </svg>
            </Button>
        </div>
    </article>
  );
}

export default NewsCard;