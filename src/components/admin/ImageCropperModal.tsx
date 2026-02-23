import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import { X, Check, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageCropperModalProps {
    image: string;
    onCropComplete: (croppedImage: Blob) => void;
    onCancel: () => void;
    aspectRatio?: number;
    circular?: boolean;
}

export function ImageCropperModal({
    image,
    onCropComplete,
    onCancel,
    aspectRatio = 1,
    circular = false
}: ImageCropperModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropChange = (crop: { x: number; y: number }) => {
        setCrop(crop);
    };

    const onZoomChange = (zoom: number) => {
        setZoom(zoom);
    };

    const onCropCompleteHandler = useCallback((_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const createImage = (url: string): Promise<HTMLImageElement> =>
        new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener('load', () => resolve(image));
            image.addEventListener('error', (error) => reject(error));
            image.setAttribute('crossOrigin', 'anonymous');
            image.src = url;
        });

    const getCroppedImg = async (
        imageSrc: string,
        pixelCrop: any
    ): Promise<Blob> => {
        const image = await createImage(imageSrc);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('No 2d context');
        }

        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    throw new Error('Canvas is empty');
                }
                resolve(blob);
            }, 'image/jpeg');
        });
    };

    const handleSave = async () => {
        try {
            if (croppedAreaPixels) {
                const croppedImage = await getCroppedImg(image, croppedAreaPixels);
                onCropComplete(croppedImage);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
            <div className="relative w-full max-w-2xl bg-cyber-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-cyber-surface">
                    <h3 className="text-white font-semibold flex items-center gap-2">
                        <RotateCcw className="w-4 h-4 text-cyber-mauve" />
                        Ajuster l'image
                    </h3>
                    <button
                        onClick={onCancel}
                        className="p-2 text-cyber-text-muted hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cropper area */}
                <div className="relative flex-1 min-h-[400px] bg-[#111]">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        cropShape={circular ? 'round' : 'rect'}
                        showGrid={true}
                        onCropChange={onCropChange}
                        onCropComplete={onCropCompleteHandler}
                        onZoomChange={onZoomChange}
                    />
                </div>

                {/* Controls */}
                <div className="p-6 bg-cyber-surface space-y-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-cyber-text-muted">
                            <ZoomOut className="w-4 h-4" />
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="flex-1 accent-cyber-mauve h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            <ZoomIn className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-6 py-2 rounded-xl text-cyber-text border border-white/10 hover:bg-white/5 transition-all text-sm font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-6 py-2 rounded-xl text-white bg-cyber-mauve hover:brightness-110 transition-all text-sm font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(157,107,247,0.3)]"
                        >
                            <Check className="w-4 h-4" />
                            Appliquer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
