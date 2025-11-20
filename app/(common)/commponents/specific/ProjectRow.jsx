const ProjectRow = ({ Milestone, tdate }) => {
  return (
    <tr className="border-t border-solid border-black/10">
      <td className="py-[19px] pr-4 font-poppins font-medium text-base md:text-lg lg:text-xl leading-[1.4] whitespace-nowrap">
        {Milestone}
      </td>
      <td className="py-[19px] pl-4 font-fira-sans text-right text-base lg:text-xl leading-[1.6] whitespace-nowrap">
        {tdate}
      </td>
    </tr>
  );
}

export default ProjectRow;

// // Table row for desktop view
// const ProjectRow = ({ Milestone, tdate }: { Milestone: string; tdate: string }) => (
//   <tr className="border-t border-solid border-black/10">
//     <td className="py-[19px] pr-4 font-poppins font-medium text-base md:text-lg lg:text-xl leading-[1.4] whitespace-nowrap">
//       {Milestone}
//     </td>
//     <td className="py-[19px] pl-4 font-fira-sans text-right text-base lg:text-xl leading-[1.6] whitespace-nowrap">
//       {tdate}
//     </td>
//   </tr>
// );