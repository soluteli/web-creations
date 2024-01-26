'use client'
import { useRef } from "react";
import { Canvas, Image as GImage, Text, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { ImageExporter } from '@antv/g-image-exporter';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function Watermark() {

  const domRef = useRef(null)
  const canvasRef = useRef(null)

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

  const generateWatermarks = (width, height) => {
    const text = new Text({
      style: {
          text: 'abcde',
          color: 'rgba(0,0,0,0.8)',
      },
    });

    const textAttr = {
      fontSize: '16px',
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontVariant: 'normal',
      fontStyle: 'normal',
      textAlign: 'start',
      textBaseline: 'alphabetic',
      lineWidth: 0,
  }
    
    text.attr(textAttr);
    const boundSize = text.getLineBoundingRects();
    console.log('boundSize', boundSize)

    const watermarkGroup = new Group()
    const {width: sizeX, height: sizeY} = boundSize[0]

    const gapX = sizeX
    const gapY = sizeY * 2

    for (let x = width * -0.5 ; x < 1.5 * width; x+=(sizeX +gapX)) {
      console.log('x', x)
      for (let y = -1 * height; y < 3 * height; y+=(sizeY+gapY)) {
        const text = new Text({
          style: {
              text: 'abcde',
              x,
              y,
              transformOrigin: 'center center'
          },
        });
    
        const textAttr = {
          fontSize: '16px',
          fontFamily: 'sans-serif',
          fontWeight: 'normal',
          fontVariant: 'normal',
          fontStyle: 'normal',
          textAlign: 'start',
          textBaseline: 'alphabetic',
          lineWidth: 0,
      }
        
        text.attr(textAttr);
        watermarkGroup.appendChild(text)

      }
    }
    
    return watermarkGroup
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


    const watermarkGroup = generateWatermarks(containerWidth, containerHeight)
    watermarkGroup.rotate(-30)
    canvas.appendChild(watermarkGroup)

    canvasRef.current = canvas
  }

  const handleSelectFile = async (event) => {
    console.log('event', event.target.files)
    startDraw(event.target.files[0])
  }

  const handleDownload = async () => {
    const exporter = new ImageExporter({
      canvas: canvasRef.current, // 传入画布
      defaultFilename: 'my-default-filename',
    });
    const _canvas = await exporter.toCanvas({})
    const dataURL = _canvas.toDataURL();
    exporter.downloadImage({
      dataURL,
      name: 'test',
    });
  }

  return (
    <>
      <div>Watermark</div>
      
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture">上传图片</Label>
        <Input id="picture" type="file" accept="image/*" onChange={handleSelectFile} />
      </div>
        
        <Button variant="primary" onClick={handleDownload}>DownLoad</Button>
      <div className="w-[80vh] min-h-[80vh]">
        <div ref={domRef} className="size-full">
        </div>
      </div>
    </>
  )
}
