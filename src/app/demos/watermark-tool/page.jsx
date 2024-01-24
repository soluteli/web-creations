'use client'
import { useRef } from "react";
import { Canvas, Image as GImage } from '@antv/g';
import { Renderer } from '@antv/g-canvas';

export default function Watermark() {

  const domRef = useRef(null)

  const getImageMetaData = (file) => {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', (event) => {
        const imageUrl = event.target.result;
        const img = new Image();
        img.src = imageUrl
        img.onload = function() {
          resolve({
            width: img.width,
            height: img.height,
            imageUrl: imageUrl
          })
        };
    })
      
    });
  }

  const startDraw = async (file) => {
    const imageData = await getImageMetaData(file)
    const {width, height, imageUrl} = imageData

    const isLandscapeSizeImage = width > height


    let containerWidth = domRef.current.offsetWidth
    let containerHeight = domRef.current.offsetHeight
    if (isLandscapeSizeImage) {
      containerHeight = containerWidth * height / width
    } else {
      containerWidth = containerHeight * width / height
    }
    

     // 创建渲染器
    const renderer = new Renderer();

    // 创建画布
    const canvas = new Canvas({
        container: domRef.current, // 画布 DOM 容器 id
        width: containerWidth, // 画布宽度
        height: containerHeight, // 画布高度
        renderer, // 指定渲染器
    });

    const image = new GImage({
      style: {
          x: 0,
          y: 0,
          width: containerWidth,
          height: containerHeight,
          img: imageUrl,
      },
    });


    canvas.appendChild(image)
  }

  const handleSelectFile = async (event) => {
    console.log('event', event.target.files)
    startDraw(event.target.files[0])
  }

  return (
    <>
      <div>Watermark</div>
      <div>
        <input type="file" accept="image/*" onChange={handleSelectFile} className="file-input w-full max-w-xs" />
      </div>
      <div className="w-[80vh] min-h-[80vh]">
        <div ref={domRef} className="size-full">
        </div>
      </div>
    </>
  )
}
