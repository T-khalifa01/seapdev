import Image from "next/image";
// data local
import allData from "../../lib/data/webdata.json";
import Button from "../ui/Button";



const ProjectCard = ({ id, title, desc1, desc2, link, img }) => {
    const {icons} = allData;
  return (
    <article id={id} className={`flex flex-col items-start gap-1 max-w-[395px] w-full h-full
                                md:max-w-[calc(100%-12px)]
                                lg:max-w-[calc(100%-24px)]
                                min-[1270px]:max-w-[395px]`}>

        <div className={`relative h-60 w-full rounded-t-xl md:rounded-t-2xl rounded-b-none overflow-hidden shrink-0`}>
            <Image src={img} 
                    alt={title}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    />
        </div>

        <div className={`self-stretch pt-4`}>
            <h3 className={`text-xl md:text-xl font-semibold md:tracking-tight `}>
                {title}
            </h3>
        </div>

        <div className={`self-stretch `}>
            <div>
                <p className={` md:text-sm `}>{desc1}</p>
                <p className={`md:text-sm `}>{desc2}</p>
            </div>
        </div>

        <div className="grow"></div>

        <div className={`flex items-center gap-2 pt-4 mt-auto`}>

            <Button href={`${link}`} type='outlined' label={'Learn More'} >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >
                    <path d={icons.chevron.right} className=""/>
                </svg>
            </Button>
        </div>
    </article>
  );
}

export default ProjectCard;