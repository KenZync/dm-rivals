export const progressColor = (rank: string) => {
  switch (rank) {
    case "P Rank":
      return "bg-yellow-400";
    case "SS Rank":
      return "bg-amber-600";
    case "S Rank":
      return "bg-lime-500";
    case "A Rank":
      return "bg-cyan-900";
    case "B Rank":
      return "bg-blue-900";
    case "C Rank":
      return "bg-fuchsia-400";
    case "D Rank":
      return "bg-rose-900";
    case "F Rank":
      return "bg-neutral-400";
    case "Cleared":
      return "bg-green-800";
    case "Failed":
      return "bg-red-800";
    default:
      return "bg-black";
  }
};