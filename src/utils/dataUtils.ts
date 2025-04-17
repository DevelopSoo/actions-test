export type Item = {
  id: number;
  category: string;
  value: number;
};
export const filterByCategory = (data: Item[], category: string) => {
  if (!Array.isArray(data)) {
    throw new Error("데이터는 배열이어야 합니다.");
  }

  if (typeof category !== "string") {
    throw new Error("카테고리는 문자열이어야 합니다.");
  }

  if (data.length === 0) {
    throw new Error("데이터가 없습니다.");
  }

  if (category.trim() === "") {
    throw new Error("카테고리는 빈 문자열이 될 수 없습니다.");
  }

  return data.filter((item) => item.category === category);
};

export const sortByValue = (data: Item[], order: "asc" | "desc" = "asc") => {
  if (!Array.isArray(data)) {
    throw new Error("데이터는 배열이어야 합니다.");
  }

  if (order !== "asc" && order !== "desc") {
    throw new Error("정렬 순서는 'asc' 또는 'desc'이어야 합니다.");
  }

  return data.toSorted((a, b) => {
    if (order === "asc") {
      return a.value - b.value;
    } else {
      return b.value - a.value;
    }
  });
};
