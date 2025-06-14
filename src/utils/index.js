export const slugify = (text) => {
  return text
    .toLowerCase() // chuyển thành chữ thường
    .normalize("NFD") // tách dấu tiếng Việt
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .trim() // xóa khoảng trắng đầu đuôi
    .replace(/\s+/g, "-") // thay khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, "-"); // loại bỏ gạch ngang thừa
};

export const getIdTitleFromUrl = (url) => {
  const parts = url?.split("-");
  const id = Number(parts[parts.length - 1]);
  const slug = parts.slice(0, parts.length - 1).join("-");
  return { id, slug };
};
