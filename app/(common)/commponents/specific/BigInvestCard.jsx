import Image from "next/image";
// data local
import allData from "../../lib/data/webdata.json";
import Button from "../ui/Button";




const BigInvestCard = ({ title, desc1, href , img, seoLabel }) => {
    const {icons} = allData
  return (
    <article className={`flex flex-col items-center gap-6 overflow-clip rounded-xl md:rounded-2xl border border-solid border-neutral-950/10 bg-whitish-secondary pt-12 w-full
                        md:w-full`}>
        <div className={`flex items-center self-stretch px-6 sm:px-8 md:px-12 max-w-[624px]`}>
            <h3 className={`grow text-2xl font-semibold leading-[1.2]`}>
                {title}
            </h3>
        </div>
        <div className={`flex items-center self-stretch px-6 sm:px-8 md:px-12 max-w-[624px]`}>
            <p className={`grow`}>{desc1}</p>
        </div>
        <div className={`flex items-end self-stretch px-6 sm:px-8 md:px-12 pt-2`}>
            <Button label={'Learn More'} href={`${href}`} type={'outlined'} ariaLabel={'invest-button'} seoLabel={seoLabel}  >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >
                    <path d={icons.chevron.right} className=""/>
                </svg>
            </Button>
        </div>
        <div className={`flex flex-col items-center justify-end pt-6 relative w-full aspect-624/360 overflow-hidden`}>
            <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority={true}
            />
        </div>
    </article>
  );
}

export default BigInvestCard;