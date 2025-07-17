export const shortenTitle = (title: string) =>
    title.substring(0, 25)+(title.length > 25 ? "..." : "");

export const shortenDescription = (description: string) =>
    description.substring(0, 60)+(description.length > 60 ? "..." : "");