import Image from "next/image";
// data local
import allData from "../../lib/data/webdata.json";
import Button from "../ui/Button";




const MidInvestCard = ({ title, description, img, link, seoLabel }) => {
    const {icons} = allData
  return (
    <article className="flex flex-col  gap-2.5 overflow-clip rounded-xl md:rounded-2xl border border-solid border-neutral-950/10 bg-whitish-secondary w-full 
                        md:flex-row  md:w-full
                        lg:w-full lg:h-[340px] ">
        <div className={`relative flex w-full aspect-588/340 overflow-hidden  `}>
            <Image src={img} alt={title} fill
            style={{ objectFit: "cover", objectPosition: "center" }}/>
        </div>

        <div className="flex flex-col items-start gap-2  md:gap-4 py-6 w-full px-6 sm:px-12 md:px-4 md:pt-20 lg:pt-8
                        ">
            <h3 className=" text-xl font-semibold leading-[1.4]">
                {title}
            </h3>
            <div className="flex ">
                <p>{description}</p>
            </div>
            <div className="flex items-center gap-2 pt-4 md:pt-12 lg:pt-4">
                <Button label={'Learn More'} href={`${link}`} type={'outlined'} ariaLabel={'invest-button'} seoLabel={seoLabel} >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >
                      <path d={icons.chevron.right} className=""/>
                    </svg>
                </Button>
            </div>
        </div>
    </article>
  );
}

export default MidInvestCard;