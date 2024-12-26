// exportAsImage.js
import html2canvas from "html2canvas";

const exportAsImage = async (element, imageName) => {
  const canvas = await html2canvas(element);
  const image = canvas.toDataURL("image/png", 1.0);
  const link = document.createElement("a");
  link.href = image;
  link.download = `${imageName}.png`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default exportAsImage;
