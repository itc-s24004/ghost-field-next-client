import { useEffect, useRef, useState } from "react";
import styles from "./tool.module.css";



type Props = React.HTMLAttributes<HTMLDivElement> & {
    img: HTMLImageElement;

    size: {
        width: number;
        height: number;
    }

    onResult?: (blob: Blob) => void;
};



export function Tool_Img_Cut({img, onResult, ...props}: Props) {
    const screen = useRef<HTMLCanvasElement>(null)
    
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [cut_width, setCut_Width] = useState(100);
    const [cut_height, setCut_Height] = useState(100);

    const [inputScale, setInputScale] = useState(1);
    
    useEffect(() => {

        const canvas = screen.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;


        ctx.imageSmoothingEnabled = false;
        

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, cut_width, cut_height, 0, 0, width, height);

        canvas.toBlob((blob) => {
            if (blob) {
                onResult?.(blob);
            }
        });
        
    }, [img, width, height, x, y, cut_width, cut_height]);
    
    return (
        <div className={styles.container}>
            {/* <img src={img.src} alt="切り取り用画像" title="切り取り用画像"/> */}

            <div className={styles.preview_container}>
                <canvas ref={screen} width={width} height={height} className={styles.preview}
                    onMouseMove={(ev) => {
                        const format = ev.altKey;
                        const resize = ev.ctrlKey;

                        const { movementX, movementY, buttons } = ev;
                        const moveX = Math.floor(movementX / inputScale * 100) / 100;
                        const moveY = Math.floor(movementY / inputScale * 100) / 100;

                        
                        if (format) {
                            const _X = Math.floor(x);
                            const _Y = Math.floor(y);
                            const _Width = Math.floor(cut_width);
                            const _Height = Math.floor(cut_height);
                            setX(_X);
                            setY(_Y);
                            setCut_Width(_Width);
                            setCut_Height(_Height);


                        } else if (resize) {
                            if (buttons !== 1) return;
                            setCut_Width((prev) => {
                                let next = prev - moveX;
                                if (next < 50) next = 50;
                                if (next > img.width) next = img.width;
                                return next;
                            });
                            setCut_Height((prev) => {
                                let next = prev - moveY;
                                if (next < 50) next = 50;
                                if (next > img.height) next = img.height;
                                return next;
                            });


                        } else {
                            if (buttons !== 1) return;
                            setX((prev) => {
                                let next = prev - moveX;
                                if (next < 0) next = 0;
                                if (next > img.width - cut_width) next = img.width - cut_width;
                                return next;
                            });
                            setY((prev) => {
                                let next = prev - moveY;
                                if (next < 0) next = 0;
                                if (next > img.height - cut_height) next = img.height - cut_height;
                                return next;
                            });
                        }

                    }}
                />
            </div>

            <div className={styles.controls}>
                <label className={styles.control_label}>
                    幅:{width}
                    <input type="range" min={100} max={500} value={width} onChange={(e) => setWidth(Number(e.target.value))} />
                </label>
                <label className={styles.control_label}>
                    高さ:{height}
                    <input type="range" min={100} max={500}  value={height} onChange={(e) => setHeight(Number(e.target.value))} />
                </label>
                <label className={styles.control_label}>
                    切り取りX:{x}
                    <input type="range" min={0} max={img.width - cut_width}  value={x} onChange={(e) => setX(Number(e.target.value))} />
                </label>
                <label className={styles.control_label}>
                    切り取りY:{y}
                    <input type="range" min={0} max={img.height - cut_height}  value={y} onChange={(e) => setY(Number(e.target.value))} />
                </label>
                <label className={styles.control_label}>
                    切り取り幅:{cut_width}
                    <input type="range" min={50} max={img.width}  value={cut_width} onChange={(e) => setCut_Width(Number(e.target.value))} />
                </label>
                <label className={styles.control_label}>
                    切り取り高さ:{cut_height}
                    <input type="range" min={50} max={img.height}  value={cut_height} onChange={(e) => setCut_Height(Number(e.target.value))} />
                </label>
                <label className={styles.control_label}>
                    入力比率:{inputScale}
                    <input type="range" min={0.1} max={5} step={0.1} value={inputScale} onChange={(e) => setInputScale(Number(e.target.value))} />
                </label>
            </div>
        </div>
    )
}