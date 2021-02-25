const marked = require("marked");
marked.setOptions({
  breaks: true,
});

const renderer = new marked.Renderer();

export const renderMarkdown = (text) => {
  return {
    __html: marked(text, {
      renderer: renderer,
    }),
  };
};
