import Link from "next/link";
import Button from "../ui/Button";
// data local
import allData from "../../lib/data/webdata.json";



const LgaInvstCards = ({ title, description, iconSrc, linkHref, linkLabel }) => {
  const {icons} = allData;
  return (
    <article className="flex flex-col gap-8 flex-1">
      <div className="w-12 h-12 text-green-500">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={iconSrc} className="text-green-accent" />
        </svg>
      </div>
      

      <div className="flex flex-col gap-6">
        <h3 className="text-2xl font-normal ">
          {title}
        </h3>
        <p className="text-base font-normal leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-2 pt-4 mt-auto">
        <Button label={linkLabel} type={'outlined'} href={linkHref} ariaLabel={'learn more button for lga cards'} seoLabel={description} >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >
              <path d={icons.chevron.right} className=""/>
          </svg>
        </Button>
      </div>
    </article>
  );
}

export default LgaInvstCards;