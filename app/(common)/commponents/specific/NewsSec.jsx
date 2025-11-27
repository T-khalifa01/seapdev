import Image from "next/image";
import Button from "../ui/Button";
import NewsCard from "./NewsCard";
// data local
import allData from "../../lib/data/webdata.json";


const NewsSec = () => {
  const { news, icons, FAQs} = allData;
    const news1 = news[0];
    const news2 = news[1];
    const news3 = news[2];
    const news4 = news[3];
  return (
    <section className={`flex w-full flex-col px-5 py-8 leading-[normal] bg-bleus-secondary text-whitish-secondary
                         sm:px-8 sm:py-12
                         md:px-10 md:py-16
                         lg:px-20 lg:py-20 2xl:items-center`}>

        {/* Section Heading & Subtitle */}
        <p className={`font-poppins font-semibold leading-normal text-sm
                       md:text-base max-w-7xl`}>
            Blog
        </p>
        <h2 className={`  pt-2 leading-[1.2]
                        text-[36px]
                        sm:text-[40px]
                        md:text-[48px]
                        lg:text-[56px] max-w-7xl`}>
            Latest Insights and Updates
        </h2>
        <h4 className={`  pt-4 leading-normal
                       text-base
                       md:text-lg max-w-7xl`}>
            Discover the latest in sustainable energy initiatives.
        </h4>

        <div className={`flex w-full max-w-7xl lg:justify-center mb-4 `}> {/* flex-row items-center gap-8 self-stretch pt-4
                         md:flex-row md:flex-nowrap md:gap-12 md:pt-8
                         lg:pt-4 lg:flex-nowrapLG: original gap, no wrap */}
          <article className={`flex flex-col items-center gap-2 self-stretch mt-4 mb-4 w-full
                          sm:pt-10 sm:mb-4
                          md:flex-row md:flex-wrap md:justify-center md:items-start md:gap-8 md:pt-14 md:mb-4
                          lg:flex-nowrap lg:justify-between lg:pt-[72px] lg:mb-4`}>
              {/* Featured Image */}
              <div className={`relative w-full rounded-2xl overflow-hidden
                              h-[250px]
                              sm:h-[300px]
                              md:w-[calc(50%-16px)] md:h-[360px]
                              lg:w-[calc(50%-24px)] lg:h-[360px]`}> {/*lg:w-[616px] lg:h-[360px] LG: fixed width/height */}
                  <Image src={`/images/news/pppsummit.jpg`}
                    alt="Featured blog post image"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 616px" />
              </div>

              {/* Featured Post Text Content */}
              <div className={`flex w-full flex-col items-start gap-1
                              md:w-[calc(50%-16px)]
                              lg:w-[calc(50%-24px)]`}>
                  {/* Tag & Read Time for Featured Post */}
                  <div className={`font-hind flex flex-wrap items-center gap-x-4 text-sm font-semibold leading-normal
                                  sm:flex-nowrap md:flex-nowrap lg:flex-nowrap`}>
                      <span className={`flex items-center justify-center rounded-[100px] border border-solid border-x-transparent border-y-transparent bg-black/5 px-3 py-1 `}>
                          <span className={`text-center font-fira-sans`}>News</span>
                      </span>
                      <span className={` font-fira-sans`}>2 min read</span>
                  </div>
                  
                  {/* Featured Post Title */}
                  <div className={`self-stretch pt-2`}>
                      <h3 className={` leading-[1.3] mb-2
                                    text-2xl
                                    sm:text-[28px]
                                    md:text-[28px]
                                    lg:text-[32px]`}> {/* LG h3 size */}
                          Nigeria Signals Bold PPP Future at 2025 Infrastructure Summit
                      </h3>
                  </div>
                  
                  {/* Featured Post Description */}
                  <div className={` flex items-start self-stretch leading-normal text-sm pb-4
                                  md:text-base`}> {/* MD/LG */}
                      <p>
                          Private capital is key to unlocking Nigeria&apos;s trillion-naira infrastructure ambitions — and SEAP is ready to lead from the front.
                      </p>
                  </div>

                  {/* Read More Link for Featured Post */}
                  <Button label={'Read more'} href={'/news-webiners/bold-PPP-future'} ariaLabel={'view-blog'} type={'outlined'}  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="flex justify-center items-center self-center justify-self-center "  >{/*className="flex justify-center items-center w-12 h-12 flex-shrink-0 mb-2 text-green-accent
                              lg:mb-2 "*/}
                      <path d={icons.chevron.right} className=""/>
                    </svg>
                  </Button>
              </div>
          </article>
        </div>

        {/* News Cards Grid */}
        {/* Mobile/SM/MD: each row will stack, cards inside will also stack or go 2-col based on NewsCard's responsiveness */}
        <div className={`flex flex-col items-center gap-8 self-stretch pt-4 pd-4
                         md:flex-row md:flex-wrap  md:items-stretch md:gap-12 md:pt-8
                         lg:pt-4 lg:flex-nowrap`}> {/* LG: original gap, no wrap */}
            <NewsCard tag={news1.tag} time={news1.time} title={news1.title} desc={news1.desc} link={'/news-webiners/mini-grids'} imgSrc={news1.img} />
            <NewsCard tag={news2.tag} time={news2.time} title={news2.title} desc={news2.desc} link={'/news-webiners/afdb-mobilizes'} imgSrc={news2.img}/>
        </div>
        <div className={`flex flex-col items-center gap-8 self-stretch pt-4
                         md:flex-row md:flex-wrap  md:items-stretch md:gap-12 md:pt-4
                         lg:flex-nowrap`}> {/* LG: original gap, no wrap */}
            <NewsCard tag={news3.tag} time={news3.time} title={news3.title} desc={news3.desc} link={'/news-webiners/seap-kickoff'} imgSrc={news3.img}/>
            <NewsCard tag={news4.tag} time={news4.time} title={news4.title} desc={news4.desc} link={'/news-webiners/china-news'} imgSrc={news4.img}/>
        </div>
    </section>
  );
}

export default NewsSec;