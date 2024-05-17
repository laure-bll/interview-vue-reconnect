const dateFormatter = (date: string) => {
  const formattedDate = new Date(date).toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return formattedDate;
};

export default dateFormatter;
