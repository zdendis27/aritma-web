import { useEffect, useState } from "react";

type TransparentLogoProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function TransparentLogo({ src, alt, className }: TransparentLogoProps) {
  const [processedSrc, setProcessedSrc] = useState<string>(src);

  useEffect(() => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = src;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      if (!context) {
        setProcessedSrc(src);
        return;
      }

      context.drawImage(image, 0, 0);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const { data } = imageData;

      for (let index = 0; index < data.length; index += 4) {
        const red = data[index];
        const green = data[index + 1];
        const blue = data[index + 2];

        if (red > 235 && green > 235 && blue > 235) {
          data[index + 3] = 0;
        } else if (red > 210 && green > 210 && blue > 210) {
          data[index + 3] = Math.max(0, 255 - ((red + green + blue) / 3 - 210) * 6);
        }
      }

      context.putImageData(imageData, 0, 0);
      setProcessedSrc(canvas.toDataURL("image/png"));
    };
  }, [src]);

  return <img src={processedSrc} alt={alt} className={className} />;
}
