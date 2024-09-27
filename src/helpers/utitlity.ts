export function getRandomString(length: number = 12): string {
  return [...Array(length)].map(() => Math.random().toString(36)[2]).join("");
}

export function getRandomColor(): string {
  const colors = [
    "#FF5733",
    "#9B59B6",
    "#5733FF",
    "#FF33A1",
    "#FFC300",
    "#C70039",
    "#900C3F",
    "#581845",
    "#28B463",
    "#3498DB",
    "#F39C12",
    "#E74C3C",
    "#8E44AD",
    "#2ECC71",
    "#1ABC9C",
    "#34495E",
    "#F1C40F",
    "#D35400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
