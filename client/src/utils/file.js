const fileTypes = {
  docx: "word",
  doc: "word",
  pptx: "powerpoint",
  ppt: "powerpoint",
  xlsx: "excel",
  xls: "excel",
  pdf: "pdf",
  cpp: "cpp",
  html: "html",
  css: "css",
  py: "python",
  rar: "zip",
  zip: "zip",
  gmz: "game-maker",
  txt: "text",
};

export const getFileTypes = (filename) => {
  const ext = filename.split(".").pop();
  if (fileTypes[ext]) return fileTypes[ext];
  else return "any";
};
