import Button from "../ui/Button";



const SmallInvestCard = ({ title, description, icon, link, seoLabel, icons }) => {
  return (
    <article className={`flex flex-col items-start gap-6 overflow-clip rounded-xl md:rounded-2xl border border-solid border-neutral-950/10 bg-whitish-secondary px-6 lg:px-2 md:px-6 pt-6 pb-6 w-full
                        sm:h-[349px]
                        md:w-[calc(50%-8px)] 
                        lg:w-[calc(50%-16px)] lg:shrink-0 lg:min-h-[333px]`}>
      <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center w-12 h-12 shrink-0 text-green-accent
                             ">
          <path d={icon} className="-green-accent"/>
      </svg>
      <div className={`flex flex-col gap-4`}>
        <h3 className={` font-semibold text-2xl sm:text-lg flex-nowrap flex  md:text-2xl lg:text-xl xl:text-2xl leading-[1.4]`}>
          {title}
        </h3>
        <p className={`flex items-start self-stretch  mt-auto`}>{description}</p>
      </div>
      <div className={` flex mt-auto `}>{/**/}
        <Button href={`${link}`} label={'Learn More'} type={'outlined'} ariaLabel={'invest-buttons'} seoLabel={seoLabel} >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >
            <path d={icons.chevron.right} className=""/>
          </svg>
        </Button>
      </div>
    </article>
  );
}

export default SmallInvestCard;